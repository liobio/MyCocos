import { _decorator, Component, Node, Input, input, EventKeyboard, KeyCode } from 'cc';
import { List } from 'Collection';
const { ccclass, property } = _decorator;

@ccclass('MyCoroutine1')
export class MyCoroutine1 extends Component {
    list1: List<number>;
    init() {

        for (let i = 0; i < 100; i++) {
            this.list1.add(1);
        }
        console.log(this.list1.count);
    }

}


