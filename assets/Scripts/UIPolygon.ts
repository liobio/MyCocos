
import { _decorator, Component, Color, Node, Rect, UITransform, Vec2, v2, Graphics } from 'cc';
const { ccclass, property } = _decorator;
/**
 * 雷达图数据
 */
export interface RadarChartData {

    /** 数值 */
    values: number[];

    /** 线的宽度 */
    lineWidth?: number;

    /** 线的颜色 */
    lineColor?: Color;

    /** 填充的颜色 */
    fillColor?: Color;

    /** 节点的颜色 */
    joinColor?: Color;

}
@ccclass('UIPolygon')
export class UIPolygon extends Component {

    angles: number[];
    @property({ tooltip: "多边形边数" })
    axes: number = 6;
    @property({ tooltip: "轴线长度" })
    size: number = 100;
    @property(Graphics)
    graphics: Graphics;
    start() {
        this.init();
    }

    init() {
        this.angles = [];
        // 轴间夹角
        let iAngle = 360 / this.axes;
        for (let i = 0; i < this.axes; i++) {
            // 计算
            let angle = iAngle * i;
            this.angles.push(angle);
        }

        // 创建一个二维数组
        let scalesSet: Vec2[][] = [];
        for (let i = 0; i < this.axes; i++) {
            // 用来保存当前层上的刻度坐标
            let scales = [];
            // 计算刻度在轴上的位置
            const length = this.size - (this.size / this.axes * i);
            console.log(length);

            for (let j = 0; j < this.angles.length; j++) {
                // 将角度转为弧度
                const radian = (Math.PI / 180) * this.angles[j];
                // 根据三角公式计算刻度相对于中心点（0, 0）的坐标
                const pos = v2(length * Math.cos(radian), length * Math.sin(radian));
                // 推进数组
                scales.push(pos);
            }
            // 推进二维数组
            scalesSet.push(scales);


        }

        // 遍历全部最外层的刻度
        for (let i = 0; i < scalesSet[0].length; i++) {
            // 画笔移动至中心点
            this.graphics.moveTo(0, 0);
            // 创建线条
            this.graphics.lineTo(scalesSet[0][i].x, scalesSet[0][i].y);
        }

        this.graphics.moveTo(scalesSet[0][0].x, scalesSet[0][0].y);
        for (let i = 1; i < scalesSet[0].length; i++) {
            // 创建线条
            this.graphics.lineTo(scalesSet[0][i].x, scalesSet[0][i].y);
        }
        // 刻度大于 1 个时才绘制内网格线
        if (scalesSet.length > 1) {
            // 从下边 1 开始（下标 0 是外网格线）
            for (let i = 1; i < scalesSet.length; i++) {
                // 画笔移动至第一个点
                this.graphics.moveTo(scalesSet[i][0].x, scalesSet[i][0].y);
                for (let j = 1; j < scalesSet[i].length; j++) {
                    // 创建线条
                    this.graphics.lineTo(scalesSet[i][j].x, scalesSet[i][j].y);
                }
                // 闭合当前线条（内网格线）
                this.graphics.close();
            }
            // 绘制已创建的线条（内网格线）
            this.graphics.stroke();
        }
        //闭合当前线条（外网格线）
        this.graphics.close();
        this.graphics.stroke();
        this.graphics.fill();
    }

}



