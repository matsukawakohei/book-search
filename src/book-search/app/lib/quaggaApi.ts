//@ts-ignore
import Quagga from 'quagga';

let isbn: string = '';
let checkCount: number = 0;

export const quaggaStart = (execSearch: (isbn: string) => void ): boolean => {
  if ('mediaDevices' in navigator === false || 'getUserMedia' in navigator.mediaDevices === false) {
    return false;
  }
  isbn = '';
  checkCount = 0;
  Quagga.init({
    inputStream: {
        name: "LiveStream",
        type: "LiveStream",
    },
    // MediaStreamConstraintsを参照
    audio: false,
    video: {
      facingMode: "environment",
    },
    decoder: {
        readers: [ "ean_reader" ]
    } 
  }, 
  function(err: Error) {
      if (err) {
          console.log(err);
          return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onProcessed(function(result: any){
    var ctx = Quagga.canvas.ctx.overlay;
    var canvas = Quagga.canvas.dom.overlay;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result) {
        if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, ctx, {color: 'blue', lineWidth: 2});
        }
    }
  });

  Quagga.onDetected(function(result: any){
    const tmpIsbn = String(result.codeResult.code);
    if (!tmpIsbn.startsWith('978') && !tmpIsbn.startsWith('979')) {
      return;
    }
    if (tmpIsbn.length !== 10 && tmpIsbn.length !== 13) {
      return;
    }
    if (!isbn.length) {
      isbn = tmpIsbn;
      checkCount = 1;
      return;
    }
    if (isbn !== String(tmpIsbn)) {
      isbn = tmpIsbn;
      checkCount = 1;
    }

    checkCount++;
    if (checkCount >= 3) {
      execSearch(isbn);
    }
    // 取得したコードがISBNなら書籍詳細ページに遷移
  });

  return true;
}

export const quaggaStop = () => {
  Quagga.stop();
}