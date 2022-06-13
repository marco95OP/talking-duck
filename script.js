let voices = [];
speechSynthesis.addEventListener('voiceschanged', function(){
    voices = speechSynthesis.getVoices();
    console.log(voices);
});

// picking from page html all the elements I need
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');

// click the button to hear the voice of duck
playButton.addEventListener('click', function(){
    const textLength = textArea.value.trim().length;

    if(textLength > 0){
        // let the duck talk!
        talk();
    }
});

// Prepare a function to let the duck talking
function talk(){
    // Step 1 - pick the voice tone and text, don't need to repeat .trim method
    const text = textArea.value;
    const pitch = pitchBar.value;

    // Step 2 - prepare a phrase 
    const utterance = new SpeechSynthesisUtterance(text);

    // Step 3 - Specify details of the phrase (utterance)
    // utterance.volume = 1;
    // utterance.rate = 1;
    utterance.pitch = pitch;

    const femaleVoice = voices.find(function(voice){
        if(voice.name.includes('Elsa')){
            return true;
        }
    });

    utterance.voice = femaleVoice;

    // Step 4 - We want to make the duck talk
    speechSynthesis.speak(utterance);

    // When the duck start to talking
    utterance.addEventListener('start', function(){
        // block all controls
        textArea.disabled = true;
        pitchBar.disabled = true;
        playButton.disabled = true;

        // Let's animating the duck
            duckFigure.classList.add('talking');
        });

    // When the duck finish to speak...
    utterance.addEventListener('end', function(){
        // release the control
        textArea.disabled = false;
        pitchBar.disabled = false;
        playButton.disabled = false;
        // Replace with static duck
            duckFigure.classList.remove('talking');
        });
}