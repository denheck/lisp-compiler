module.exports = {
    entry: "./demo/index.tsx",
    output: {
        path: __dirname + "/dist/",
        publicPath: "/dist/",
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
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            }
        ]
    }
};
