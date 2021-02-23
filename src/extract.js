module.exports = opts => {
    const {
        extract: {
            resourceTypes,
            deliveryTypes,
            imageFormats
        }
    } = require('./const')

    const {
        delivery,
        resource,
        image,
    } = Object.assign({
        delivery: deliveryTypes,
        resource: resourceTypes,
        image: imageFormats
    }, opts.extract || {})

    const deliveryRegex = delivery.join('|');
    const resourceRegex = resource.join('|');
    const formatRegex = image.join('|');

    const regexStr = `^(?:(?:https?:\\/\\/)?(?:res\\.cloudinary\\.com)?\\/?(?<cloud>[^\\/]+?(?=\\/))(?:\\/(?<resource>${resourceRegex}))?(?:\\/(?<delivery>${deliveryRegex}))?(?:\\/v(?<version>\\d+?(?=\\/)))?)?(?:\\/)?(?<id>.+?(?=$|\\.${formatRegex}))(?:\\.(?<extension>${formatRegex}))?$`

    const regex = new RegExp(regexStr);

    return {
        regex,
        match: str => str.match(regex)?.groups,
    }
}
