const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ["/auth",'/chatting'],
        createProxyMiddleware({
            // 프론트는 3000번 포트 백엔드는 5000번 포트
            // 요청하고자 하는 주소를 설정
            target: 'http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000/',
            // target:'http://localhost:5000',
            changeOrigin: true,
        })
    );
};