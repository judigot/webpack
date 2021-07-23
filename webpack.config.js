const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const entryFolder = "src";
const outputFolder = "dist";

const jsDirectory = "js";
const cssDirectory = "css";
const sassDirectory = "sass";
const imagesDirectory = "images";
const fontsDirectory = "fonts";
const viewsDirectory = "views";
const templatingEngineExtension = "ejs";

const assetsFolderName = "public";

//====================Plugins====================//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
//====================Plugins====================//

const buildMode = "production"; // production/development

const main = {
  mode: buildMode,

  entry: {
    app: [
      // `bootstrap/dist/css/bootstrap.min.css`,
      `jquery/dist/jquery.js`,
      `bootstrap/dist/js/bootstrap.min.js`,
      `./${entryFolder}/${jsDirectory}/main.js`,
      `./${entryFolder}/${sassDirectory}/main.scss`,
    ],
  },

  output: {
    publicPath: `/`,
    path: path.resolve(__dirname, `./${outputFolder}/${assetsFolderName}`),
    filename: `${jsDirectory}/[name].[chunkhash].js`, // Chunkhash for file versioning/long-term caching
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          variable: "data",
          esModule: false,
          interpolate: "\\{\\{(.+?)\\}\\}",
          evaluate: "\\[\\[(.+?)\\]\\]",
        },
      },

      // SCSS
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // It will take effect from right to left
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: "file-loader",
        options: {
          name: `[name].[hash].[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          outputPath: `${imagesDirectory}`,
          publicPath: `../${imagesDirectory}`,
        },
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: `[name].[hash].[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          outputPath: `${fontsDirectory}`,
          publicPath: `../${fontsDirectory}`,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: buildMode === "production" ? true : false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        `${entryFolder}/${viewsDirectory}/index.${templatingEngineExtension}`
      ), // Destination
      filename: path.resolve(
        __dirname,
        `${outputFolder}/${viewsDirectory}/index.${templatingEngineExtension}`
      ), // Destination
      chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
    }),

    new MiniCssExtractPlugin({
      filename: `${cssDirectory}/[name].[chunkhash].css`, // Chunkhash for file versioning/long-term caching
    }),
  ],
};
module.exports = [main];
