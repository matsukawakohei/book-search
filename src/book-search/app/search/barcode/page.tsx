"use client";

import styles from "./page.module.css";
import { quaggaStart, quaggaStop } from "@/app/lib/quaggaApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Barcode() {
  const router = useRouter();

  // TODO: この処理はlibへ移した方がよさそう
  const sleep = (milliSecond: number) => new Promise(resolve => setTimeout(resolve, milliSecond));

  /** 1秒あればメディアの表示が完了すると思いたい */
  const sleepMilliSecond = 1000;

  /** ライブラリが予備で確保する表示領域を非表示にする */
  const displayNoneCanvas = () => {
    const ele = document.getElementById("interactive");
    const canvasEleArray = ele?.getElementsByTagName('canvas') || [];
    console.log(canvasEleArray);
    if (!canvasEleArray.length || !canvasEleArray[0]) {
      return;
    }

    canvasEleArray[0].classList.add(styles.displayNone);
  }

  /** カメラを切る */
  const stopMedia = () => {
    const ele = document.getElementById("interactive");
    const videoEleArray = ele?.getElementsByTagName('video') || [];

    /** まだカメラの起動が終わってない場合は、カメラを切らない */
    if (!videoEleArray.length || !videoEleArray[0].srcObject) {
      return;
    }
    
    videoEleArray[0].srcObject = null;
    quaggaStop();
  }

  /** 初回レンダリングで呼ばれる */
  const lock = useRef(false);
  useEffect(() => {
    if (lock.current) {
      return;
    }
    
    const canMedia = quaggaStart();
    if (canMedia) {
      /** ライブラリが予備で確保する表示領域を非表示にする */
      (async () => {
        await sleep(sleepMilliSecond);
        displayNoneCanvas();
      })();
    }
    lock.current = true;
    // TODO: カメラ取得失敗時はエラーメッセージを出す

    return () => {
      stopMedia();
    };
  }, []);

  /** 戻るボタン */
  const onClickBack = () => {
    stopMedia();
    router.push('/search');
  }
  
  return (
    <div>
      <div id="interactive" className="viewport"></div>
      <div>
        <button type="button" onClick={onClickBack}>戻る</button>
      </div>
    </div>
  )
}