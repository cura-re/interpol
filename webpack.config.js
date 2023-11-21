// module.exports = () => {
//   const config = {
//     module: {
//       rules: [
//         {
//           test: /\.(ts|js)x?$/,
//           exclude: [/node_modules\/(?!(three)\/)\/**\/**\/.*/],
//           loader: 'babel-loader',
//         },
//       ],
//     }
//   };

//   return config;
// };

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}