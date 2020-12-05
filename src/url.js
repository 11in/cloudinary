module.exports = opts => (p, t) => {
    return require('./cl')(opts).url(p, t)
}