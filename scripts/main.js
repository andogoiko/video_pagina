
const songs = [
    'media/Dehao Zhang - Ching Chang Hon Chi.mp4',
    'media/Polish Cow.mp4',
    'media/Shrekophone.mp4',
    'media/Zorman - Soy Español.mp4'
];

const audioEl = document.querySelector('#video');

let current = 0;

const playAudio = (id) => {
    current = id;
    audioEl.querySelector('source').src = songs[current];
    audioEl.load();
    audioEl.play();
}

document.querySelector('#control-previous').addEventListener('click', (ev) => {
    ev.preventDefault();
    playAudio(current === 0 ? 3 : --current);
});

document.querySelector('#control-next').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playAudio(current === 3 ? 0 : ++current);
});

document.querySelector('#control-play').addEventListener('click', (ev) => {
    ev.preventDefault();
    if(audioEl.paused){
        audioEl.play();
    }else{
        audioEl.pause();
    }
});

document.querySelector('#video').addEventListener('play', (ev) =>{
    console.log('playing', ev.target);
    document.querySelector('#control-play').textContent = 'pause';
});

document.querySelector('#video').addEventListener('pause', (ev) =>{
    console.log('pausing', ev.target);
    document.querySelector('#control-play').textContent = 'play_arrow';
});

document.querySelector('#control-stop').addEventListener('click', (ev) => {
    ev.preventDefault();
    audioEl.pause();
    audioEl.currentTime = 0;
});

const neatTime = (time) => {
    // Const hours = Math.floor((time % 86400) / 3600)
    const  minutes = Math.floor((time % 3600) / 60)
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${seconds}`;
};

const progressFill = document.querySelector('.progress-filled');
const textCurrent = document.querySelector('.time-current');

audioEl.addEventListener('timeupdate', (ev) =>{
    progressFill.style.width = `${audioEl.currentTime / audioEl.duration * 100}%`;
    textCurrent.textContent = `${neatTime(audioEl.currentTime)} / ${neatTime(audioEl.duration)}`;
});

const progressSlider = document.querySelector('.progress');
progressSlider.addEventListener('click', (ev) => {
    const newTime = ev.offsetX / progressSlider.offsetWidth;
    progressFill.style.width = `${newTime * 100}%`;
    audioEl.currentTime = newTime * audioEl.duration;
});

const speedBtns = document.querySelectorAll('.speed-item');

speedBtns.forEach(speedBtn => {
    speedBtn.addEventListener('click', (ev) => {
        audioEl.playbackRate = ev.target.dataset.speed;
        speedBtns.forEach((item) => item.classList.remove('active'));
        ev.target.classList.add('active');
    });
});

window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case ' ':
            if (audioEl.paused) {
                audioEl.play();
            } else {
                audioEl.pause();
            }
            break;
        case 'ArrowRight':
            audioEl.currentTime += 5;
            break;
        case 'ArrowLeft':
            audioEl.currentTime -= 5;
            break;
    }
});

const volumeBtn = document.querySelector('#control-volume');
const volumeSlider = document.querySelector('.volume-slider');
const volumeFill = document.querySelector('.volume-filled');
let lastVolume = 1;

const syncVolume = (volume) => {
    if (volume > 0.5) {
        volumeBtn.textContent = 'volume_up';
    } else if (volume < 0.5 && volume > 0) {
        volumeBtn.textContent = 'volume_down';
    } else if (volume === 0) {
        volumeBtn.textContent = 'volume_mute';
    }
};

volumeBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (audioEl.volume) {
        lastVolume = audioEl.volume;
        audioEl.volume = 0;
        volumeBtn.textContent = 'volume_mute';
        volumeFill.style.width = '0';
    } else {
        audioEl.volume = lastVolume;
        syncVolume(audioEl.volume);
        volumeFill.style.width = `${audioEl.volume * 100}%`;
    }
});

volumeSlider.addEventListener('click', (ev) => {
    let volume = ev.offsetX / volumeSlider.offsetWidth;
    volume < 0.1 ? volume = 0 : volume;
    volumeFill.style.width = `${volume * 100}%`;
    audioEl.volume = volume;
    syncVolume(volume);
    lastVolume = volume;
});

//request full screen
//exitfullscreen

/*todo esto está muy bien explicado aquí https://www.youtube.com/watch?v=SuqEv5o0udw&ab_channel=iEatWebsites*/