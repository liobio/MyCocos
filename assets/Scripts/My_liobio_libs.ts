import { _decorator, Component, Node, UITransform, Graphics } from 'cc';
import liobio_libs from 'liobio_libs';
import { UIPolygon } from './UIPolygon';
const { ccclass, property } = _decorator;
const { List } = liobio_libs;

@ccclass('My_liobio_libs')
export class My_liobio_libs extends Component {
    list_1 = new List<Component>;
    start() {
        this.list_1.add(this.getComponent(UITransform));
        this.list_1.add(this.getComponent(Graphics));
        this.list_1.add(this.getComponent(UIPolygon));
        console.log(this.list_1.toArray());
    }
}


