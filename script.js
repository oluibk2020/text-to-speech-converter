//voice selection
const voiceSelect = document.querySelector("#voice-select");

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
  
  // speak it out
  synth.speak(utterThis);
}

addVoicesToSelect();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoicesToSelect;
}

document.querySelector("#form").addEventListener("submit", onSubmit);
