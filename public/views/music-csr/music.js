// file viết sử lý giao diện cho music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $('.playlist');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const btnPlay = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');

let urlMusic = 'http://localhost:3000/music/';
let currentIndex = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;

// ------------------ handler ------------------
const fetchApi = async function (url = '', option = { method: 'GET' }) {
    try {
        let response = await fetch(url, option);
        result = await response.json();
    } catch (error) {
        console.log(new Error(error));
    } finally {
        return result;
    }
};

const getSongsApi = async function () {
    let songs = [];
    try {
        songs = await fetchApi(urlMusic);
    } catch (error) {
        console.log(new Error(error));
    } finally {
        return songs;
    }
};

// sử dụng singleton để khỏi phải call lại api không nên.
// chỉ cần load lại trang nó sẽ tự update lại danh sách khi thêm dữ liệu vào db
const getSongs = (function () {
    let songs;
    async function init() {
        return await getSongsApi();
    }
    return songs ? songs : (songs = init());
})();

// vì lưu được danh sách songs nên không cần call api để lấy song
const getSong = async function (index = 0) {
    let song = {};
    try {
        let songs = await getSongs;
        song = songs[index];
    } catch (error) {
        console.log(new Error(error));
    } finally {
        return song;
    }
};

// ------------------ method ------------------

const handleEvents = () => {
    let cdWidth = cd.offsetWidth;

    // Xử lý phóng to thu nhỏ cd
    document.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth;
    });

    // xử lý khi click button play
    btnPlay.addEventListener('click', () => {
        isPlaying ? audio.pause() : audio.play();
        isPlaying = !isPlaying;
        // scrollToActiveSong();
    });

    // khi bài hát được play
    audio.addEventListener('play', () => {
        player.classList.add('playing');
        animationCdRotate.play();
    });

    // khi bài hát được pause
    audio.addEventListener('pause', () => {
        player.classList.remove('playing');
        animationCdRotate.pause();
    });

    // khi tiến độ bài hát thay đổi
    audio.addEventListener('timeupdate', function () {
        if (this.duration) {
            let progressPercent = Math.floor(
                (this.currentTime / this.duration) * 100
            );
            progress.value = progressPercent;
        }
    });

    // Xử lý khi tua song
    progress.addEventListener('input', seekTimeSong);
    // Để được nhận dữ liệu cập nhật liên tục thì nên sử dụng oninput
    // vì oninput không được hỗ trợ trong IE10 nên phải thêm onchange

    progress.addEventListener('change', seekTimeSong);

    // Xử lý sự kiện next
    btnNext.addEventListener('click', () => {
        if (isRandom) {
            playRandomSong();
        } else {
            nextSong();
        }
        audio.play(); // không biết sao khi dùng cái này thì đôi lúc chuột ấn sẽ không nhận
        scrollToActiveSong();
    });

    // Xử lý sự kiện prev
    btnPrev.addEventListener('click', () => {
        if (isRandom) {
            playRandomSong();
        } else {
            prevSong();
        }
        audio.play();
        scrollToActiveSong();
    });

    // Xử lý tự động chuyển bài khi kết thúc bài nhạc
    audio.addEventListener('ended', () => {
        if (!isRepeat) {
            if (currentIndex < songs.length) {
                btnNext.click();
            }
        } else {
            audio.play();
        }
    });

    // Xử lý khi bài hát lỗi
    audio.addEventListener('error', () => {
        btnNext.click();
    });

    // Xử lý sự kiện nút random
    btnRandom.addEventListener('click', () => {
        isRandom = !isRandom;
        // setConfig('isRandom', isRandom);
        btnRandom.classList.toggle('active', isRandom);
    });

    // Xử lý sự kiện nút Rereat (lặp lại 1 bài)
    btnRepeat.addEventListener('click', () => {
        isRepeat = !isRepeat;
        // setConfig('isRepeat', isRepeat);
        btnRepeat.classList.toggle('active', isRepeat);
    });

    // Xử lý sự kiện active song current khi click
    playList.addEventListener('click', (event) => {
        let nodeSong = event.target.closest('.song:not(.active)');
        let optionSong = event.target.closest('.option');
        if (nodeSong && !optionSong) {
            currentIndex = Number(nodeSong.dataset.index);
            loadding();
            audio.play();
        }
        if (optionSong) {
            console.log('click optionSong');
        }
    });
};

const nextSong = () => {
    currentIndex++; // chỉ cần tăng index lên thì currentSong sẽ tự nhảy lên bài tiếp
    getSongs.then((songs) => {
        if (currentIndex >= songs.length) {
            currentIndex = 0;
        }
    });
    loadding();
};

const prevSong = () => {
    currentIndex--; // chỉ cần giảm index lên thì currentSong sẽ tự nhảy về bài trước
    getSongs.then((songs) => {
        if (currentIndex <= 0) {
            currentIndex = songs.length - 1;
        }
    });
    loadding();
};

const playRandomSong = () => {
    let newIndex = 0;
    getSongs.then((songs) => {
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentIndex);
    });

    currentIndex = newIndex;
    loadding();
};

const scrollToActiveSong = () => {
    let songActive = $('.song.active');
    setTimeout(() => {
        songActive.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }, 300);
};

const seekTimeSong = (event) => {
    let seekTime = (audio.duration / 100) * event.target.value;
    audio.currentTime = seekTime;
};

const animationCdRotate = (() => {
    // sử dụng singleton pattern
    let animationCd;
    function init() {
        return cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000, // quay trong 10s
            iterations: Infinity, // lặp lại vô hạn
        });
    }

    return animationCd ? animationCd : (animateCd = init());
})();

const activeCurrentSong = () => {
    let nodeSongOld = $(`.song.active`);
    if (nodeSongOld) {
        nodeSongOld.classList.remove('active');
    }
    let nodeSong = $(`.song[data-index="${currentIndex}"]`);
    if (nodeSong) {
        nodeSong.classList.add('active');
    }
};

const loadding = () => {
    let nameSong = $('header h2');
    let nameSinger = $('header h4');

    getSong(currentIndex).then((song) => {
        nameSong.innerText = song.name;
        nameSinger.innerText = song.singer;
        cdThumb.style.backgroundImage = `url('${song.image}')`;
        audio.src = song.path;
        animationCdRotate.pause();
        activeCurrentSong();
    });
};

const render = () => {
    getSongs
        .then((songs) => {
            let html = songs.map((song, index) => {
                return `
                <div class="song" data-index="${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
            });
            playList.innerHTML = html.join('');
        })
        .catch((err) => console.log(err));
};

const start = () => {
    handleEvents();
    loadding();
    render();
};

start();
