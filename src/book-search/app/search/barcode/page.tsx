"use client";

import { quaggaStart, quaggaStop } from "@/app/lib/quaggaApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Barcode() {
  const router = useRouter();

  useEffect(() => {
    const canMedia = quaggaStart();
    // TODO: カメラ取得失敗時はエラーメッセージを出す
  }, []);

  const onClickBack = () => {
    const ele = document.getElementById("interactive");
    if (!ele) {
      return;
    }
    const videoEleArray = ele.getElementsByTagName('video');
    if (!videoEleArray.length) {
      return;
    }
    videoEleArray[0].srcObject = null;
    quaggaStop();
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