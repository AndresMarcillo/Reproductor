//song data
const songList = [
    {
        title: "Adios Dulcinea",
            file: "adios_dulcinea.mp3",
                cover: "mago_de_oz.jpg"
    },
    {
        title: "Canción de Cuna",
            file: "cancion_de_cuna.mp3",
                cover: "aida.jpg"
    },
    {
        title: "Walk This Way",
            file: "walk_this_way.mp3",
                cover: "aerosmith.jpg"
    }
]

//Canción actual
let actualSong = null;

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

progressContainer.addEventListener("click", setProgress);

//Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress);

//Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
})

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index)=> {
        //Crear li
        const li = document.createElement("li");
        //Crear a
        const link = document.createElement("a");
        //Hidratar a
        link.textContent = song.title;
        link.href = "#";
        //Escuchar clicks
        link.addEventListener("click", () => loadSong(index));
        //Añadir a li
        li.appendChild(link);
        //Añadir li a ul
        songs.appendChild(li);
    })
}

//Cargar canción seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex;
        audio.src = "./assets/audio/" + songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeSongTitle(songIndex);
        
    }
    
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    // Total y el actual
    const { duration, currentTime } = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%";
}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration;
    audio.currentTime = current;

}

//Actualizar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    } else {
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    }
}

// Reproducir canción
function playSong() {
    if (actualSong !== null) {
        audio.play();
        updateControls();    
    }   
}

// Pausar canción
function pauseSong() {
    audio.pause();
    updateControls();
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}

//Cambiar el cover de la canción
function changeCover(songIndex) {
    cover.src = "./assets/img/" + songList[songIndex].cover;
}

//Cambiar el título de la canción
function changeSongTitle(songIndex) {
    title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong() {
    if (actualSong !== null) {
        if (actualSong > 0) {
            loadSong(actualSong - 1);    
        } else {
            loadSong(songList.length - 1);
        }
        
    }
}

// SIguiente canción
function nextSong() {
    if (actualSong !== null) {
        if (actualSong < songList.length - 1) {
            loadSong(actualSong + 1);
        } else {
            loadSong(0);
        }
    }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong());

// GO!
loadSongs();
