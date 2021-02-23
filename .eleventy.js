module.exports = {
    configFunction: (conf, options = {}) => {
        const opts = require('./src/options')(options);

        conf.addFilter('url', require('./src/url')(opts))

        conf.addFilter('extract', (input, part) => {
            const {match} = require('./src/extract')(opts)
            const matches = match(input)

            if (part && matches[part]) {
                return matches[part]
            }

            return matches.id;
        })

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
