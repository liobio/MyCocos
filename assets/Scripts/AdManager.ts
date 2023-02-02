// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { _decorator, Component, sys, Node, find, director, input, Input, EventTouch, Button, log, Label } from 'cc';

import AdData from "./AdData";
const { ccclass, property } = _decorator;

/**
 * 原生位置
 */
export enum YuanShengCustom_POS {
    LEFT = 0,       //左边
    CENTER = 1,     //居中
    BOTTOM = 2,     //底部
    TOP = 3,        //顶部
}


@ccclass
export default class AdManager extends Component {


    public static VIVO_YUANSHENG_AD = "VIVO_YUANSHENG_AD";

    public static isPop = false;

    public static isFirst = true;

    /**
     * 是否调用vivo广告 (pc端调试用false)
     */
    public static isShowVivoAd = true;

    /**
     * 计时器
     */
    public static numTimer;

    /**
     * banner 计时器
     */
    public static numBannerTimer;



    private static _ins: AdManager;
    public static instance() {
        if (!this._ins) {
            this._ins = new AdManager();
        }

        return this._ins;
    }


    /**
     * 初始化vivo广告
     */
    public static init_Ad() {

        if (!this.isShowVivoAd) return;

        this.create_Banner();
        this.create_YuanShengCustom_Ad();
        this.create_RewardedVideo();

        /**
         * 游戏切入后台事件
         */
        qg.onHide(() => {
            AdManager.Hide_YuanShengCustom_Ad();
            AdManager.Hide_Banner();
        });

        //banner 30秒轮播
        // clearInterval(AdManager.numBannerTimer);
        // AdManager.numBannerTimer = setInterval(() => {

        //   if (AdData.Banner_Ad) {
        //     AdData.Banner_Ad.show();
        //   }
        //   else {
        //     this.Show_Banner();
        //   }

        // }, 30000);

    };

    /**
     * 获取系统信息
     * @returns 
     */
    public static get_SysInfo() {
        var sysInfo = qg.getSystemInfoSync();
        console.log("on getSystemInfoSync: success =" + JSON.stringify(sysInfo));
        //{"right":2340,"bottom":1080,"left":73,"top":0,"width":2267,"height":1080}
        return sysInfo;
    }

    /**
     * 创建Banner 广告
     ** 1.Banner广告实例不能复用，每次需要重新加载时要重新create
     ** 2.如果先调用createBannerAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()
     ** 3.如果有场景需要再次展示广告，如果广告被关闭了或者调了close()，必须重新创建才能展示出来，此时show()无效
     ** 4.广告调试时，会有可能因为填充率不足而展示不出来，具体请查看教程中的错误码信息
     ** 5.Banner广告创建间隔不得少于3s
     */
    public static create_Banner(cb?) {

        // var sysInfo = qg.getSystemInfoSync();     //获取系统信息
        // console.log("on getSystemInfoSync: success =" + JSON.stringify(sysInfo));

        //获取当前手机屏幕高度(dp)
        // let bannerTop = sysInfo.safeArea.height;

        AdData.Banner_Is_Loaded = false;

        //banner广告创建间隔不得少于3s
        if (AdData.create_Banner_Time) {

            console.log("banner创建 间隔  -> " + (AdData.Now_Time() - AdData.create_Banner_Time));
            if ((AdData.Now_Time() - AdData.create_Banner_Time) < 3000) {
                console.log("banner广告创建间隔不得少于3s");
                return;
            }
        }

        this.Hide_Banner();

        //style内无需设置任何字段，banner会在屏幕底部居中显示，
        // 没有style字段，banner会在上边显示
        AdData.Banner_Ad = qg.createBannerAd({
            posId: AdData.banner_Id,
            // style: {
            //   top: bannerTop - 170,
            //   left: (sysInfo.safeArea.width - 1080) * 0.5,
            // },
        });

        AdData.create_Banner_Time = AdData.Now_Time();

        // AdData.Banner_Ad.onSize((width, height) => {
        //   console.log("banner 真实宽度 高度 -> ", width, height);
        //   if (height === 0) return;
        //   // AdData.Banner_Ad.style.top = sysInfo.safeArea.height - height;
        //   // AdData.Banner_Ad.style.left = (sysInfo.safeArea.width - width) / 2;
        // });

        //监听banner广告加载结束事件
        AdData.Banner_Ad.onLoad(() => {
            console.log("Banner onload --------> 成功");
            AdData.Banner_Is_Loaded = true;

            if (AdData.Banner_Ad) {

                //取消监听banner广告加载结束事件
                AdData.Banner_Ad.offLoad(() => { });
                console.log("Banner 移除广告加载事件");

                if (cb) {
                    cb();
                }
                else {

                    //隐藏原生模板广告
                    // AdManager.Hide_YuanShengCustom_Ad();

                    console.log("显示 Banner");
                    AdData.Banner_Ad.show();
                }
            }

        });

        //监听banner广告错误事件
        AdData.Banner_Ad.onError((errMsg, errCode) => {
            console.log("Banner onError ---------> errMsg: " + JSON.stringify(errMsg) + "  errCode:" + errCode);
        });

        //监听banner广告关闭事件
        AdData.Banner_Ad.onClose(() => {
            console.log("Banner onClose");
            AdData.Banner_Ad = null;


            //banner关闭 30秒再弹
            // clearTimeout(AdManager.numBannerTimer);
            // AdManager.numBannerTimer = setTimeout(() => {

            //   if (AdData.Banner_Ad) {
            //     AdData.Banner_Ad.show();
            //   }
            //   else {
            //     this.Show_Banner();
            //   }

            // }, 30000);

        });

    }

