import { _decorator, Component, input, Input, EventKeyboard, KeyCode, Label } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Combat')
export class Combat extends Component {

    isComboTime: boolean = false;
    @property
    comboTimeLimit: number = 2;
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
                this.StartCombo();
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
    StartCombo() {
        if (this.isComboTime) {
            this.time = 0;
        }
        else {
            this.currentComboCount = 0;
            this.ComboTimer();
        }
        this.currentComboCount++;
        this.comboText.string = this.currentComboCount + "COMBO";
    }

    async ComboTimer() {

        console.log("Test Start");
        this.isComboTime = true;
        this.time = 0;

        while (this.time < this.comboTimeLimit) {
            //要加Promise
            await this.Sleep(5);
        }

        this.isComboTime = false;
        this.comboText.node.active = false;

    }



}


