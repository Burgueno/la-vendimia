import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Home/reducer'),
          import('containers/Home'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('home', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/ventas',
          name: 'sales',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/Sales/reducer'),
              import('containers/Sales/sagas'),
              import('containers/Sales'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('sales', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: '/ventas/nueva-venta',
          name: 'newSale',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/NewSale/reducer'),
              import('containers/NewSale/sagas'),
              import('containers/NewSale'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('newSale', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: '/clientes',
          name: 'clients',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/Clients/reducer'),
              import('containers/Clients/sagas'),
              import('containers/Clients'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('clients', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: '/articulos',
          name: 'products',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/Products/reducer'),
              import('containers/Products/sagas'),
              import('containers/Products'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('products', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: '/configuracion',
          name: 'settings',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/Settings/reducer'),
              import('containers/Settings/sagas'),
              import('containers/Settings'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('settings', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