    /**
     * 显示Banner广告
     */
    public static Show_Banner() {

        console.log("显示 Banner");
        if (!this.isShowVivoAd) return;

        this.create_Banner();

        return;


        const showBanner_OK = function () {

            console.log("Banner_Ad -----> " + AdData.Banner_Ad);
            if (AdData.Banner_Ad) {

                try {
                    console.log("Banner -> 隐藏");
                    AdData.Banner_Ad.hide();
                } catch (e) {
                    console.warn(`Banner hide error:${JSON.stringify(e)}`);
                }

                try {
                    console.log("Banner ------> 显示");
                    AdData.Banner_Ad.show();
                } catch (e) {
                    console.warn(`Banner show error:${JSON.stringify(e)}`);
                }
            }
        };


        if (!AdData.Banner_Ad) {
            this.create_Banner(showBanner_OK);
        }
        else {
            showBanner_OK();
        }


    }

    /**
     * 隐藏 Banner
     */
    public static Hide_Banner() {
        if (AdData.Banner_Ad) {
            console.log("Hide_Banner ----------> 隐藏Banner");
            AdData.Banner_Ad.hide();
            // AdData.Banner_Ad.destroy();
            AdData.Banner_Ad = null;
        }
    }



    /**
     * 创建原生模板广告
     ** 如果先调用createCustomAd()后 不能立马调用hide()方法，要等Ad创建成功后，在某个需要的场景下调hide()
     ** 如果有场景需要再次展示广告，如果广告被关闭了或者调了destroy()，必须重新创建才能展示出来，此时show()无效
     ** 广告调试时，会有可能因为填充率不足而展示不出来，具体请查看教程中的错误码信息
     ** 原生模板广告创建间隔不得少于1s
     */
    public static create_YuanShengCustom_Ad(cb?, pos: YuanShengCustom_POS = YuanShengCustom_POS.CENTER) {

        console.log("创建原生模板广告 -> create_YuanShengCustom_Ad");

        if (!qg.createCustomAd) {
            console.log("原生模板广告组件 API 不存在");
            AdData.Is_YuanShengCustom_Loaded = false;
            return;
        }

        //原生模板广告创建间隔不得少于1s
        if (AdData.create_YuanShengCustom_Ad_Time) {

            console.log("原生模板创建 间隔  -> " + (AdData.Now_Time() - AdData.create_YuanShengCustom_Ad_Time));
            if ((AdData.Now_Time() - AdData.create_YuanShengCustom_Ad_Time) < 1000) {
                console.log("原生模板广告创建间隔不得少于1s!");
                return;
            }
        }

        var sysInfo = qg.getSystemInfoSync();     //获取系统信息
        console.log("on getSystemInfoSync: success =" + JSON.stringify(sysInfo));
        // "screenWidth":2340,"screenHeight":1080,"windowHeight":1080,"windowWidth":2340,

        //safeArea":{"right":2340,"bottom":1080,"left":73,"top":0,"width":2267,"height":1080}
        //获取当前手机屏幕高度(dp)
        // let bannerTop = sysInfo.safeArea.height;   //

        // let windowSize = cc.winSize;
        // console.log("windowSize -> ", windowSize.width, windowSize.height);

        AdData.Is_YuanShengCustom_Loaded = false;

        console.log("原生模板广告 pos ---> ", pos);

        var _cb = cb;

        var _top = (sysInfo.screenHeight - 720) * 0.5 - 30;
        var _left = (sysInfo.safeArea.width - 1080) * 0.5;

        if (pos == YuanShengCustom_POS.BOTTOM) {
            _top = (sysInfo.screenHeight - 720) * 0.5 + 220;
        }
        if (pos == YuanShengCustom_POS.TOP) {
            _top = 66;
        }
        if (pos == YuanShengCustom_POS.LEFT) {
            _left = 66;
        }

        //横版纯图  最小尺寸	720*525

        //1229_02

        AdData.YuanShengCustom_Ad = qg.createCustomAd({
            posId: AdData.yuanshengCustom_Id,
            style: {
                top: _top,
                left: _left,
            },
        });



        //监听原生模板广告加载结束事件
        AdData.YuanShengCustom_Ad.onLoad(() => {
            console.log("原生模板 onload --------> 成功");
            AdData.Is_YuanShengCustom_Loaded = true;


            console.log("_cb == null", (_cb == null));
            if (_cb) {
                console.log("_cb");
                _cb();
            }
            else {

                // AdManager.instance().scheduleOnce(() => {
                //   if (!AdData.isInit_YuanShengCustom_Ad) {
                //     AdData.YuanShengCustom_Ad.show();
                //     AdData.isInit_YuanShengCustom_Ad = false;
                //   }
                // }, 2);
            }

            //1229_01
            // if (AdData.YuanShengCustom_Ad) {
            //   //取消监听原生模板广告加载结束事件
            //   AdData.YuanShengCustom_Ad.offLoad();
            //   console.log("原生模板 移除广告加载事件");
            // }

        });



        //原生模板广告创建时间
        AdData.create_YuanShengCustom_Ad_Time = AdData.Now_Time();

        //监听原生模板广告错误事件
        AdData.YuanShengCustom_Ad.onError((errMsg, errCode) => {
            console.log("原生模板 onError ---------> errMsg: " + JSON.stringify(errMsg) + "  errCode:" + errCode);
            AdData.YuanShengCustom_Ad.offError();
        });

        //监听原生模板广告关闭事件
        AdData.YuanShengCustom_Ad.onClose(() => {
            console.log("原生模板 onClose");
            AdData.YuanShengCustom_Ad = null;

            this.Show_Banner();
        });

    }


