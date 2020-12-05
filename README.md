# Cloudinary

This provides some shortcodes and filters for generating Cloudinary URLs.
It's mostly just a wrapper around the [Cloudinary Node SDK](https://cloudinary.com/documentation/node_integration).

## Usage

Install the plugin with npm or yarn:

```bash
$ npm -i @11in/cloudinary --save
```

Add it to your `eleventy.config.js`:

```js
module.exports = function (conf) {
    conf.namespace('cl_', () => {
        conf.addPlugin(cloudinary, {
            name: "your-cloud-name,
        })
    });
}
```

Use the shortcodes & filters:

```njk
{% cl_img { path: 'image.jpg, transforms: [{ width: 670 }] } %}

{{ 'image.jpg' | cl_image({width: 670}) }}
```

For more information, see the [full documentation](README.adoc).