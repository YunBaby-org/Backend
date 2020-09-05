// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/final/" : "/"
};
module.exports = {
  devServer: {
      disableHostCheck: true,
  }
}