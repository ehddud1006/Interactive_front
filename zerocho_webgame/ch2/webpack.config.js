const path = require("path"); // path는 node 에서 기본적으로 제공하는 모듈
const webpack = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  name: "wordRelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"], // resolve 를 적어줌으로써 entry에서 확장자명 생략 가능
  },
  entry: {
    app: ["./ClientFunction"],
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/, //js와 jsx 에 babel-loader가 적용된다.
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin(),
  ], // 바로 위 rules의 loader의 option에 debug를 true 로 넣어준다. 28번줄 코드처럼 말이다.
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    // 만약 index.html 이 다른 src 폴더 안에 있다면
    // static: { directory: path.resolve(__dirname), 'src' },
    hot: true,
  },
};
