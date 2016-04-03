module.exports = {
    entry: "./spec.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
		library: "plugins"
    }
};