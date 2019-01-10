var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DefinePlugin = webpack.DefinePlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");

var SRC_DIR = path.join(__dirname, "src");
var BUILD_DIR = path.join(__dirname, "build/www");

var indexSource = path.join(SRC_DIR, "index.tsx");
var indexStyle = path.join(SRC_DIR, "index.less");
var indexHtml = path.join(SRC_DIR, "index.html");

var fileNamePattern = "name=[name].[hash:7].[ext]";

var extractedCssStylePlugin = new ExtractTextPlugin("[name].[hash:7].css");

module.exports = {
  entry: [
    indexSource,
    indexStyle
  ],
  output: {
    path: BUILD_DIR,
    filename: "[name].[hash:7].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: "ts-loader", include: SRC_DIR},
      {
        test: /\.less$/,
        use: extractedCssStylePlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            { loader: "postcss-loader", options: { plugins: [autoprefixer] }},
            "less-loader",
          ]
        }),
        include: SRC_DIR
      },
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&" + fileNamePattern},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&" + fileNamePattern},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream&" + fileNamePattern},
      {test: /\.(eot|gif|png|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?" + fileNamePattern},
      {test: /\.json$/, loader: "json-loader"}
    ]
  },
  plugins: [
    extractedCssStylePlugin,
    // Main HTML entry points
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: indexHtml,
    }),
    new UglifyJsPlugin(),
    new DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ],
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".less", ".css"],
    alias: {
      "react": __dirname + "/node_modules/react",
      "react/lib/ReactMount": "react-dom/lib/ReactMount"
    }
  }
};
