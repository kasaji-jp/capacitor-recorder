document.addEventListener('DOMContentLoaded', onLoad, false);
const Recorder = Capacitor.Plugins.Recorder;

function onLoad() {
  var button1 = document.querySelector('.button1');
  button1.addEventListener('click', () => {
    Recorder.echo().then(() => {
      window.alert('echo');
    });
  });
}

// var onLoad = () => {
//   var button1 = document.querySelector('.button1');
//   button1.addEventListener('click', () => {
//     Recorder.echo().then(() => {
//       window.alert('echo');
//     });
//   });
// };

