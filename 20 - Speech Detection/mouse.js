var boxElem = document.querySelector(".textArea");

boxElem.addEventListener("mousedown", logEvent);
boxElem.addEventListener("mouseup", logEvent);
boxElem.addEventListener("click", logEvent);
boxElem.addEventListener("mouseenter", logEvent);
boxElem.addEventListener("mouseleave", logEvent);

function logMou(msg) {
  var logElem = document.querySelector(".logMouse");

  var time = new Date();
  var timeStr = time.toLocaleTimeString();
  logElem.innerHTML += timeStr + ": " + msg + "<br/>";
}

logMou("Logging mouse events inside this container...");
function logEvent(event) {
  var msg = "Event <strong>" + event.type + "</strong> at <em>" + event.clientX + ", " + event.clientY + "</em>";
  logMou(msg);
}
