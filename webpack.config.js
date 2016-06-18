module.exports = {
    entry: "./index.ts",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            }
        ]
    }
};
