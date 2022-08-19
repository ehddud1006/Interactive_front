const path = require("path"); // path는 node 에서 기본적으로 제공하는 모듈

module.exports = {
  name: "wordRelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"], // resolve 를 적어줌으로써 entry에서 확장자명 생략 가능
  },
  entry: {
    app: ["./Client"],
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/, //js와 jsx 에 babel-loader가 적용된다.
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), // /Volumes/T7/DongYoung/Interactive_front/zerocho_webgame/ch2/dist
    filename: "app.js",
  }, // 출력
};
