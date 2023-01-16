import { _decorator, Component, input, Input, EventKeyboard, KeyCode, Label } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Combat')
export class Combat extends Component {


    // @property
    // isComboTime: boolean = false;
    // @property
    // intervalTime: number = 0;
    // @property
    // comboTimeLimit: number = 2;
    // @property
    // currentComboCount: number = 0;
    // @property(Label)
    // comboText: Label;
    // isYeild: boolean = false;
    // onLoad() {
    //     input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    // }

    // onDestroy() {
    //     input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    // }

    // start() {

    // }

    // lateUpdate(deltaTime: number) {
    //     if (this.isYeild) {
    //         this.intervalTime += deltaTime;
    //         console.log(this.intervalTime);

    //         this.isYeild = false;
    //     }
    // }
    // onKeyDown(event: EventKeyboard) {
    //     switch (event.keyCode) {
    //         case KeyCode.SPACE:
    //             console.log('Press a key');
    //             this.comboText.node.active = true;
    //             this.StartCombo();
    //             break;
    //     }
    // }
    // async StartCombo() {
    //     if (this.isComboTime) {
    //         this.intervalTime = 0;
    //     }
    //     else {
    //         this.currentComboCount = 0;
    //         await this.ComboTimer();
    //     }
    //     this.currentComboCount++;
    //     this.comboText.string = this.currentComboCount + "COMBO";
    // }
    // async ComboTimer() {
    //     this.isComboTime = false;
    //     this.intervalTime = 0;
    //     while (this.intervalTime <= this.comboTimeLimit) {
    //         this.isYeild = true;
    //         await null;
    //     }
    //     this.comboText.node.active = false;
    // }



}


