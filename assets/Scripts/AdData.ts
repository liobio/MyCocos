// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { _decorator, Component, sys,Node,find ,director,input,Input,EventTouch,Button,log, Label} from 'cc';

const { ccclass, property } = _decorator;

@ccclass
export default class Ad_Data extends Component {

  public static banner_Id = 'a8725b05782a47cea4da2cc1874ffcc4';       //banner Id
  public static yuanshengCustom_Id = '3bde0e9c207341e384fbcb492a4c2971';    //原生横版纯图
  public static video_Id = 'adcfdecc1e6645999957d0e00222bdb6';       //激励视频Id

  public static interstitial_Id = 'dcc92c5929964faca3e48f3fd7dfb8fe';  //插屏id

  public static yuansheng_Id = "";             //原生自渲染广告id

  public static Banner_Ad = null;               //Banner广告
  public static Banner_Is_Loaded = false;       //Banner是否加载完成
  public static YuanSheng_Ad = null;            //原生广告
  public static YuanSheng_Node = null;          //原生广告Node
  public static Video_Ad = null;               //激励视频广告
  public static Interstitial_Ad = null;        //插屏广告

  public static isYuanSheng = false;
  //public static YuanShengCustom_Ad = null;           //原生模板广告
  public static YuanShengCustom_Ad = null;     
  public static Is_YuanShengCustom_Loaded = false;   //原生模板广告是否加载完成

  public static create_Banner_Time;                  //Banner广告创建时间
  public static create_YuanShengCustom_Ad_Time;      //原生模板广告创建时间

  public static isInit_YuanShengCustom_Ad = true;   //是否初始化原生广告
  
   public static storage_key = "vivo_";

  public static isShowYuanShengAd_Time = false;
  public static YuanShengAD_ShowTime = "2022-06-16 19:00:00";   //原生显示的目标时间

  public static Now_Time() {
    return new Date().getTime();
  }

  /**
 * 获取时间
 * @param time 
 * @returns
 */
  public static get_time(t: Date = null) {

    let now = t == null ? new Date() : t;

    let year = now.getFullYear();
    let month = now.getMonth() + 1;    // 月份 0-11
    let date = now.getDate();      // 1-31
    let hour = now.getHours();     // 小时
    let minute = now.getMinutes(); // 分钟
    let second = now.getSeconds(); // 秒数
    let timestamp = now.getTime();

    console.log("时间： %s 年  %s月   %s日   %s时   %s分   %s秒", year, month, date, hour, minute, second);

    // return [year, month, date, timestamp];

    return {
      Year: year,
      Month: month,
      Day: date,
      Hour: hour,
      Minute: minute,
      Second: second,
      Timestap: timestamp,
    }

  }


  /**
   * 字符串格式时间转为时间
   * @param strDate   //2022/04/14-16:00:00
   * @returns 
   */
  public static timeStringToDate(strDate = "") {

    let tar_date: string[] = strDate.split('-');
    // console.log("tar_date", tar_date);

    let y_m_d = tar_date[0].split('/');
    let h_m_s = tar_date[1].split(':');

    let year = parseInt(y_m_d[0]);
    let month = parseInt(y_m_d[1]);    // 月份 0-11
    let day = parseInt(y_m_d[2]);     // 1-31
    let hour = parseInt(h_m_s[0]);     // 小时
    let minute = parseInt(h_m_s[1]);   // 分钟
    let second = parseInt(h_m_s[2]);   // 秒数 

    return {
      Year: year,
      Month: month,
      Day: day,
      Hour: hour,
      Minute: minute,
      Second: second,
    }

  }


  public static CheckADTime() {

    // let tarDate = Ad_Data.timeStringToDate(Ad_Data.YuanShengAD_ShowTime);
    // let nowDate = Ad_Data.get_time();

    let tarDate = new Date(Date.parse(Ad_Data.YuanShengAD_ShowTime));

    // Ad_Data.get_time(tarDate);

    console.log("Ad_Data.Now_Time -> ", Ad_Data.Now_Time());
    console.log("tarDate.getTime() -> ", tarDate.getTime());

    if (Ad_Data.Now_Time() >= tarDate.getTime()) {
      return true;
    }
    else {
      return false;
    }

  }

}
