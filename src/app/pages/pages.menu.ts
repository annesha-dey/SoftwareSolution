export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'general.menu.maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'general.menu.charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        }
      },
     {
        path: 'sites',
        data: {
          menu: {
            title: 'general.menu.sites',
            icon: 'ion-map',
            selected: false,
            expanded: false,
            order: 250,
          }
        }
     },
     {
        path: 'devices',
        data: {
          menu: {
            title: 'general.menu.devices',
            icon: 'ion-wifi',
            selected: false,
            expanded: false,
            order: 300,
          }
        }
     },
     {
        path: 'assets',
        data: {
          menu: {
            title: 'general.menu.assets',
            icon: 'ion-android-apps',
            selected: false,
            expanded: false,
            order: 400,
          }
        }
      },
      {
        path: 'association',
        data: {
          menu: {
            title: 'general.menu.association',
            icon: 'ion-shuffle',
            selected: false,
            expanded: false,
            order: 500,
          }
        }
      },
      {
        path: 'rules',
        data: {
          menu: {
            title: 'general.menu.rules',
            icon: 'ion-android-share-alt',
            selected: false,
            expanded: false,
            order: 600,
          }
        }
      },
      {
        path: 'predictions',
        data: {
          menu: {
            title: 'general.menu.predictions',
            icon: 'ion-arrow-graph-up-right',
            selected: false,
            expanded: false,
            order: 700,
          }
        }
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'general.menu.settings',
            icon: 'ion-ios-gear',
            selected: false,
            expanded: false,
            order: 800,
          }
        }
      }
    ]
  }
];
