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
    }
}