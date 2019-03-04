window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

import("./mouse.js");

const recognition = new SpeechRecognition();
recognition.interimResults = true; //default is false
recognition.lang = "en-US";
recognition.maxAlternatives = 4; //default
recognition.continuous = true;

const threshold = 0.9;
const textArea = document.querySelector(".textArea");
const status = document.querySelector(".status");
const conf = document.querySelector(".confidence");

let p = document.createElement("p");
//words.removeChild(p);
textArea.appendChild(p);

recognition.addEventListener("result", e => {
  // const transcript = Array.from(e.results)
  //   .map(result => result[0])
  //   .map(result => result.transcript)
  //   .join(" ");

  let last = e.results[e.results.length - 1];

  conf.textContent = last[0].confidence;
  let transcript = last[0].transcript;

  //if (last[0].confidence > threshold)
  {
    // Pull keywords out of transcript
    const processedScript = transcript.replace("/poop|shit|dump/gi", "💩");
    p.textContent = processedScript;
    //p.textContent = transcript;
  }

  if (last.isFinal) {
    console.log(last);
    p = document.createElement("p");
    textArea.appendChild(p);
  }

  //part 2
  let highlight = 0;
  let finalTranscript = "";
  let interimTranscript = "";
  let theHtml = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;

    // Detect keyword and update styles
    if (transcript.includes("highlight")) {
      console.log("highlight set");
      highlight = 1;
    }

    let mainStyle = highlight ? "color: black; background-color:yellow;" : "color:#ddd;";

    // built final html
    if (e.results[i].isFinal) {
      finalTranscript += transcript;
      theHtml = `<style="${mainStyle}"> ${finalTranscript}`;
    } else {
      interimTranscript += transcript;
      theHtml = `<i style="${mainStyle}"> ${interimTranscript}`;
    }
  }

  // Write it
  document.querySelector(
    ".altArea"
    // ).innerHTML = `${finalTranscript}  <i style="color:#ddd; ${mainStyle}">  ${interimTranscript} </><br />\n`;
  ).innerHTML = theHtml;

  highlight = 0;
});

recognition.addEventListener("end", recognition.start);
recognition.addEventListener("speechstart", function(e) {
  status.textContent = "Listening...";
  console.log("Speech detect start", e.timeStamp);
});
recognition.addEventListener("speechend", function(e) {
  status.textContent = "Not listening";
  console.log("Speech detect stop", e.timeStamp);
});

recognition.onerror = function(event) {
  status.textContent = "Error occurred in recognition: " + event.error;
};

recognition.start();
