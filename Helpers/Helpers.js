exports.generateError = (obj) =>{
    let idk = {statusCode: 500, ...obj}
    return JSON.stringify(idk)
}