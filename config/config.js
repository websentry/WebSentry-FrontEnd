// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { hmr: true },
        targets: { ie: 11 },
        locale: {
          enable: true,
          // default false
          default: 'zh-CN',
          // default zh-CN
          baseNavigator: true,
        },
        // default true, when it is true, will use `navigator.language` overwrite default
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
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
  ],
  targets: { ie: 11 },
  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/welcome',
        },
        // dashboard
        {
          name: 'explore',
          icon: 'global',
          path: '/explore',
          component: './Explore',
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          icon: 'dashboard',
          routes: [
            {
              path: '/dashboard/blank',
              name: 'Blank',
              icon: 'plus-square',
              component: './dashboard/blank',
            },
            {
              name: 'NewBlank',
              icon: 'switcher',
              path: '/dashboard/newblank',
              component: './dashboard/newblank',
            },
            {
              name: 'notifications',
              icon: 'bell',
              path: '/dashboard/notifications',
              component: './dashboard/notifications',
            },
            {
              name: 'Settings',
              icon: 'setting',
              path: '/dashboard/settings',
              component: './dashboard/Settings',
            },
          ],
        },
      ],
    },
  ],
  disableRedirectHoist: true,
  /**
   * webpack 相关配置
   */
  define: { APP_TYPE: process.env.APP_TYPE || '' },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': primaryColor },
  externals: { '@antv/data-set': 'DataSet' },
  ignoreMomentLocale: true,
  lessLoaderOptions: { javascriptEnabled: true },
};
