var onLoad = () => {
  var button1 = document.querySelector('.button1');
  button1.addEventListener('click', () => {
    Recorder.echo().then(() => {
      window.alert('echo');
    });
  });
};

const Recorder = Capacitor.Plugins.Recorder;
window.addEventListener('load', onLoad, false);

