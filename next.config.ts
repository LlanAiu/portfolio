module.exports = {
    transpilePackages: ['tegaki'],
    turbopack: {
        resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        rules: {
            '*.ttf': {
                type: 'asset',
            },
        },
    }
}