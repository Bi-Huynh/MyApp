import { home, getSong } from '../../../src/services/Music/controller.js';

const player = $('.player');
const btnPlay = $('.btn-toggle-play');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const nameSong = $('#nameSong');
const singerSong = $('#singerSong');

// ------------- handle function -------------
function getSongs() {}

function loadCurrentSong(song = {}) {
    nameSong.text(song.name);
    singerSong.text(song.singer);

    cdThumb.css('background-image', `url('${song.image}')`);
    audio.attr({ src: song.path });
}

// ------------- Events -------------

$(document).ready(function () {
    btnPlay.click(() => {
        player.toggleClass('playing');
        audio.play();
    });

    loadCurrentSong();
});
