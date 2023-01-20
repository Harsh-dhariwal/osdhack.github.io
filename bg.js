var planeElement = document.getElementById("plane");
var instructionsElement = document.getElementById("instructions");
var isSpacePushed = false;
var defaultSpeed = 0.75;
var accelerationCoefficient = 0.00075;
var currentSpeed = defaultSpeed;

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Engine sound
var oscillator = audioContext.createOscillator();
oscillator.type = 'sawtooth';
var oscillatorDefaultValue = 35;
var oscillatorIncrementalValue = 1;
oscillator.frequency.value = 35; // value in hertz
oscillator.start();
oscillatorGain = audioContext.createGain();
oscillatorGain.gain.value = 0.0375;
oscillator.connect(oscillatorGain);
oscillatorGain.connect(audioContext.destination);

requestAnimationFrame(updateVisuals);

function updateVisuals() {
  //console.log("updateVisuals()");

  requestAnimationFrame(updateVisuals);
  
  //console.log(currentSpeed);
  
  if(isSpacePushed) {
    instructionsElement.style.display = "none";
    document.body.className = "shake";
    if(currentSpeed - accelerationCoefficient > 0) {
      currentSpeed -= accelerationCoefficient;
      oscillator.frequency.value += oscillatorIncrementalValue;
    }
  } else {
    document.body.className = "";
    instructionsElement.style.display = "block";
    currentSpeed = defaultSpeed;
    oscillator.frequency.value = oscillatorDefaultValue;
  }

  // Update animation
  planeElement.style.webkitAnimationDuration = currentSpeed + "s";
  planeElement.style.animationDuration = currentSpeed + "s";
}

document.body.addEventListener("keydown", function(event) {
  var key = event.keyCode || event.which;
  //console.log("keyup: " + key);
  if(key == 32) {
    isSpacePushed = true;
  }
});

document.body.addEventListener("keyup", function(event) {
  var key = event.keyCode || event.which;
  //console.log("keydown: " + key);
  if(key == 32) {
    isSpacePushed = false;
  }
});