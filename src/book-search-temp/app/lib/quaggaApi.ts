import Quagga from 'quagga';

export const quaggaStart = (targetId: string, resultId: string) => { 
  Quagga.init({
    inputStream: {
        name: "LiveStream",
        type: "LiveStream",
    },
    decoder: {
        readers: [ "ean_reader" ]
    } 
  }, 
  function(err) {
      if (err) {
          alert(err);
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
  });
}