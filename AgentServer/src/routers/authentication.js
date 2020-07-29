import express from 'express'
import logger from '../logger'
import map from '../mapper'
import { getRepository } from 'typeorm'

const router = express.Router();

router.post('/login', async function (req, res) {

    const email  = req.body.email;
    const passwd = req.body.password;

    // Keycoded restriction, prevent someone from trying to fuck up the server
    if(typeof email != 'string' || typeof passwd != 'string' || email.length >= 100 || passwd.length >= 100){
        logger.warn(`invalid format of userinfo`, {
            emailType: typeof email,
            emailLength: email.length,
            passwdType: typeof passwd,
            passwdLength: passwd.length
        });
        res.status(403);
        res.send('Rejected');
        return;
    }

    /* TODO: Optimize this query by adding index on specific columns */
    const match = await getRepository('user').findOne({
        email: email,
        password: passwd
    });

    if(match){
        /* TODO: Don't use the userId as a session key like this,
        *        This might introduce security issue, generate one uuid on login instead. */
        const userid = match.userId;
        req.session.userid = userid;
        res.send({ result: 'OK', message: 'Session updated.'});
    } else {
        res.status(403);
        res.send('Rejected');
        return;
    }

});
router.get('/whoami', function(request, response) {
    if(!request.session.userid)
        response.status(401).send('Forbidden')
     else
        response.send({userid: request.session.userid});
});
router.delete('/logout', function (request, response) {

    if(typeof request.session.userid != 'string'){
        response.status(401);
        response.send("Rejected")
        return;
    }

    const ws = map.get(request.session.userid);

    request.session.destroy(() => {
        if(ws) ws.close();
        response.send({ result: 'OK', message: 'Session destroyed.'})
    });
});//}}}

export default router;
