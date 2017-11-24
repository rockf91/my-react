var path = require('path')
var webpack = require('webpack')
//配置文件是放在config的目录下的，所有这里定义了一个项目的根目录变量
// var projectRootPath = path.resolve(__dirname,'..') 
var projectRootPath = path.resolve(__dirname,'.') 

var config = {
  entry: [path.resolve(projectRootPath,'src/myapp.js')],
  output:{
    path: path.resolve(projectRootPath,'public','assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['react', 'es2015'],
          plugins:[]
        }
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV:JSON.stringify(process.env.NODE_ENV)
      }
     })
  ]
}

//添加hotreplace支持
if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval';
  config.entry.unshift('webpack-hot-middleware/client');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  // Note: enabling React Transform and React Transform HMR:
  config.module.loaders[0].query.plugins.push([
    'react-transform', {
      transforms: [{
        transform : 'react-transform-hmr',
        imports   : ['react'],
        locals    : ['module']
      }]
    }
  ]);
}

module.exports=config;