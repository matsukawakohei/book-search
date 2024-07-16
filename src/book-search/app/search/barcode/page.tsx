"use client";

import { quaggaStart, quaggaStop } from "@/app/lib/quaggaApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Barcode() {
  const router = useRouter();

  useEffect(() => quaggaStart(), []);

  const onClickBack = () => {
    quaggaStop();
    // router.push('/search');
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