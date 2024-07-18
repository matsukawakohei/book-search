"use client";

import { quaggaStart, quaggaStop } from "@/app/lib/quaggaApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Barcode() {
  const router = useRouter();

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

  const lock = useRef(false);
  useEffect(() => {
    if (lock.current) {
      return;
    }
    
    const canMedia = quaggaStart();
    lock.current = true;
    // TODO: カメラ取得失敗時はエラーメッセージを出す

    return () => {
      stopMedia();
    };
  }, []);

  const onClickBack = () => {
    stopMedia();
    router.push('/search');
  }
  
  // TODO: 余分な要素を非表示にする
  return (
    <div>
      <div id="interactive" className="viewport"></div>
      <div>
        <button type="button" onClick={onClickBack}>戻る</button>
      </div>
    </div>
  )
}