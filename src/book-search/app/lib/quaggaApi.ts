import Quagga from 'quagga';

export const quaggaStart = (): boolean => {
  if ('mediaDevices' in navigator === false || 'getUserMedia' in navigator.mediaDevices === false) {
    return false;
  }
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
  function(err) {
      if (err) {
          console.log(err);
          return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onProcessed(function(result){
    var ctx = Quagga.canvas.ctx.overlay;
    var canvas = Quagga.canvas.dom.overlay;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result) {
        if (result.box) {
            console.log(JSON.stringify(result.box));
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, ctx, {color: 'blue', lineWidth: 2});
        }
    }
  });

  Quagga.onDetected(function(result){
    console.log(result.codeResult.code);
    // 取得したコードがISBNなら書籍詳細ページに遷移
  });

  return true;
}

export const quaggaStop = () => {
  Quagga.stop();
}