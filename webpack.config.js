const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';
const translateConfig = require("./translate-config");

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
    })
];

if (!devMode) {
    plugins.push(new MiniCssExtractPlugin({ filename: "styles.[fullhash].css" }));
}

const webpackConfig = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: plugins,
    module: {
        rules: [
                        {
                test: /\.html$/,
                use:
                [
                    { loader: "html-loader" },
                    { loader: "translation-loader", options: translateConfig }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: "/node_modules/"
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader, 
                        options: {
                            publicPath: ''
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
};

module.exports = function(env)
{
    if (env && env.locale)
    {
        translateConfig.importFilePath =
            translateConfig.importFilePath.replace("{locale}", env.locale);
        webpackConfig.output.path  += `/${env.locale}`
    }
    else
    {
        translateConfig.excludedFilePaths = ["**"];
    }
    return webpackConfig;
};

