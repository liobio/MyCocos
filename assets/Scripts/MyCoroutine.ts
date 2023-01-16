import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyCoroutine')
export class MyCoroutine extends Component {
    start() {
        this.Main();
    }

    time: number = 0;
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


