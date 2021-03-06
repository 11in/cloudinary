const cloudinary = require('cloudinary').v2

module.exports = opts => {
    const {
        name: cloud_name,
        transforms,
        coerce,
    } = opts

    if (!cloud_name && !process.env.CLOUDINARY_URL) {
        throw new Error(`You must either pass a 'name' parameter to @11in/cloudinary or set the CLOUDINARY_URL environment variable!`)
    }

    const {
        match
    } = require('./extract')(opts)

    /**
     * By this point, either cloud_name is set or CLOUDINARY_URL is, so
     * it's fairly safe to only check for this one thing.
     */
    if (cloud_name) {
        cloudinary.config({
            cloud_name,
        })
    }

    return {
        url: (p, t) => {
            if (!Array.isArray(t)) {
                t = transforms
            } else {
                t = transforms.concat(t)
            }
            const args = {secure: true, transformation: t}
            if (coerce) {
                const {
                    id,
                    extension,
                    version,
                } = match(p)
                if (id) {
                    p = id
                }
                if (version) {
                    args.version = version
                }
                if (extension && id) {
                    p = `${id}.${extension}`
                }
            }
            return cloudinary.url(p, args)
        }
    }
}
