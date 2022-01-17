const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonPaths = require('../common-paths');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: `${commonPaths.projectRoot}/docs/bundle-size.html`, // report
        statsFilename: `${commonPaths.projectRoot}/docs/stats.json`, // json
        generateStatsFile : true, // 파일생성 여부
        openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
    })
  ]
}