const jwt = require("jsonwebtoken");
const User = require("../../../models/user")

exports.register = (req,res) =>{
    res.send('this router is working');
}

exports.login = (req, res) =>{
    const {username, password } = req.body
    const secret = req.app.get('jwt-secret')

    console.log("header : " ,req.headers);
    const check = (user) => {
        console.log("user", user)
        if (!user) {
            throw new Error('login failed');
        }
        else {
            if (user.verify(password)) {
                const p = new Promise((resolve, reject)=> {
                    console.log("resolve")
                    jwt.sign(
                    {
                        _id:user._id,
                        username : user.username,
                        admin : user.admin
                    },
                    secret, 
                    {
                        expiresIn :'7d',
                        issuer : 'velopert.com',
                        subject : 'userInfo'
                    }, (err,token) => {
                        console.log("errrerer ", err)
                        if (err) reject(err)
                        resolve(token)
                    })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    const respond = (token)=> {
        res.json({
            message : 'logged in successfully',
            token
        })
    }

    const onError = (error) =>{
        res.status(403).json({
            message : error.message
        })
    }
    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}

exports.dummylist = (req, res) => {
    // read the token from header or url 
    const token = req.headers['authorization'] || req.query.token
    console.log("::: headers : ",req.headers , "tokken : " , token)
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        let data = [1,2,3,45]
        res.json({
            success: true,
            info: token ,
            data : data
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}