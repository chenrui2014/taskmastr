// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require store files
const storeContext = require.context('../public/store/', true, /\.js$/)
storeContext.keys().forEach(storeContext)

// require component files
const componentContext = require.context('../public/components/', true, /\.vue$/)
componentContext.keys().forEach(componentContext)