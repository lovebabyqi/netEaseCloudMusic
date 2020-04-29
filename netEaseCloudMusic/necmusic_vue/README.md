### necmusic_vue
### 1.网易云音乐移动端网页版
​	**接口来自github分享,仅供学习用,请勿用作其他用途**

[接口文档地址github:<https://github.com/Binaryify/NeteaseCloudMusicApi> ](https://github.com/Binaryify/NeteaseCloudMusicApi)

#### 安转依赖

```javascript
yarn install
```

#### 运行项目

```javascript
yarn run serve
```

#### 打包项目

```javascript
yarn run build
```

### 2.写完播放器页,整理下思路

<img src='https://github.com/lovebabyqi/netEaseCloudMusic/blob/master/netEaseCloudMusic/images/player.png'>

<img src='<https://github.com/lovebabyqi/netEaseCloudMusic/blob/master/netEaseCloudMusic/images/player.png> '>

思路:请求到数据后,播放audio,获取audio的currentTime进度,(可以开循环定时器500ms获取一次,或者给audio绑定**@timeupdate**),

audio.currentTime 进度时间

audio.duration 总时长

将时间转换为秒

### 1.指针旋转,图片旋转,背景

定义播放状态`playing:false`默认为false,播放为true

根据播放状态给指针和图片绑定动态class类名

**指针抬起样式**

```css
.desc-needle.active {
    transform: translateX(-30%) rotate(0deg);/*播放状态,指针放下*/
}
.desc-needle {
    transition: transform 0.5s;
    position: absolute;/*调整位置*/
    left: 50%;
    transform-origin: 0 0;/*可设置旋转起点*/
    transform: translateX(-30%) rotate(-20deg);/*未播放时,指针抬起*/
    width: 140px;
    height: 140px;
    background: url("../../../assets/images/needle-ip6.png");/*碟片背景*/
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 11;
}
```

**碟片旋转样式**

```css
.song-desc.active {
    animation: rotateActive 20s infinite linear;
}
@keyframes rotateActive {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

**背景样式CSS3滤镜 filter:blur(15px)**

#### 2.歌词滚动

网易云接口拿到的歌词是字符串

```javascript
lyric: "[00:00.000] 作曲 : 李林↵[00:00.350] 作词 : 阮若珊↵[00:01.052]编曲：谭畅/陈麒元↵[00:01.203]制作人：蔡诚俊↵[00:01.334]Rap词：大宝Bles.P↵[00:05.033]↵[00:47.410]人人（那个）都说（哎）沂蒙山好↵[00:57.801]沂蒙（那个）山上（哎）好风光↵[01:08.153]青山（那个）绿水（哎）多好看↵[01:18.326]风吹（那个）草低（哎）见牛羊↵[01:30.329]听闻人们传说↵[01:31.582]沂蒙山的幅员辽阔↵[01:33.012]风光旖旎↵[01:34.046]任凭岁月蹉跎↵[01:35.562]青山绿水倒影英雄气魄↵[01:37.706]万担谷子堆满仓门↵[01:39.327]红色精神是承诺↵[01:40.692]哎人人都说它好↵[01:42.556]沂蒙心系四方↵[01:44.052]改革开放新的篇章↵[01:45.847]哎人人都说它好↵[01:47.758]沂蒙精神↵[01:48.637]我早已铭记心上↵[01:50.801]高梁（那个）红来（哎）稻花香↵[02:00.819]万担（那个）谷子（哎）堆满仓↵[02:30.657]人人（那个）都说（哎）沂蒙山好↵[02:40.712]沂蒙（那个）山上（哎）好风光↵[02:50.751]沂蒙（那个）山上（哎）好风光↵[03:14.674]↵[03:15.462]吉他:陈麒元↵[03:15.736]贝斯:陈麒元↵[03:16.086]录音：李雯蕙↵[03:16.367]录音室：悦晟音乐&和声录音棚↵[03:16.802]混音：江松松↵[03:17.121]混音室：北京九紫天诚录音室↵[03:20.076]↵[03:20.433]“回乡遇见美丽中国”↵[03:20.780]—2020春节网络传播行动↵[03:21.495]联合出品：中国青年报社↵[03:21.881]营销推广：北京智慧大狗文化传媒有限公司↵[03:22.239]制作出品：悦晟雷音（北京）文化传媒有限公司↵"
```

字符串歌词,处理一下,分割转换为数组,时间以秒为基本单位

```javascript
let _lyricList = lyric.split('\n').map(item => {//用换行符 \n分割
    let cItem = item.split(']') || '';//连续换行或最后一个换行分割后会出现空串,split出错
    return {
        time: cItem[0].slice(1, 6),
        content: cItem[1]
    }
});
this.lyricList = Object.freeze(_lyricList)
//处理结果
//[{time:'00:00',content:'第一句歌词'},{time:'00:03',content:'第二句歌词'}]
```

现在需要确定哪一行歌词正在播放,用计算属性

```html
<div class="lyric-item">
    <div class="item" :style="{transform:`translateY(${-lyricIndex*22+'px'})`}">
        <p
                class="lyric"
                v-for="(lyric,index) in lyricList"
                :key="index"
                :data-index="mathIndex(lyric,index)"
                :class="{active:index===lyricIndex}"
        >
            {{lyric.content}}
        </p>
    </div>
</div>
```

**定义一个lyricIndex值,记录当前应该是哪一句歌词**,

**计算属性抛出一个函数可接收参数**,歌词的time是个时间节点,进度时间是一直往前走的

```javascript
computed: {
    mathIndex() {//计算属性,抛出一个函数,传递参数
        return  (lyric,index)=> {
            if(lyric.time===this.currentTime){//每次进度时间到达歌词时间,保存Index
                this.lyricIndex = index;//保存index,根据index控制歌词滚动
                return true;
            }
        }
    }
},
```

#### 3.进度条和小球

```javascript
currentTime: '', //进度时间00:00字符串
timeLong: '', //歌曲总时长00:00字符串
currentTimeNumber:0,//进度时间s
timeLongNumber:0,//总时长s
```

进度条根据**进度时间currentTimeNumber**和**总时长timeLongNumber**,时长转换为s单位,计算百分比,

```html
<div class="progress-box">
    <progress :max="timeLongNumber" :value="currentTimeNumber" class="my-progress"></progress>
    <div class="boll" :style="{transform:mathLeft}"></div>
    <span class="now-time time">{{currentTime}}</span>
    <span class="time-long time">{{timeLong}}</span>
</div>
```

计算小球位置,260是进度条长度260px

```javascript
this.mathLeft = `translateX(${(currentTimeNumber / timeLongNumber) * 260 + "px"})`;
```

进度条样式

```css
.my-progress:focus {
    outline: none;
}
.my-progress {
    position: relative;
    outline: none;
    width: 260px;
    height: 3px;
    color: #f00;
    border-radius: 0.1rem;
}
/* 表示总长度背景色 */
.my-progress::-webkit-progress-bar {
    background-color: #999;
    border-radius: 0.2rem;
}
/* 表示已完成进度背景色 */
.my-progress::-webkit-progress-value {
    background-color: #fff;
    border-radius: 0.2rem;
}
```

### 想得挺美,Vue不让咱们这么干

**警告:You may have an infinite update loop in a component render function.**

> 事实上是这样的，在 `v-for` 循环当中，如果用方法或者计算属性对 vm.$data 的属性进行操作，理论上，可能因为修改到循环对象，诱发无限循环。此时 Vue 就会发出警告（并不是真的已经无限循环了）。 

虽然并没有诱发无限循环,但是Vue警告我们这是危险操作,不希望我们在计算属性里修改vm.$data,

**思路,不让我们这么干,惹不起躲得起,计算属性那么香,既然警告了我们就换个思路**

```javascript
findLyric(){//查找歌词
    let currentIndex = this.lyricList.findIndex((item)=>{
        return item.time === this.currentTime
    });
    if(currentIndex!==-1){//找到当前进度时间的 歌词条目
        this.lyricIndex = currentIndex
    }
},
```

**audio标签timeupdate事件**

```javascript
getCurrentTime() {
	let nowTime = Date.now();//获取当前时间戳
	//歌词的时间节点是00:00以秒为单位的,节流不能大于1s,大于1s可能会跳过歌词条目
	if(nowTime-this.preTime>500){   //节流每隔500ms执行一次
		this.findLyric();
		this.currentTimeNumber = + this.$refs.myAudio.currentTime.toString().split(".")[0]; 
        //播放进度s为单位
		this.mathLeft = `translateX(${(this.currentTimeNumber / this.timeLongNumber) * 260 + "px"})`;//进度条小球位置
		this.currentTime = this.stringTime(this.currentTimeNumber);//进度时间
		this.preTime = nowTime;
	}
}
```

#### !!!记录总结:v-for循环列表当中,不能用计算属性或方法不能直接修改vm.$data

###### (如elementUI库表格,formatter,不能直接修改vm.$data,vue认为这是危险操作,可能造成死循环)