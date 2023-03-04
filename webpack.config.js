// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");

const getGitBranchName = require("./script/utils/getGitBranchName");
const getCommitHash = require("./script/utils/getCommitHash");
const getGitUserData = require("./script/utils/getGitUserData");
const { readFileSync } = require("fs");

const license = readFileSync("./LICENSE", "utf8");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: {
        "components-from-git": "./src/index.ts",
        "utils-from-git": "./src/utils.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

module.exports = async () => {
    if (isProduction) {
        config.mode = "production";
        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                }),
            ],
        };
    } else {
        config.mode = "development";
        config.devtool = "inline-source-map";
    }

    const branchNamePromise = getGitBranchName();
    const commitHashPromise = getCommitHash();
    const userDataPromise = getGitUserData();

    const [branchName, commitHash, userData] = await Promise.all([
        branchNamePromise,
        commitHashPromise,
        userDataPromise,
    ]);

    config.plugins.push(
        new webpack.BannerPlugin({
            banner: `
Branch: ${branchName}
Commit: ${commitHash}
User: ${JSON.stringify(userData)}
Date: ${new Date().toISOString()}

${license}
`,
        })
    );

    if (process.argv.includes("--watch")) {
        require("./script/push.js");
        require("./script/watch.js");
    }

    return config;
};
