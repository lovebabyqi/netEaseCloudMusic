module.exports = {
    devServer:{
        proxy:{
            '/':{
                target:'http://nec.lovebabyqi.cn',
                pathRewrite:{
                    '/':''
                }
            }
        }
    },
    productionSourceMap:false,
}
// module.exports = {
// //     productionSourceMap:false,
// // }