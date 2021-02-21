# Cloudinary

This provides some shortcodes and filters for generating Cloudinary URLs.
It's mostly just a wrapper around the [Cloudinary Node SDK](https://cloudinary.com/documentation/node_integration), although it will attempt some coercion to get valid public IDs from various kinds of input.

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
            name: "your-cloud-name",
        })
    });
}
```

> You can alternatively set an environment variable called `CLOUDINARY_URL`.
> It's found on your Cloudinary dashboard, and looks something like this:
> ```shell
> CLOUDINARY_URL=cloudinary://api-key:api-secret@your-cloud-name
> ```

Use the shortcodes & filters:

```jinja
{% cl_img { path: 'image.jpg', transforms: [{ width: 670 }] } %}

{{ 'image.jpg' | cl_url({width: 670}) }}
```

Cloudinary is fairly good at extracting your asset ids from various URLs you might get out of Cloudinary (or, say, [Forestry](https://forestry.io/)).
So you can also do something like this:

```jinja
{% cl_img { path: '/v1610229506/directory/2021/01/image.jpg', transforms: [{ width: 670 }] } %}

{{ 'https://res.cloudinary.com/your-cloud-name/image/upload/v1613447983/image.jpg' | cl_url({width: 670}) }}
```

For more information, see the [full documentation](https://11in.alwaysblank.dev/docs/cloudinary).
