const fs = require("fs");
const path = require("path");

const postsFolder = path.resolve(__dirname, "./posts");

const posts = fs
    .readdirSync(postsFolder)
    .filter(name => path.extname(name) === ".json")
    .map(name => ({
        key: path.parse(name).name,
        ...require(path.join(postsFolder, name)),
    }))
    .reverse();

module.exports = posts;
