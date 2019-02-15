import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/estelle/Project/WebSentry-FrontEnd/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "component": _dvaDynamic({
  
  component: () => import('../Welcome'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/estelle/Project/WebSentry-FrontEnd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "name": "Explore",
        "icon": "global",
        "path": "/explore",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/estelle/Project/WebSentry-FrontEnd/src/pages/Explore/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import('../Explore'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "Dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/blank",
            "name": "Blank",
            "icon": "plus-square",
            "component": _dvaDynamic({
  
  component: () => import('../dashboard/blank'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "name": "NewBlank",
            "icon": "switcher",
            "path": "/dashboard/newblank",
            "component": _dvaDynamic({
  
  component: () => import('../dashboard/newblank'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "name": "notifications",
            "icon": "bell",
            "path": "/dashboard/notifications",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/estelle/Project/WebSentry-FrontEnd/src/pages/dashboard/notifications/model.js').then(m => { return { namespace: 'model',...m.default}})
],
  component: () => import('../dashboard/notifications'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "name": "Settings",
            "icon": "setting",
            "path": "/dashboard/settings",
            "component": _dvaDynamic({
  
  component: () => import('../dashboard/Settings'),
  LoadingComponent: require('/Users/estelle/Project/WebSentry-FrontEnd/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/estelle/Project/WebSentry-FrontEnd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('/Users/estelle/Project/WebSentry-FrontEnd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/estelle/Project/WebSentry-FrontEnd/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
