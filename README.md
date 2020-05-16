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

<img src='http://n.lovebabyqi.cn/images/player.png'>

思路:请求到数据后,播放audio，获取audio的currentTime进度，(可以开循环定时器500ms获取一次，或者给audio绑定**@timeupdate**),

audio.currentTime 进度时间

audio.duration 总时长

将时间转换为秒

#### 2.1 指针旋转，图片旋转，背景

指针和图片动画只依赖一个数据 ：`playing`播放状态，正在播放`true`，暂停`false`

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

#### 2.2 进度条和小球运动

屏幕视口变化，尺寸变化，初始第一次加载，计算进度条宽度60vw。

```javascript
window.onresize = ()=>{//视口变化
    this.progressWidth = document.body.offsetWidth *0.6;
}
```

计算相关数据依赖：总时长、当前时长，由于计算歌词，显示时长需要`00:00`格式，进度条需要的是Number数值，所以数据分为两组：

```javascript
currentTime: '', //进度时间00:00字符串
timeLong: '', //歌曲总时长00:00字符串
currentTimeNumber:0,//进度时间s
timeLongNumber:0,//总时长s
mathLeft:'',//存储计算出的小球位移量
```

给`audio`绑定`timeupdate`监听播放进度

```javascript
getCurrentTime(e) {  //绑定了audio.timeupdate事件,计算时间,小球位置,歌词位置
    let nowTime = Date.now();//获取当前时间戳
    //歌词的时间节点是00:00以秒为单位的,节流不能大于1s,大于1s可能跳过了歌词条目
    if (nowTime - this.preTime > 300) {   //节流每隔300ms执行一次
        this.findLyric();
        this.currentTimeNumber = parseInt(e.target.currentTime); //播放进度取整，s为单位
        this.mathLeft = `translateX(${(this.currentTimeNumber / this.timeLongNumber) * (this.progressWidth) + "px"})`;
        //进度条小球位置,250px不能写死,视口变化后会出问题,将progress宽度设置为60vw,挂载时计算一次60vw
        this.currentTime = this.stringTime(this.currentTimeNumber);//进度时间
        this.preTime = nowTime;
        this.timeLongNumber = Math.ceil(e.target.duration); //总时长向上取整s为单位
        this.timeLong = this.stringTime(this.timeLongNumber);//总时长'03:10'
    }
},
stringTime(time) {   //格式时间1:1-->01:01
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);
    function toTwo(num) {
        //这个方法用来格式时间1-->01
        return num < 10 ? "0" + num : num + "";
    }
    return toTwo(m) + ':' + toTwo(s);//歌曲时间确定不超过一小时
},
```



进度条及小球

```html
<div class="progress-box">
    <progress :max="timeLongNumber" :value="currentTimeNumber" class="my-progress"></progress>
    <div class="boll" :style="{transform:mathLeft}"></div>
    <span class="now-time time">{{currentTime}}</span>
    <span class="time-long time">{{timeLong}}</span>
</div>
```

进度条样式

```css
.my-progress {
    position: relative;
    outline: none;
    width: 60vw;
    height: 3px;
    border-radius: 0.1rem;
}
/* 表示总长度背景色 */
.my-progress::-webkit-progress-bar {
    background-color: #999;
}
/* 表示已完成进度背景色 */
.my-progress::-webkit-progress-value {
    background-color: red;
}
```

#### 2.3 歌词滚动

网易云接口拿到的歌词是字符串

