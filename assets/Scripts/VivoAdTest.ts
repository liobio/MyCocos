import { _decorator, director, Component, sys, Node, Input, input, EventKeyboard, KeyCode } from 'cc';
import AdManager from './AdManager';
import AdData from './Ad_Data';
const { ccclass, property } = _decorator;

@ccclass('VivoAdTest')
export class VivoAdTest extends Component {

    start() {
        AdManager.init_Ad();
    }

    ShowNative() {
        AdData.YuanShengCustom_Ad = qg.createCustomAd({
            posId: '3bde0e9c207341e384fbcb492a4c2971',
            style: {
                left: 0,
                top: 630
            },
        });
        AdData.YuanShengCustom_Ad.show();
        AdData.YuanShengCustom_Ad.onError(err => {
            console.log("原生模板广告加载失败#####", err);
        });
    }
    ShowReward() {
        AdData.Video_Ad.load();
        AdData.Video_Ad.show();
        AdData.Video_Ad.onClose(res => {
            if (res && res.isEnded) {
                console.log("正常播放结束，可以下发游戏奖励");
                director.loadScene("gamePlay");
                sys.localStorage.setItem('select', 'bar');
            } else {
                console.log("播放中途退出，不下发游戏奖励");
            }
        });
    }

}


