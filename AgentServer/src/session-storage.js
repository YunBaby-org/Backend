import redis from 'redis';
import session from 'express-session';
import RedisStore from 'connect-redis';
import process from 'process';

let redisClient = null
let sessionMgr  = null

async function connectSessionStorage() {
    if(redisClient != null || sessionMgr != null)
        throw Error("connection already exists")

    redisClient = redis.createClient((process.env.SESSION_STORAGE_URL || "redis://localhost"));
    sessionMgr = session({
        store: new (RedisStore(session))({ client: redisClient }),
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "!SECRET!",
        resave: false,
    });

    /* Hack, Override session manager close function, quit redis client when session manager closed */
    sessionMgr.close = async function() {
        await new Promise((res) => redisClient.quit(() => res()))
        redisClient = null
        sessionMgr = null
    }

    return sessionMgr;
}

function validateSession(request) {
    if(!sessionMgr)
        throw Error("Session manager is not initalized.")
    return new Promise((resolve, reject) => {
        sessionMgr(request, {}, () => {
            if(request.session.userid)
                resolve(request.session.userid)
            else
                reject(false)
        })
    })
}

async function disconnectSessionStorage() {
    await new Promise((res) => redisClient.quit(() => res()))
    redisClient = null
    sessionMgr = null
}

export { connectSessionStorage, validateSession, disconnectSessionStorage, };
