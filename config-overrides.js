const {
  watchAll,
  overrideDevServer,
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  addDecoratorsLegacy,
  adjustStyleLoaders,
  disableEsLint,
  addWebpackPlugin,
  removeModuleScopePlugin,
} = require('customize-cra')
const path = require('path')
// const px2rem = require('postcss-px2rem-exclude')
const px2rem = require('postcss-plugin-px2rem')
const rewirePostcss = require('react-app-rewire-postcss')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const closedMap = (config) => {
  // 修改掉webpack里面devtool的配置
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

module.exports = {
  webpack: override(
    removeModuleScopePlugin(),
    disableEsLint(),
    closedMap,
    addWebpackAlias({
      '@': resolve('src'),
    }),
    addWebpackPlugin(new NodePolyfillPlugin()),
    addWebpackModuleRule({
      test: /\.svg$/,
      include: [resolve('src/assets/icons/svg')],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: { symbolId: 'goo-[name]' },
        },
      ],
    }),
    adjustStyleLoaders((rule) => {
      if (rule.test.toString().includes('scss')) {
        // console.log(rule)
        rule.use.forEach((loader) => {
          if (loader.loader && loader.loader.toString().includes('sass-loader')) {
            if (!loader.options) {
              loader.options = { sassOptions: {} }
            }
            if (!loader.options.sassOptions) {
              loader.options.sassOptions = {}
            }
            loader.options.sassOptions.outputStyle = 'expanded'
          }
        })
        rule.use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: './src/sass/global.scss', //这里是你自己放公共scss变量的路径
          },
        })
      }
    }),
    addDecoratorsLegacy()
    // (config, env) => {
    //   // 重写postcss
    //   rewirePostcss(config, {
    //     plugins: () => [
    //       // require('postcss-flexbugs-fixes'),
    //       // require('postcss-preset-env')({
    //       //   autoprefixer: {
    //       //     flexbox: 'no-2009',
    //       //   },
    //       //   stage: 3,
    //       // }),
    //       //关键:设置px2rem
    //       px2rem({
    //         rootValue: 116.8,
    //         // exclude: /node-modules/i,
    //       }),
    //     ],
    //   })

    //   return config
    // }
  ),
  devServer: overrideDevServer((config) => {
    return {
      ...config,
      proxy: {
        // '/api/apps/v1/popular/apps/list': {
        //   target: 'https://now.gg',
        //   changeOrigin: true,
        // },
        // '/ncm/appsc/v1/bsxGetAppsList': {
        //   target: 'https://now.gg',
        //   changeOrigin: true,
        // },
      },
    }
  }, watchAll()),
}
