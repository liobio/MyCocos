import { _decorator, Component, input, Input, EventKeyboard, KeyCode, Label } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Combat')
export class Combat extends Component {


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
    @property
    deltaTime: number = 0;
    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start() {

    }
    update(deltaTime: number) {
        this.deltaTime = deltaTime;

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
    StartCombo() {
        if (this.isComboTime) {
            this.intervalTime = 0;
        }
        else {
            this.currentComboCount = 0;
            this.ComboTimer();
        }
        this.currentComboCount++;
        this.comboText.string = this.currentComboCount + "COMBO";
    }
    async ComboTimer() {

        this.intervalTime = 0;
        await this.TimeAdd();
        this.isComboTime = false;
        this.comboText.node.active = false;
    }
    TimeAdd(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            while (this.intervalTime <= this.comboTimeLimit) {
                this.intervalTime += this.deltaTime;
            }
        });
    }

}


