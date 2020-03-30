import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
import themePluginConfig from './themePluginConfig';

const { pwa } = defaultSettings;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
            },
            //TODO:以下所有，都没有添加组件
            //首页
            {
              path: '/home',
              name: 'home',
              icon: 'home',
              component: './Home/Home',
              authority: ['admin', 'user'],
            },

            //商品管理
            {
              path: '/goodManage',
              name: 'goodManage',
              icon: 'dashboard',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            {
              path: '/changePrice',
              name: 'changePrice',
              icon: 'profile',
              component: './ChangePrice/ChangePrice',
              authority: ['admin', 'user'],
            },
            /*/价签管理
            {
              path: '/tagManage',
              name: 'tagManage',
              icon: 'tag',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //样式管理
            {
              path: '/styleManage',
              name: 'styleManage',
              icon: 'picture',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //店铺管理
            {
              path: '/shopManage',
              name: 'shopManage',
              icon: 'shop',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //路由器管理
            {
              path: '/routerManage',
              name: 'routerManage',
              icon: 'control',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //用户管理
            {
              path: '/userManage',
              name: 'userManage',
              icon: 'user',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //定期任务管理
            {
              path: '/taskManage',
              name: 'taskManage',
              icon: 'pushpin',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //数据备份与导入
            {
              path: '/dataManage',
              name: 'dataManage',
              icon: 'database',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //证书管理
            {
              path: '/certificateManage',
              name: 'certificateManage',
              icon: 'audit',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },
            //系统参数设置
            {
              path: '/setting',
              name: 'setting',
              icon: 'setting',
              component: './GoodManage/GoodManage',
              authority: ['admin', 'user'],
            },*/
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },

    //TODO:添加新布局(后期不要)
    {
      path: '/test',
      component: '../layouts/TestLayout',
      routes: [],
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: {
    '/api': {
      target: 'http://47.107.139.6:8086',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
} as IConfig;
