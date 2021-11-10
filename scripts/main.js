
const songs = [
    'media/Dehao Zhang - Ching Chang Hon Chi.mp4',
    'media/Polish Cow.mp4',
    'media/Shrekophone.mp4',
    'media/Zorman - Soy Español.mp4'
];

const videoEl = document.querySelector('#video');

const fullscreenIcon = document.querySelector('#fullscreen');

let fullscreen = false;

let current = 0;

const playVideo = (id) => {
    current = id;
    videoEl.querySelector('source').src = songs[current];
    videoEl.load();
    videoEl.play();
}

document.querySelector('#control-previous').addEventListener('click', (ev) => {
    ev.preventDefault();
    playVideo(current === 0 ? 3 : --current);
});

document.querySelector('#control-next').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playVideo(current === 3 ? 0 : ++current);
});

document.querySelector('#control-play').addEventListener('click', (ev) => {
    ev.preventDefault();
    if(videoEl.paused){
        videoEl.play();
    }else{
        videoEl.pause();
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
    videoEl.pause();
    videoEl.currentTime = 0;
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

videoEl.addEventListener('timeupdate', (ev) =>{
    progressFill.style.width = `${videoEl.currentTime / videoEl.duration * 100}%`;
    textCurrent.textContent = `${neatTime(videoEl.currentTime)} / ${neatTime(videoEl.duration)}`;
});

const progressSlider = document.querySelector('.progress');
progressSlider.addEventListener('click', (ev) => {
    const newTime = ev.offsetX / progressSlider.offsetWidth;
    progressFill.style.width = `${newTime * 100}%`;
    videoEl.currentTime = newTime * videoEl.duration;
});

const speedBtns = document.querySelectorAll('.speed-item');

speedBtns.forEach(speedBtn => {
    speedBtn.addEventListener('click', (ev) => {
        videoEl.playbackRate = ev.target.dataset.speed;
        speedBtns.forEach((item) => item.classList.remove('active'));
        ev.target.classList.add('active');
    });
});

window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case ' ':
            if (videoEl.paused) {
                videoEl.play();
            } else {
                videoEl.pause();
            }
            break;
        case 'ArrowRight':
            videoEl.currentTime += 5;
            break;
        case 'ArrowLeft':
            videoEl.currentTime -= 5;
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
    if (videoEl.volume) {
        lastVolume = videoEl.volume;
        videoEl.volume = 0;
        volumeBtn.textContent = 'volume_mute';
        volumeFill.style.width = '0';
    } else {
        videoEl.volume = lastVolume;
        syncVolume(videoEl.volume);
        volumeFill.style.width = `${videoEl.volume * 100}%`;
    }
});

volumeSlider.addEventListener('click', (ev) => {
    let volume = ev.offsetX / volumeSlider.offsetWidth;
    volume < 0.1 ? volume = 0 : volume;
    volumeFill.style.width = `${volume * 100}%`;
    videoEl.volume = volume;
    syncVolume(volume);
    lastVolume = volume;
});

document.querySelector('#fullscreen').addEventListener('click', (ev) => {
    ev.preventDefault();
    if(!fullscreen){
        fullscreen = true;
        document.querySelector('#marco-video').requestFullscreen();
        fullscreenIcon.textContent = 'fullscreen_exit';
    }else{
        fullscreen = false;
        document.exitFullscreen();
        fullscreenIcon.textContent = 'fullscreen';
    }

});

document.querySelector('#video').addEventListener('click', (ev) => {
    ev.preventDefault();
    if(videoEl.paused){
        playStatus = true;
        videoEl.play();
    }else{
        playStatus = false;
        videoEl.pause();
    }
});

document.querySelector('#video').addEventListener('dblclick', (ev) => {
    ev.preventDefault();
    if(!fullscreen){
        fullscreen = true;
        document.querySelector('#marco-video').requestFullscreen();
        fullscreenIcon.textContent = 'fullscreen_exit';
    }else{
        fullscreen = false;
        document.exitFullscreen();
        fullscreenIcon.textContent = 'fullscreen';
    }
});


/*todo esto está muy bien explicado aquí https://www.youtube.com/watch?v=SuqEv5o0udw&ab_channel=iEatWebsites*/