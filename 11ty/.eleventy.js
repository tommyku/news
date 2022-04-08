const Image = require("@11ty/eleventy-img");

async function image(src) {
  const metadata = await Image(src, {
    widths: [640],
    formats: ["jpeg"],
    urlPath: "/image",
    outputDir: "./_site/image"
  });

  return metadata;
}

async function imageShortcode(src) {
  const metadata = await image(src);
  const data = metadata.jpeg[0];
  return `<img class="u-photo" src="${data.url}" width="${data.width}" height="${data.height}" loading="lazy" decoding="async" />`;
}

async function imageLinkShortcode(src) {
  const metadata = await image(src);
  const data = metadata.jpeg[0];
  return `<a class="u-photo" href="${data.url}" target="_blank">${data.filename}</a>`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("image_link", imageLinkShortcode);
  eleventyConfig.addLiquidShortcode("image_link", imageLinkShortcode);
  eleventyConfig.addJavaScriptFunction("image_link", imageLinkShortcode);
};
