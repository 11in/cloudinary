const {
    join
} = require('path')

function buildUrl(base, name, ...args) {
    // Remove leading / from name if present
    name = (name.length && name[0] == '/') ? name.slice(1) : name
    return new URL(join(name, ...args), base)
}

module.exports = {
    configFunction: (conf, options = {}) => {
        const opts = Object.assign({
            base: "https://api.cloudinary.com"
        }, options)
        // Object.assign isn't a deep merge, so we do this manually.
        options.defaults = Object.assign({
            width: 768,
        }, options.defaults)
        const {
            base,
            name,
            defaults
        } = opts
        const url = (...args) => buildUrl(base, name, ...args)

        conf.addShortcode('url', args => {
            const {
                path,
                transforms
            } = args
            return url(transforms, path)
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
                    let src = url(transforms, `w_${current}`, path)
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

            attrs.push(['src', url(transforms, `w_${size}`, path).href])
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