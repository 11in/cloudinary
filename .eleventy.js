module.exports = {
    configFunction: (conf, options = {}) => {
        const opts = require('./src/options')(options);

        conf.addFilter('url', require('./src/url')(opts))

        conf.addShortcode('url', args => {
            const {
                path,
                transforms
            } = args
            return require('./src/url')(opts)(path, transforms)
        })

        conf.addShortcode('img', require('./src/image')(opts))
    }
}
