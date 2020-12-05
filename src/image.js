module.exports = opts => {
    const {
        defaults
    } = opts

    const {
        url
    } = require('./cl')(opts)

    return args => {
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
                let src = url(path, transforms.concat([{
                    width: current
                }]))
                if (null === carry) {
                    // First go-round
                    return `${src} ${current}w`
                }
                return `${carry}, ${src} ${current}w`
            }, null)
        }
        if (typeof srcset !== 'string') {
            srcset = false
        }

        attrs.push(['src', url(path, transforms.concat([{
            width: size
        }]))])
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
    }
}