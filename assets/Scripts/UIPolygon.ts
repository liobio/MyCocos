
import { _decorator, Component, Texture2D, Node, Rect, UITransform } from 'cc';
import List from '../src/Utils/List';

const { ccclass, property } = _decorator;

@ccclass('UIPolygon')
export class UIPolygon extends Component {


    @property(Texture2D)
    mTexure: Texture2D;
    @property
    fill: boolean = true;
    @property({ range: [3, 360, 1] })
    sides: number = 3;
    @property({ range: [0, 360, 1] })
    rotation: number = 0;
    @property({ range: [0, 1, 0.01] })
    verticesDistance: number[] = [3];
    size: number = 0;
    mUITransform: UITransform;

    start() {
        this.mUITransform = this.getComponent(UITransform);
    }
    update() {
        this.size = this.mUITransform.width;
        if (this.mUITransform.width > this.mUITransform.height) {
            this.size = this.mUITransform.height;
        }
        else {
            this.size = this.mUITransform.width;
        }
    }

    DrawPolygon(datas: List<number>) {

    }


}


