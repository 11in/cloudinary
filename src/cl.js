const cloudinary = require('cloudinary').v2

module.exports = opts => {
    const {
        name: cloud_name,
        transforms
    } = opts

    cloudinary.config({
        cloud_name,
    })

    return {
        url: (p, t) => {
            if (!Array.isArray(t)) {
                t = transforms
            } else {
                t = transforms.concat(t)
            }
            return cloudinary.url(p, {secure: true, transformation: t})
        }
    }
}