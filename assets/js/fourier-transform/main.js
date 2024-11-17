let isRecording = false;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

document.getElementById('start-button').addEventListener('click', function () {
	const startButton = document.getElementById('start-button');
	const icon = startButton.querySelector('i');

	if (!isRecording) {
		// Start recording
		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(function (stream) {
				const source = audioContext.createMediaStreamSource(stream);
				const analyser = audioContext.createAnalyser();

				analyser.fftSize = 2048;
				const bufferLength = analyser.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);

				source.connect(analyser);

				function detectFrequencies() {
					analyser.getByteFrequencyData(dataArray);
					// Process dataArray to detect frequencies
					// Update the detected frequencies in the DOM
					// ...additional detection code...

					if (isRecording) {
						requestAnimationFrame(detectFrequencies);
					}
				}

				detectFrequencies();
			})
			.catch(function (err) {
				console.log('The following error occurred: ' + err);
			});

		isRecording = true;
		icon.className = 'fas fa-stop';
		startButton.innerHTML = `<i class="fas fa-stop"></i> Stop Recording`;
	} else {
		// Stop recording
		isRecording = false;
		icon.className = 'fas fa-microphone';
		startButton.innerHTML = `<i class="fas fa-microphone"></i> Start Recording`;
	}
});