    /**
   * 显示原生模板广告
   * @param isCheckTime  显示是否有时间限制  true:有  false:没有   默认false
   */
    public static Show_YuanShengCustom_Ad(isCheckTime = false, pos: YuanShengCustom_POS = YuanShengCustom_POS.CENTER) {

        console.log("显示 原生模板广告");

        AdManager.Show_Banner();

        if (!AdData.CheckADTime()) {
            console.log("显示原生模板广告的时间未到");
            return;
        }


        if (!this.isShowVivoAd) return;

        // var sysInfo = qg.getSystemInfoSync();     //获取系统信息

        AdManager.Hide_YuanShengCustom_Ad();

        const showYuanShengCustom_OK = function () {

            console.log("YuanShengCustom_Ad -----> " + AdData.YuanShengCustom_Ad);
            if (AdData.YuanShengCustom_Ad) {

                // try {
                //   console.log("原生模板 -> 隐藏");
                //   AdData.YuanShengCustom_Ad.hide();
                // } catch (e) {
                //   console.warn(`原生模板 hide error:${JSON.stringify(e)}`);
                // }

                //隐藏banner
                // AdManager.Hide_Banner();

                try {
                    console.log("原生模板 ------> 显示");

                    // clearTimeout(AdManager.numTimer);
                    // AdManager.numTimer = setTimeout(() => {

                    //   if (AdData.YuanShengCustom_Ad) {
                    AdData.YuanShengCustom_Ad.show();
                    // }

                    // }, 1000);

                } catch (e) {
                    console.warn(`YuanShengCustom show error:${JSON.stringify(e)}`);
                }
            }
        };



        // clearTimeout(AdManager.numTimer);
        // AdManager.numTimer = setTimeout(() => {
        this.create_YuanShengCustom_Ad(showYuanShengCustom_OK, pos);
        // }, 1000);


        return;


        if (!AdData.YuanShengCustom_Ad) {
            this.create_YuanShengCustom_Ad(showYuanShengCustom_OK);
        }
        else {

            //查询原生模板广告展示状态。 原生模板广告显示状态，true表示展示，false表示隐藏或关闭。
            // if (AdData.YuanShengCustom_Ad.isShow() == false) {
            showYuanShengCustom_OK();
            // }

        }


    }


