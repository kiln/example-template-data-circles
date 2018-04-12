 var nodeResolve = require("rollup-plugin-node-resolve"),
     uglify = require("rollup-plugin-uglify");

export default {
  input: "src/index.js",
  output: {
    format: "iife",
    name: "template",
    file: "template.js",
    sourceMap: true,
  },

  // d3 relies on the node-resolve plugin
  plugins: [
    nodeResolve({ jsnext: true }),
    uglify(),
  ]
};
