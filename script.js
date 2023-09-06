//voice selection
const voiceSelect = document.querySelector("#voice-select");
document.querySelector("#pause-button").addEventListener("click", pauseSpeech);
document.querySelector("#play-button").addEventListener("click", playSpeech);

const synth = window.speechSynthesis;
let voices;

function addVoicesToSelect() {
  voices = synth.getVoices();

  //my own version - loop through the voices
  voices.forEach((voice) => {
    //loop thru voices and create a virtual element, attaching attributes of the voice to the option
    const option = document.createElement("option");
    option.textContent = `${voice.name}`;

    //Checking if voice-default is true and concatinating to the virtual element
    if (voice.default) {
      option.textContent += " - DEFAULT";
    }

    //attaching attribute
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    //appending to the DOM
    voiceSelect.appendChild(option);
  });
}


//FUNCTION to pause speech
function pauseSpeech(e) {
  e.preventDefault();
  synth.pause();
  document.querySelector("#pause-button").disabled = true;
  document.querySelector("#play-button").disabled = false;
}

//FUNCTION to resume speech
function playSpeech(e) {
  e.preventDefault();
  synth.resume();
  document.querySelector("#pause-button").disabled = false;
  document.querySelector("#play-button").disabled = true;
}

function onSubmit(e) {
  e.preventDefault();

  //get the text input
  const textInput = document.querySelector("#text-input");

  //insert the words to speech utterance method
  const utterThis = new SpeechSynthesisUtterance(textInput.value);

  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  //my own version - loop through voices and check if the voice is equal to the selected option and then assign to utterThis
  voices.forEach((voice) => {
    if (voice.name === selectedOption) {
      utterThis.voice = voice;
    }
  });

  //event listners for speech end and error

  utterThis.onend = () => {
    document.querySelector("#pause-button").disabled = true;
    document.querySelector("#play-button").disabled = true;
  };

  utterThis.onerror = () => {
    alert("An error occured while speaking");
  };

  // speak it out
  synth.speak(utterThis);
  document.querySelector("#pause-button").disabled = false;
}

addVoicesToSelect();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoicesToSelect;
}

document.querySelector("#form").addEventListener("submit", onSubmit);
