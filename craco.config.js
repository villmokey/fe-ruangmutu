const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#6A9695' ,
              // '@text-color': '#fff', 
              // '@text-color-secondary': '#757575',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};