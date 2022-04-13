const Image = require("@11ty/eleventy-img");

async function image(src) {
  const metadata = await Image(src, {
    widths: [32, 640],
    formats: ["jpeg"],
    urlPath: "/image",
    outputDir: "./_site/image"
  });

  return metadata;
}

async function imageShortcode(src) {
  const metadata = await image(src);
  const data = metadata.jpeg[1];
  return `<img class="u-photo" src="${data.url}" width="${data.width}" height="${data.height}" loading="lazy" decoding="async" />`;
}

async function imageLinkShortcode(src) {
  const metadata = await image(src);
  const data = metadata.jpeg[1];
  return `<a class="u-photo" href="${data.url}" target="_blank">${data.filename}</a>`;
}

async function imageThumbShortcode(src) {
  const metadata = await image(src);
  const data = metadata.jpeg[0];
  return `<img src="${data.url}" width="${data.width}" height="${data.height}" loading="lazy" decoding="async" />`;
}

async function imageThumbLinkShortcode(src) {
  const metadata = await image(src);
  const thumb = imageThumbShortcode(src);
  const data = metadata.jpeg[1];
  return `<a class="u-photo" href="${data.url}" target="_blank">${thumb}</a>`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-plugin-emoji"));

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("image_link", imageLinkShortcode);
  eleventyConfig.addLiquidShortcode("image_link", imageLinkShortcode);
  eleventyConfig.addJavaScriptFunction("image_link", imageLinkShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("image_thumb", imageThumbShortcode);
  eleventyConfig.addLiquidShortcode("image_thumb", imageThumbShortcode);
  eleventyConfig.addJavaScriptFunction("image_thumb", imageThumbShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("image_thumb_link", imageThumbLinkShortcode);
  eleventyConfig.addLiquidShortcode("image_thumb_link", imageThumbLinkShortcode);
  eleventyConfig.addJavaScriptFunction("image_thumb_link", imageThumbLinkShortcode);
};
