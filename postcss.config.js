module.exports = {
    plugins: [
        require('tailwindcss'),
        require('postcss-preset-env')({
            browsers: 'last 2 versions',
            stage: 1,
        }),
    ],
}
