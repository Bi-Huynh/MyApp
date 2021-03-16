// import { home, getSong } from '../../../src/services/Music/controller.js';

const player = $('.player');
const btnPlay = $('.btn-toggle-play');
const cdThumb = $('.cd-thumb');
const audio = document.querySelector('#audio');

const nameSong = $('#nameSong');
const singerSong = $('#singerSong');

// ------------- handle function -------------
// const getSongs = (function () {
//     let songs;
//     async function init() {
//         const result = fetch('http://localhost:3000/music/')
//             .then((response) => response.json())
//             .catch((err) => console.log(new Error(err)));
//         return await result;
//     }

//     return songs ? songs : (songs = init());
// })();

function loadCurrentSong(
    song = {
        name: 'Power Rangers LightSpeed Rescue',
        singer: 'Jetix Experience',
        path: '../musics/PowerRangersLightSpeedRescue.mp3',
        image: '../img/powerRangerLightSpeedRescue.jpg',
    }
) {
    nameSong.text(song.name);
    singerSong.text(song.singer);

    cdThumb.css('background-image', `url('${song.image}')`);
    audio.src = song.path;
}

// ------------- Events -------------

$(document).ready(function () {
    audio.addEventListener('play', function (event) {
        player.toggleClass('playing');
        this.play();
    });

    audio.addEventListener('pause', function (event) {
        player.toggleClass('playing');
        this.pause();
    });

    btnPlay.click(() => {
        player.hasClass('playing') ? audio.pause() : audio.play();
    });

    loadCurrentSong();
});
