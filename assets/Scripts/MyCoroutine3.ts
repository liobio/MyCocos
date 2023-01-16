import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyCoroutine3')
export class MyCoroutine3 extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    //     using System.Collections;
    // using UnityEngine;
    // using UnityEngine.UI;

    //     public class ComboController: MonoBehaviour
    // {
    //     public Text comboText;
    //     public bool isComboTime;
    //     public float intervalTime;
    //     public float comboTimeLimit;
    //     public int currentComboCount;

    //     void Start()
    //     {

    //     }

    //     // Update is called once per frame
    //     void Update()
    //     {
    //         if (Input.GetKeyDown(KeyCode.Space)) {

    //             StartCombo();
    //             comboText.gameObject.SetActive(true);
    //         }
    //     }
    //     public void StartCombo()
    //     {
    //         if (isComboTime) {
    //             intervalTime = 0f;
    //         }
    //         else {
    //             currentComboCount = 0;
    //             StartCoroutine(ComboTimer());
    //         }
    //         currentComboCount++;
    //         comboText.text = currentComboCount.ToString() + " COMBO";
    //     }
    //     IEnumerator ComboTimer()
    //     {
    //         isComboTime = true;
    //         intervalTime = 0;
    //         while (intervalTime <= comboTimeLimit) {
    //             intervalTime += Time.deltaTime;
    //             yield return null;
    //         }
    //         isComboTime = false;
    //         comboText.gameObject.SetActive(false);
    //     }

    // }
}


