const routes = [{
  path:      '/',
  component: () => import('layouts/MainLayout.vue'),
  children:  [{
    path:      '',
    name:      'index',
    component: () => import('pages/indexPage.vue')
  }, {
    path:      'setup',
    name:      'setup',
    component: () => import('pages/setupPage.vue')
  }, {
    path:      'write',
    name:      'write',
    component: () => import('pages/writePage.vue')
  }, {
    path:      'plan',
    name:      'plan',
    component: () => import('pages/setupPage.vue')
  }, {
    path:      'content',
    name:      'content',
    component: () => import('pages/contentsPage.vue')
  }, {
    path:      'app',
    name:      'app',
    component: () => import('pages/appPage.vue')
  }
  ]
},

  // Always leave this as last one,
  // but you can also remove it
                {
                  path:      '/:catchAll(.*)*',
                  component: () => import('pages/errorNotFound.vue')
                }];

export default routes;
