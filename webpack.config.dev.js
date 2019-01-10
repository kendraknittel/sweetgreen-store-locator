var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var SRC_DIR = path.join(__dirname, "src");
var BUILD_DIR = path.join(__dirname, "lib");
var webpack = require("webpack");

var indexSource = path.join(SRC_DIR, "index.tsx");
var indexStyle = path.join(SRC_DIR, "index.less");
var indexHtml = path.join(SRC_DIR, "index.html");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    indexSource,
    indexStyle,
  ],
  output: {
    path: BUILD_DIR,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                declaration: false,
                emitDecoratorMetadata: false
              }
            }
          },
        ],
        include: SRC_DIR
      },
      {
        test: /\.less/,
        use: [
          "style-loader",
          "css-loader",
          // { loader: "postcss-loader", options: { plugins: [autoprefixer] }},
          "less-loader",
        ],
        include: SRC_DIR
      },
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
      {test: /\.(eot|gif|png|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: indexHtml
    })
  ],
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".less", ".css"],
    alias: {
      "react/lib/ReactMount": "react-dom/lib/ReactMount"
    }
  },
  optimization: {
    namedModules: true,
  },
  devServer: {
    hot: true,
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      errorDetails: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      timings: true,
    },
  },
};
