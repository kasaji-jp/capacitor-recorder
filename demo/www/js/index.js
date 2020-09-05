const Recorder = Capacitor.Plugins.Recorder;

var onLoad = () => {
  Recorder.initialize();

  var echoBtn = document.querySelector('.echoBtn');
  echoBtn.addEventListener('click', () => {
    Recorder.echo().then(() => {
      window.alert('echo');
    });
  });
  
  var isRecording = false;
  var recordBtn = document.querySelector('.recordBtn');
  recordBtn.addEventListener('click', () => {
    Recorder.record().then(() => {
      var message = isRecording ? "finished" : "started";
      isRecording = !isRecording;
      window.alert(message);
    });
  });

  var isPlaying = false;
  var playBtn = document.querySelector('.playBtn');
  playBtn.addEventListener('click', () => {
    Recorder.play().then(() => {
      var message = isPlaying ? "finished" : "started";
      window.alert(message);
    });
  });

  var exportBtn = document.querySelector('.exportBtn');
  exportBtn.addEventListener('click', () => {
    Recorder.export().then((data) => {
      window.alert("exported!");
      console.warn(data);
    });
  });
};

window.addEventListener('load', onLoad, false);

