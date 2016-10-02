module.exports = {
    entry: "./src/main.ts",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' , exclude: /node_modules/}
        ]
    }
}