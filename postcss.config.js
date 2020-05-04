module.exports = {
    plugins: {
        "postcss-px-to-viewport":{
            viewportWidth: 375,//转换前视口宽度
            unitPrecision: 3, //转换后的小数位
            viewportUnit: 'vw',//转换为vw
        }
    }
};