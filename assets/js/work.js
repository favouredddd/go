importScripts('/assets/js/highlight.js');
onmessage = (event) => {
  const result = self.hljs.highlightAuto(event.data);
  postMessage(result.value);
  self.close();
};