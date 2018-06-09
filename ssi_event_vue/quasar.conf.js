// Configuration for your app
//const tsWebpack = require('./config-utils/ts-webpack');
const appPaths = require('quasar-cli/lib/build/app-paths');
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
    ],
    supportIE: true,
    build: {
      distDir: '/dist',
//      publicPath: '/ssi_event/quasar/dist',
//      htmlFilename: '../../quasar.html',
      scopeHoisting: true,
      vueRouterMode: 'history',
      extendWebpack(cfg) {
        cfg.resolve.extensions.push('.ts', '.tsx');

        cfg.resolve.alias.router = appPaths.resolve.src('router');
        cfg.resolve.alias.store = appPaths.resolve.src('store');

        cfg.resolve.alias.vue = 'vue/dist/vue.common'

        cfg.module.rules.push({
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        });
        cfg.plugins.push(new VueLoaderPlugin());
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QContextMenu',
        'QCollapsible'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ]
    },    
    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