    /**
     * 隐藏 原生模板广告
     */
    public static Hide_YuanShengCustom_Ad() {

        console.log("隐藏原生模板广告");
        if (AdData.YuanShengCustom_Ad) {
            console.log("Hide_YuanShengCustom_Ad ----------> 隐藏原生模板广告");
            AdData.YuanShengCustom_Ad.hide();
            AdData.YuanShengCustom_Ad = null;
        }
    }


    public static Show_Video(cb?, cbFail?) {
        AdManager.Show_RewardedVideo((result) => {
            if (result === 'success') {
                console.log("播放激励视频完成");
                cb && cb();
            } else if (result === 'fail') {
                console.log('播放视频失败，请稍后再试');
                qg.showToast({
                    //提示内容
                    message: `暂无广告资源~`,
                    duration: 2
                });
                cbFail && cbFail();
            } else if (result === 'cancel') {
                console.log('中途取消视频，无法获得奖励');
                // cbFail && cbFail();
            }
        });
    }

    /**
     * 创建激励视频广告
     ** 注意： 第一次创建视频广告对象时，已自动加载一次广告，请勿重新加载<br/>
     ** 注意：请在激励视频load成功（触发onLoad）后再调用show<br/>
     ** 建议：激励视频加载失败后给用户直接发放奖励，或者展示一次其他类型广告并发放奖励
     */
    public static create_RewardedVideo() {

        console.log("创建激励视频 -> create_RewardedVideo ");
        AdData.Video_Ad = qg.createRewardedVideoAd({
            posId: AdData.video_Id,
        });

        AdData.Video_Ad.onLoad(function (res) {

            console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));

            AdData.Video_Ad.offLoad();
            AdData.Video_Ad.offError();

            // this.Video_Ad.show().then(()=>{ 
            //   console.log('激励视频广告展示完成');
            // }).catch((err)=>{
            //   console.log('激励视频广告展示失败', JSON.stringify(err));
            // }) 
        });

        AdData.Video_Ad.onError(err => {
            console.log("激励视频广告加载失败", err);

            AdData.Video_Ad.offLoad();
            AdData.Video_Ad.offError();
            AdData.Video_Ad.offClose();

        });

        AdData.Video_Ad.onClose(res => {
            if (res && res.isEnded) {
                console.log("正常播放结束，可以下发游戏奖励");
            } else {
                console.log("播放中途退出，不下发游戏奖励");
            }
        });

    }

    /**
     * 显示激励视频广告
     ** 开发者不可控制视频广告的关闭，只有用户主动点击关闭按钮才会关闭广告
     ** 每条广告只能播放一次，播放完成后即失效，需要调用 RewardedVideoAd.load()加载新广告才能继续播放 
     ** 上一条广告加载或者播放过程中，不能加载新的广告
     */
    public static Show_RewardedVideo(cb) {

        console.log("显示激励视频-----------------");
        // cb('success');
        // return;

        if (!this.isShowVivoAd) {
            cb('success');
            return;
        }

        AdData.Video_Ad.onLoad(function (res) {

            console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));

            AdData.Video_Ad.offLoad();
            AdData.Video_Ad.offError();
            AdData.Video_Ad.offClose();
        });

        AdData.Video_Ad.onError(err => {
            console.log("激励视频广告加载失败", err);
            cb('fail');
            AdData.Video_Ad.offLoad();
            AdData.Video_Ad.offError();
            AdData.Video_Ad.offClose();
        });

        const func = (res) => {
            console.log('视频广告关闭回调')
            if (res && res.isEnded) {
                console.log("正常播放结束，可以下发游戏奖励");
                cb('success');
            } else {
                console.log("播放中途退出，不下发游戏奖励");
                cb('cancel');
            }

            AdData.Video_Ad.load();    //手动拉取广告，用于刷新广告
        }

        //监听用户点击 关闭广告 的事件
        AdData.Video_Ad.onClose(func);

        //展示广告
        AdData.Video_Ad.show();

    }


    /**
     * 创建插屏广告
     */
    public static create_Interstitial_Ad() {

        if (!this.isShowVivoAd) return

        var sysInfo = qg.getSystemInfoSync();     //获取系统信息
        console.log("on getSystemInfoSync: success =" + JSON.stringify(sysInfo));

        //获取当前手机屏幕高度(dp)
        let bannerTop = sysInfo.safeArea.height;   //

        AdData.Interstitial_Ad = qg.createInterstitialAd({
            posId: AdData.interstitial_Id,
            style: {
                top: (sysInfo.screenHeight - 720) * 0.5,
                left: (sysInfo.safeArea.width - 1080) * 0.5,
            },
        });

        AdData.Interstitial_Ad.onError((err) => {
            console.log("插屏广告加载失败", err);
            AdData.Interstitial_Ad.offError();
        });


        AdData.Interstitial_Ad.onLoad(() => {
            console.log("插屏广告加载成功");
            AdData.Interstitial_Ad.offLoad();
            AdData.Interstitial_Ad.offError();
        });

        AdData.Interstitial_Ad.onClose(() => {
            console.log("插屏广告关闭");
            AdData.Interstitial_Ad.offClose();
        });

        AdData.Interstitial_Ad.show();

    }


    /**
     * 隐藏 插屏广告
     */
    public static Hide_Interstitial_Ad() {
        if (AdData.Interstitial_Ad) {
            console.log("Hide_Interstitial_Ad ----------> 隐藏插屏广告");
            // AdData.Interstitial_Ad.hide();
            AdData.Interstitial_Ad = null;
        }
    }


    /**
    * 创建桌面图标按钮
    */
    public static create_ShortcutButton(cb?) {

        qg.hasShortcutInstalled({
            success: function (status) {
                if (status) {
                    console.log("已创建");
                    qg.showToast({
                        //提示内容
                        message: `图标已创建~`,
                        duration: 2
                    });
                }
                else {

                    qg.installShortcut({
                        success: function () {
                            console.log("创建桌面图标成功！");
                            cc.sys.localStorage.setItem('is_CreateShortButton', JSON.stringify(true));

                            qg.showToast({
                                //提示内容
                                message: `创建成功~`,
                                duration: 2
                            });

                            cb && cb('1');
                        },
                        fail: function () {
                            console.log("创建桌面图标失败！");
                            qg.showToast({
                                //提示内容
                                message: `创建失败~`,
                                duration: 2
                            });
                        },
                        complete: function () {
                            console.log("create_ShortcutButton ------------> complete");
                        }
                    })
                }
            },
            fail: function () {
                qg.showToast({
                    //提示内容
                    message: `获取桌面图标是否创建失败~`,
                    duration: 2
                });
            }
        });





    }









}
