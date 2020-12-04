# Cloudinary

This provides some shortcodes for generating Cloudinary URLs.

## Usage

Since the shortcodes this plugin provides are pretty genericlly named, it's recommended that you namespace them:

```js
conf.namespace('cl_', () => {
    conf.addPlugin(cloudinary, {
        name: "djd6kxozp",
        base: "https://api.cloudinary.com",
        defaults: {
            width: 1024
        }
    })
});
```

Pass arguments as a JS object:

```html
{% cl_image { path: 'folder/image.jpg', transforms: 'w_400' } %}
```

### url

This will return a url, appropriately constructed.

**Arguments**

- `path` - This is the path on cloudinary to the item you want, i.e. `folder/image.jpg`
- `transforms` - Any transforms you'd like to apply to this item.

### image

This will return an entire image element.

**Arguments**

- `path` - This is the path on cloudinary to the item you want, i.e. `folder/image.jpg`
- `transforms` - Any transforms you'd like to apply to this item.
    These transforms will be applied to all urls in this image (the `src` and `srcset`).
- `alt`
- `title`
- `size` - The base size for this image.
- `sizes` - A string describing the sizing.
- `srcset` - Either a string (which will be reproduced as-is) or an array of integers, which will be used as widths.
- `css` - This would normally be called `class` but JavaScript doesn't like that.
    A list of classes for this element.
- `attrs` - Any other HTML attributes you want on this element, pass as an array of arrays.
    For boolean attributes, just use an array with a single value.