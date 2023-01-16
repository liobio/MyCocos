import { _decorator, Component, Node, Label, Input, input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyCoroutine')
export class MyCoroutine extends Component {


    @property
    isComboTime: boolean = false;
    @property
    intervalTime: number = 0;
    @property
    comboTimeLimit: number = 2;
    @property
    currentComboCount: number = 0;
    @property(Label)
    comboText: Label;
    time: number = 0;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                console.log('Press a key');
                this.comboText.node.active = true;
                this.Main();
                break;
        }
    }

    update(deltaTime: number) {
        this.time += deltaTime;
    }
    async Sleep(time: number) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(132);
            }, time);
        })
    }
    Main() {

        console.log('start');
        this.Test();
        console.log('end');
    }

    async Test() {
        var i: number = 0;

        while (i < 10) {
            await this.Sleep(1000);
            console.log(this.time);
            i++;
        }
        console.log("Over");

    }

}


