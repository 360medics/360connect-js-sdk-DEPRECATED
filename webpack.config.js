module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'dist/360connect-js-sdk.bundle.js',
        libraryTarget: 'var',
        library: 'Connect',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', 'tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.json$/, loader: 'json-loader' },
        ]
    },
    watch: true,
    node: {
      fs: "empty"
    }
}
