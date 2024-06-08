console.log(`Starting javascript...`);

(async () => {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let b = await a.text();
    console.log(b);

    let div = document.createElement("div");
    div.innerHTML = b;
    let list = div.getElementsByTagName("li");
    console.log(list);
    // let songs = document.createElement("div.songs-list");
    // let playlist = document.getElementsByClassName("library")[0]
    // playlist.append(songs)
    let songCard = document.getElementsByClassName("playlists")[0]
    let songs = document.getElementById("songs-list");
    let songlink = [];
    for (let i = 1; i < list.length; i++) {
        let text = list[i].innerText;
        let sliced = text.split("  ");
        console.log(`${sliced[0]}`);
        let html = list[i].innerHTML;
        let link = html.slice(html.search("href") + 6, html.search(".mp3") + 4);
        console.log(link);
        songlink.push(link);

        let newSong = `
        <div class="song">
            <img src="./SVGs/music.svg" class="invert" height="30px" alt="music-note">
            <div class="song-name">${sliced[0]}</div>
            <img src="./SVGs/play-filled.svg" class="invert" height="35px" alt="play-song">
        </div>
        `;

        let newSongCard = `
                    <div class="pl-card">
                        <div class="green-play">
                            <img src="./SVGs/play.svg" height="25px" alt="play-button">
                        </div>
                        <img src="https://i.scdn.co/image/ab67706f00000002104f039c1cc982d3617f4e4b" height="200px"
                            alt="card-img">
                        <h2>${sliced[0]}</h2>
                    </div>`

        songs.innerHTML = songs.innerHTML + newSong;
        songCard.innerHTML = songCard.innerHTML + newSongCard;
        // console.log(`${sliced[0]} ${sliced[1]} ${sliced[2]}...`);
    }

    let pause = document.getElementById("pause")
    let play = document.getElementById("play")
    let pauseplay = document.getElementById("pause-play")
    pause.style.display = "none";
    play.style.display = "block";

    const PausePlay = () => {
        if (pause.style.display == "none") {
            pause.style.display = "block";
            play.style.display = "none";
        } else {
            play.style.display = "block";
            pause.style.display = "none";
        }
    }
    pauseplay.style.cursor = "pointer"
    pauseplay.addEventListener("click",()=>{
        PausePlay()
    })

    console.log(songlink);

    let audio = new Audio(songlink[3]);
    audio.play();
})();