```javascript
lyric: "[00:00.000] 作曲 : 李林↵[00:00.350] 作词 : 阮若珊↵[00:01.052]编曲：谭畅/陈麒元↵[00:01.203]制作人：蔡诚俊↵[00:01.334]Rap词：大宝Bles.P↵[00:05.033]↵[00:47.410]人人（那个）都说（哎）沂蒙山好↵[00:57.801]沂蒙（那个）山上（哎）好风光↵[01:08.153]青山（那个）绿水（哎）多好看↵[01:18.326]风吹（那个）草低（哎）见牛羊↵[01:30.329]听闻人们传说↵[01:31.582]沂蒙山的幅员辽阔↵[01:33.012]风光旖旎↵[01:34.046]任凭岁月蹉跎↵[01:35.562]青山绿水倒影英雄气魄↵[01:37.706]万担谷子堆满仓门↵[01:39.327]红色精神是承诺↵[01:40.692]哎人人都说它好↵[01:42.556]沂蒙心系四方↵[01:44.052]改革开放新的篇章↵[01:45.847]哎人人都说它好↵[01:47.758]沂蒙精神↵[01:48.637]我早已铭记心上↵[01:50.801]高梁（那个）红来（哎）稻花香↵[02:00.819]万担（那个）谷子（哎）堆满仓↵[02:30.657]人人（那个）都说（哎）沂蒙山好↵[02:40.712]沂蒙（那个）山上（哎）好风光↵[02:50.751]沂蒙（那个）山上（哎）好风光↵[03:14.674]↵[03:15.462]吉他:陈麒元↵[03:15.736]贝斯:陈麒元↵[03:16.086]录音：李雯蕙↵[03:16.367]录音室：悦晟音乐&和声录音棚↵[03:16.802]混音：江松松↵[03:17.121]混音室：北京九紫天诚录音室↵[03:20.076]↵[03:20.433]“回乡遇见美丽中国”↵[03:20.780]—2020春节网络传播行动↵[03:21.495]联合出品：中国青年报社↵[03:21.881]营销推广：北京智慧大狗文化传媒有限公司↵[03:22.239]制作出品：悦晟雷音（北京）文化传媒有限公司↵"
```

字符串歌词，处理一下，分割转换为数组，时间以秒为基本单位。

```javascript
let _lyricList = lyric.split('\n').slice(0,-1).map(item => {//用换行符 \n分割
    let cItem = item.split(']');//最后一个换行分割后会出现空串,slice(0,-1)去除最后一项再遍历
    return {
        time: cItem[0].slice(1, 6),
        content: cItem[1]
    }
});
this.lyricList = Object.freeze(_lyricList)
//处理结果
//[{time:'00:00',content:'第一句歌词'},{time:'00:03',content:'第二句歌词'}]
```

现在需要确定哪一行歌词正在播放，计算`lyricIndex`控制歌词滚动

前面我们已经得到了`currentTime`

```javascript
findLyric() {//查找歌词
    let currentIndex = this.lyricList.findIndex((item) => {
        return item.time === this.currentTime;//currentTime是进度时间
    });
    if (currentIndex !== -1) {//找到当前进度时间的歌词条目
        this.lyricIndex = currentIndex;
    }
},
```

确定好了`lyricIndex`，现在只要绑定动态类名添加样式，给歌词`transform:transLateY()`向上移动。

```html
<div class="lyric-item">
    <div class="item" :style="{transform:`translateY(${(-lyricIndex+2)*22+'px'})`}">
        <p
            class="lyric"
            v-for="(lyric,index) in lyricList"
            :key="index"
            :class="{active:index===lyricIndex}">
            {{lyric.content}}
        </p>
    </div>
</div>
```

#### 2.4 播放进度控制

点击进度条可跳转进度播放

```javascript
<div class="progress-box">
    <progress :max="timeLongNumber" :value="currentTimeNumber" class="my-progress"></progress>
    <div class="boll" :style="{transform:mathLeft}"></div>
    <span class="now-time time">{{currentTime}}</span>
    <span class="time-long time">{{timeLong}}</span>
</div>
```

我们给进度条盒子`progress-box`设置了定位，点击进度条拿到`e.offsetX`点击位置，设置`audio.currentTime`，就能实现跳转。

```javascript
toggleTime(e){//点击进度条
    this.$bus.$emit('changeCurrentTime',e.offsetX);//事件车传递数据
}
```

接收：

```javascript
this.$bus.$on('changeCurrentTime',(offsetX)=>{//用事件车监听进度条点击，控制播放进度
    this.$refs.myAudio.currentTime = offsetX;
})
```

