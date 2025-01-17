"use client";

import styles from "./page.module.css";
import { quaggaStart, quaggaStop } from "@/app/lib/quaggaApi";
import { sleep } from "@/app/lib/util";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Barcode() {
  const router = useRouter();

  /** ライブラリが予備で確保する表示領域を非表示にする */
  const displayNoneCanvas = () => {
    const ele = document.getElementById("interactive");
    const canvasEleArray = ele?.getElementsByTagName('canvas') || [];
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

  /** バーコード読み取り完了時のページ遷移 */
  const execSearch = useCallback((isbn: string) => {
    quaggaStop();
    router.push(`/books/${isbn}`);
  }, [router]);

  /** 初回レンダリングで呼ばれる */
  const lock = useRef(false);
  useEffect(() => {
    if (lock.current) {
      return;
    }
    
    const canMedia = quaggaStart(execSearch);
    if (canMedia) {
      /** ライブラリが予備で確保する表示領域を非表示にする */
      (async () => {
        /** 1秒あればメディアの表示が完了すると思いたい */
        await sleep();
        displayNoneCanvas();
      })();
    }
    lock.current = true;
    // TODO: カメラ取得失敗時はエラーメッセージを出す

    return () => {
      stopMedia();
    };
  }, [execSearch]);

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