
      	var liveSource;
        var bufferdata;
        var level;
        var pico=false;

        function hasGetUserMedia() {

          return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        function getLevel(){
            //var pitchElem = document.getElementById( "pitch" );

            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            var context = new AudioContext();  
            
            navigator.getUserMedia = navigator.getUserMedia
                                   || navigator.webkitGetUserMedia 
                                   || navigator.mozGetUserMedia 
                                   || navigator.msGetUserMedia;


            navigator.getUserMedia({audio: true}, function(stream) {

               liveSource = context.createMediaStreamSource(stream);
               //liveSource.connect(context.destination); // retorno

               var levelChecker = context.createScriptProcessor(4096, 1 ,2);  //createJavaScriptNode(4096, 1 ,1);
               liveSource.connect(levelChecker);
               levelChecker.connect(context.destination);
               $("#indicador").fadeOut('slow');
               levelChecker.onaudioprocess = window.audioProcess = function(e) {

                    var buffer = e.inputBuffer.getChannelData(0);
                    var maxVal = 0;
       
        
                    // Iterate through buffer to check if any of the |values| exceeds 1.
                    for (var i = 0; i < buffer.length; i++) {
                        if (maxVal < buffer[i]) {
                            maxVal = buffer[i];
                        }

                        bufferdata = buffer[i];
                        

                    } // cierra repetitiva
 

                    if(maxVal <= 0.01){
                      level = 0.0;
                       // console.log(0.0);
                    } else if(maxVal > 1){
                        level = 1.0;
                        //console.log(1);
                    } else if(maxVal > 0.2){    // punto máximo
                       level = 0.2;
                        pico=true;
                       //console.log(pico);
                      
                      // window.alert("punto máximo");
                        //console.log(0.2);
                    } else if(maxVal > 0.1){
                       level = 0.1;
                        //console.log(0.1);
                    } else if(maxVal > 0.05){
                       level = 0.05;
                        //console.log(0.05);
                    } else if(maxVal > 0.025){
                       level = 0.25;

                       // console.log(0.025);
                    } else if(maxVal > 0.01){
                       level = 0.1;

                    }
                   // pitchElem.innerText = level;
                   // console.log("procesando...");
                    };  // cierra on Audio process
                    },error);

 }  //getLevel



  if (hasGetUserMedia()) {
    // Good to go!

   getLevel();
  } else {
    alert('getUserMedia() is not supported in your browser'); //?
  }
  function error() {
      //alert('Stream generation failed.');

$(document.getElementById("errorBox")).addClass('errorActive');
$(document.getElementById("errorBox p")).fadeIn('slow');
$(document.getElementById("botonContinuar")).fadeIn('slow');
$(document.getElementById("modulo")).fadeOut('fast');
$(document.getElementById("indicador")).fadeOut('fast');
$(document.getElementById("startBar")).fadeOut('fast');
$(document.getElementById("introContainer")).fadeOut('fast');
      
   
      //window.alert("Para una mejor experiencia te recomendamos usar un micrófono");
  }
