module.exports = options => {
    const opts = Object.assign({
        transforms: [],
    }, options)

    // Object.assign isn't a deep merge, so we do this manually.
    opts.defaults = Object.assign({
        width: 768,
    }, options.defaults)

    return opts
}