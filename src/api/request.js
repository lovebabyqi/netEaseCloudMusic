import axios from 'axios';
// axios.defaults.baseURL = 'http://nec.lovebabyqi.cn'
//统一数据
axios.interceptors.response.use(res=>res.data);

export default function request(url,data={},method='get'){
    return new Promise(resolve=>{
        let p = null;
        if(method==='get'){
            p = axios.get(url,{
                params:data
            });
        }else{
            p = axios.post(url,data);
        }
        p.then(res=>{
            resolve(res)
        })
    })
}