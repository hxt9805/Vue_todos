const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

/* 
  ES6模块化暴露
    分别暴露 统一暴露 默认暴露
    import
  CommonJS
    module.exports | exports
    require

*/
module.exports = {
  // 模式: 生产环境
  mode: 'production',
  // 入口
  entry: {
    app: path.resolve(__dirname, 'src_todo/index.js')
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块加载器
  module: {
    rules: [
      // 处理ES6转ES5语法的
      {
        test: /\.js$/, // 匹配文件
        exclude: /(node_modules|bower_components)/, // 排除哪些文件
        include: path.resolve(__dirname, 'src'), // 包含哪些文件(只处理哪里的文件)
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //打包编译css的
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      },
      //处理.vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    //解析.vue文件需要引入的插件(必须)
    new VueLoaderPlugin()
  ],
  // 配置开发服务器
  // 修改了源代码后,需要重新手动打包, 才能看见页面的更新效果
  // 配置此项后会自动编译打包(在内存中的打包,未在本地输出dist下的系列文件的更新), 刷新浏览器
  devServer: {
    open: true, // 自动打开浏览器
    quiet: true, // 不做太多日志输出
  },
  // 配置开启source-map调试
  // 作用是, 当遇到错误的时候, 告知你出问题的代码在源文件的哪一行
  devtool: 'eval-cheap-module-source-map',
  // 引入模块(路径)的解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
    alias: { // 路径别名(简写方式)
      // 都是模块引入的路径别名
      // 路径别名, 可以自己定义别名是声明路径,当使用的时候, 那个别名就相当于, 你在这里写的别名的路径
      'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
      '@': path.resolve(__dirname,'src') // 在路径中使用@表示路径是src下开始找的
    }
  }
}