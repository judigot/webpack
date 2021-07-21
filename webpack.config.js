const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const jsDirectory = "js";
const cssDirectory = "css";
const sassDirectory = "sass";
const imagesDirectory = "images";
const fontsDirectory = "fonts";
const viewsDirectory = "views";

const entryFolder = "src";
const outputFolder = "dist";

const assetsFolderName = "public";

const assetFolderOutput = `${assetsFolderName}/`;
// const assetFolderOutput = ``;

//====================Plugins====================//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
//====================Plugins====================//

const buildMode = "production"; // production/development

module.exports = [
  {
    mode: buildMode,

    entry: {
      // entry1: './src/js/entry1.js',
      // entry2: './src/js/entry2.js',

      // pageOne: './src/pageOne/index.js',
      // pageTwo: './src/pageTwo/index.js',
      // users: './src/users/index.js',

      app: [
        // `bootstrap/dist/css/bootstrap.min.css`,
        `jquery/dist/jquery.js`,
        `bootstrap/dist/js/bootstrap.min.js`,
        `./${entryFolder}/${jsDirectory}/main.js`,
        `./${entryFolder}/${sassDirectory}/main.scss`,
      ],

      // , // Add vendors dependencies here
      // styles: [
      //     `bootstrap`
      // ]
    },

    output: {
      path: path.resolve(__dirname, `./${outputFolder}`),
      filename: `${assetFolderOutput}${jsDirectory}/[name].[chunkhash].js`, // Chunkhash for file versioning/long-term caching
    },

    module: {
      rules: [
        // TypeScript
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // Babel
        // {
        //   test: /\.m?js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [["@babel/preset-env", { targets: "defaults" }]],
        //       plugins: ["@babel/plugin-proposal-class-properties"],
        //     },
        //   },
        // },

        // HTML/PAGES
        // {
        //     // test: /\.(html|php)$/,
        //     test: /\.html$/,
        //     use: [
        //         {
        //             loader: 'file-loader',
        //             options: {
        //                 name: `[name].[ext]`
        //             }
        //         }
        //     ],
        //     exclude: path.resolve(__dirname, `${entryDirectory}/index.html`)
        // },

        // SCSS
        // {
        //     test: /\.(css|sass|scss)$/,
        //     use: ["style-loader", "css-loader", "sass-loader"]
        //     // It will take effect from right to left
        // },

        // SCSS
        {
          test: /\.(css|sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { url: true },
            },
            "sass-loader",
          ],
          // It will take effect from right to left
        },

        // {
        //     loaders: [{
        //         loader: 'file-loader',
        //         options: {
        //             publicPath: '..',
        //             name: `${imagesDirectory}/[name].[hash].[ext]`
        //         }
        //     },
        //         'img-loader'
        //     ]
        // },

        // {
        //     test: /\.(png|jpg|jpeg|gif|bmp)$/,
        //     use: [
        //         'url-loader?limit=10000',
        //         'img-loader'

        //         'url-loader?limit=10000',
        //         {
        //             loader: 'img-loader',
        //             options: {
        //                 publicPath: '..',
        //                 name: `${imagesDirectory}/[name].[hash].[ext]`,
        //                 regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i
        //             }
        //         }
        //     ]
        // },

        // Images
        {
          test: /\.(png|jpg|jpeg|gif|bmp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: `${assetFolderOutput}${imagesDirectory}/[name].[hash].[ext]`,
                regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
              },
            },
          ],
        },

        // Fonts
        {
          test: /\.(svg|eot|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: `${assetFolderOutput}${fontsDirectory}/[name].[ext]`,
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

      new MiniCssExtractPlugin({
        filename: `${assetFolderOutput}${cssDirectory}/[name].[chunkhash].css`, // Chunkhash for file versioning/long-term caching
      }),

      // new CleanWebpackPlugin(),

      new CopyPlugin({
        patterns: [
          {
            from: `${entryFolder}/${fontsDirectory}`,
            to: `${assetFolderOutput}${fontsDirectory}`,
          },
          {
            from: `${entryFolder}/${viewsDirectory}`,
            to: `${viewsDirectory}`,
          },
        ],
        options: {
          concurrency: 100,
        },
      }),

      new HtmlWebpackPlugin({
        filename: "index.html",
        template: `./${entryFolder}/index.html`,
        chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
      }),

      new HtmlWebpackPlugin({
        filename: "users.html",
        template: `./${entryFolder}/users.html`,
        chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
      }),

      // new PurgeCSSPlugin({
      //     paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
      // }), // Removes too much. Causing bug on bootstrap modal backdrop
    ],
  },
];
