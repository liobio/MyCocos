##基本语法结构
``` ts
let 变量名: 类型 = 初始值
 
ts 类型
ts 的常用基础类型分为两种： js 已有类型
 
原始类型：number/string/boolean/null/undefined/symbol
对象类型：object（包括，数组、对象、函数等对象）
 
ts 新增类型
联合类型（联合类型使用“|"分隔每个类型,比如string | number）
自定义类型(类型别名)
接口（用于约束对象、函数、类的契约（标准），代码约束，
强标准：在代码中使用的标准就是接口：interface）
元组（固定长度的数组）
字面量类型（将一个字面量当成一个类型使用。）
枚举（常用于数据的映射）
void（表示没有任何类型）
any（任意类型）
ts修饰符
public 定义类的变量默认就是公共的，继承的子类可以通过this来访问
private 定义类的私有属性，只能在内部访问
protected: 在类的内部和子类中可以访问,在外面就访问不到了
```
##生命周期 
``` ts
construct    新建时触发，整个生命周期只会触发一次
onLoad       节点激活时触发，整个生命周期只会触发一次
start        节点第一次激活时触发，在update之前，整个生命周期只会触发一次
update       动画、物理、粒子等渲染前执行，每帧调用
lateUpdate   动画、物理、粒子等渲染后执行，每帧调用
onDestroy    销毁时执行，整个生命周期只会触发一次
onEnable     组件enabled从false变为true，或者节点active从false变为true触发
onDisable    组件enabled从true变为false，或者节点active从ture变为false触发
```
##节点操作
``` ts 
//切换场景
director.loadScene("MyScene")
 
//获取节点
find(节点路径)
 
//获取节点组件，获取脚本前先引入脚本
this.getComponent（组件名或脚本）
//通过名称获取节点的子节点
this.node.getChildByName('节点名称');
 
//清空所有子元素
this.node.destroyAllChildren()（）
 
//加载资源,所有需要通过 loader.loadRes 动态加载的资源，都必须放置在 resources 文件夹或它的子文件夹下。
loader.loadRes(路径，类型，回调(res,clip))
//loader.loadRes类型参数（类型可以不填）
//AudioClip（）（音频资源类）
 
//节点事件
this.node.on()（绑定事件）
Node.EventType.TOUCH_START（当手指触摸到屏幕时，点击事件）
Node.EventType.TOUCH_MOVE（当手指在屏幕上移动时。）
Node.EventType.TOUCH_END(当手指在目标节点区域内离开屏幕时)
 
//坐标操作
 
this.node.convertToWorldSpaceAR()(将节点坐标系下的一个点转换到世界空间坐标)
this.node.convertToNodeSpaceAR()(将一个点转换到节点 (局部) 空间坐标系)
sub(向量减法，并返回新结果。)
var v = v2(10, 10);
v.sub(v2(5, 5));      // return Vec2 {x: 5, y: 5};
```
##音频操作
``` ts
//音频对象，用来创建音频，音效
audioEngine（）
 
//播放背景音乐，可以用变量接收音频id
id=audioEngine.playMusic(文件，是否循环)
 
//播放音效，同上
id=audioEngine.playEffect(文件，是否循环)
 
// 是否正在播放
audioEngine.isMusicPlaying()
 
// 暂停
audioEngine.pause(id) //根据id暂停播放音频
 
// 恢复
audioEngine.resume(id)
 
// 停止播放指定音频
audioEngine.stop(id)
 
// 循环
audioEngine.setLoop(id,true)
 
// 设置音量（0.0 ~ 1.0）audioEngine.setVolume(id,0.5)
```

##面板可视化
###@property()
添加类的属性
是组件类时，需要在括号添加组件名称，不加不会出现在检查器面板中
``` ts
@property(Label)//添加类的属性，非基础类型，是组件类，所以需要添加（Label）
label: Label = null;
@property//添加类的属性，基础类，不需要添加（）
text: string = 'hello';
```
![](2023-01-13-17-20-27.png)

