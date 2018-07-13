const User = {
    _id :"dfasdfasdf",
    username : "admin",
    password : "pw",
    admin : false
}

User.findOneByUsername = function(username) {
    const p = new Promise((resolve, reject)=> {
        console.log(this)
        resolve(this)
    })
    return p;
}
User.verify = function(password) {
    if ( password == "pw")
    {
        return true;
    }
}
module.exports = User