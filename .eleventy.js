module.exports = function(eleventyConfig) {
  // Pass through assets and styles without processing
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
  };
};
