import redis from 'redis';
import session from 'express-session';
import RedisStore from 'connect-redis';
import process from 'process';

async function connectSessionStorage() {
    const redisClient = redis.createClient((process.env.SESSION_STORAGE_URL || "redis://localhost"));
    const sessionMgr = session({
        store: new (RedisStore(session))({ client: redisClient }),
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: true,
    });
    return sessionMgr;
}

export default connectSessionStorage;
