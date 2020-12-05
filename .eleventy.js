const {
    join
} = require('path')

const cloudinary = require('cloudinary').v2

function buildUrl(base, name, ...args) {
    // Remove leading / from name if present
    name = (name.length && name[0] == '/') ? name.slice(1) : name
    return new URL(join(name, ...args), base)
}

module.exports = {
    configFunction: (conf, options = {}) => {
        const opts = Object.assign({
            transforms: [],
        }, options)
        // Object.assign isn't a deep merge, so we do this manually.
        options.defaults = Object.assign({
            width: 768,
        }, options.defaults)

        const {
            defaults,
            name: cloud_name,
            transforms: base_transforms,
        } = opts
        cloudinary.config({
            cloud_name,
        })
        const url = (path, transforms) => {
            if (!Array.isArray(transforms)) {
                transforms = base_transforms
            } else {
                transforms = base_transforms.concat(transforms)
            }
            return cloudinary.url(path, {secure: true, transformation: transforms})
        }

        conf.addFilter('url', (path, transforms) => {
            return url(path, transforms)
        })
        
        conf.addShortcode('url', args => {
            const {
                path,
                transforms
            } = args
            return url(path, transforms)
        })

        conf.addShortcode('img', args => {
            let {
                path,
                transforms,
                css,
                alt,
                title,
                srcset,
                size,
                sizes,
                attrs,
            } = args

            // Make this an empty array so folks don't freak out
            if (!Array.isArray(transforms)) {
                transforms = []
            }

            // Always need a size
            if (!size) {
                size = defaults.width
            }

            // Try and set a reasonable default
            if (!sizes) {
                sizes = `(min-width: ${size}px) ${size}, 100vw`
            }

            // Construct srcset
            if (Array.isArray(srcset)) {
                srcset = srcset.reduce((carry, current) => {
                    let src = url(path, transforms.concat([{width: current}]))
                    if (null === carry) {
                        // First go-round
                        return `${src} ${current}w`
                    }
                    return `${carry}, ${src} ${current}w`
                }, )
            }
            if (typeof srcset !== 'string') {
                srcset = false
            }

            attrs.push(['src', url(path, transforms.concat([{width: size}]))])
            attrs.push(['sizes', sizes])
            attrs.push(['alt', alt])
            if (css) {
                attrs.push(['class', css])
            }
            if (srcset) {
                attrs.push(['srcset', srcset])
            }
            if (title) {
                attrs.push(['title', title])
            }
            return `<img${attrs.reduce((carry, current) => {
                if (current.length === 1) {
                    return `${carry} ${current[0]}`
                }
                return `${carry} ${current[0]}="${current[1]}"`
            }, '')}/>`
        })
    }
}