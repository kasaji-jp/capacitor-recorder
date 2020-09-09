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

  var hasRecordingFileBtn = document.querySelector('.hasRecordingFileBtn');
  hasRecordingFileBtn.addEventListener('click', () => {
    Recorder.hasRecordingFile().then((data) => {
      window.alert(data.exists);
    });
  });

  var removeFileBtn = document.querySelector('.removeFileBtn');
  removeFileBtn.addEventListener('click', () => {
    Recorder.removeFile().then(() => {
      window.alert("removed");
    });
  });
};

window.addEventListener('load', onLoad, false);

