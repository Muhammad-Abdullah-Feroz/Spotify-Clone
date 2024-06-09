console.log(`Starting javascript...`);

(async () => {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let b = await a.text();
    console.log(b);

    let audio = new Audio();
    let div = document.createElement("div");
    div.innerHTML = b;
    let list = div.getElementsByTagName("li");

    // console.log(list);
    // let songs = document.createElement("div.songs-list");
    // let playlist = document.getElementsByClassName("library")[0]
    // playlist.append(songs)

    let songCard = document.getElementsByClassName("playlists")[0]
    let songs = document.getElementById("songs-list");
    let songlink = [];

    for (let i = 1; i < list.length; i++) {
    
        let text = list[i].innerText;
        let sliced = text.split(".");
        let html = list[i].innerHTML;
        let link = html.slice(html.search("href") + 6, html.search(".mp3") + 4);
        if(!link.endsWith('.mp3')){
            continue;
        }
        // console.log(link);
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
                        <img src="https://picsum.photos/200?random=${i}" height="200px"
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
        if (pause.style.display == "none" && audio.paused) {
            pause.style.display = "block";
            audio.play();
            play.style.display = "none";
        } else {
            play.style.display = "block";
            pause.style.display = "none";
            audio.pause();
        }
    }
    pauseplay.style.cursor = "pointer"
    pauseplay.addEventListener("click", () => {
        PausePlay()
    })

    // console.log(songlink);



    Array.from(document.getElementsByClassName("song")).forEach((e, i) => {
        e.addEventListener("click", () => {
            console.log(i);
            console.log(songlink[i]);
            playSong(songlink[i]);
        }
        )
    })
    
    Array.from(document.getElementsByClassName("green-play")).forEach((e, i) => {
        e.addEventListener("click", () => {
            console.log(i);
            console.log(songlink[i]);
            playSong(songlink[i]);
        }
        )
    })
    
    let start = document.getElementById("time-start")
    let end = document.getElementById("time-end")
    const wait = async ()=>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 100);
        })
    }
    
    const seekbar = document.getElementById("seekbar")

    const updateSeekbar = ()=>{
        seekbar.min = 0;
        seekbar.max = audio.duration;
        seekbar.value = parseInt(audio.currentTime  )
    }

    seekbar.addEventListener('input',(val)=>{
        audio.currentTime = seekbar.value;
    })

    let timeout = 0;

    const updateTime = ()=>{

        clearInterval(timeout)

        let endtime = parseInt(audio.duration)
        let starttime = 0
        let minutes = Math.floor(endtime/60);
        let seconds = endtime%60;

        // endtime = endtime
        end.innerHTML = `${(minutes<10)?'0':''}${minutes}:${(seconds<10)?'0':''}${seconds}`

        timeout = setInterval(() => {
            starttime = parseInt(audio.currentTime)
            minutes = Math.floor(starttime/60);
            seconds = starttime%60;
            start.innerHTML = `${(minutes<10)?'0':''}${minutes}:${(seconds<10)?'0':''}${seconds}`

            if(audio.ended){
                clearInterval(timeout)
            }

            updateSeekbar();
            
        }, 1000);
    }

    const resetTime = ()=>{
        end.innerHTML = '00:00'
        start.innerHTML = '00:00'
    }

    

    const playSong = async (link) => {
        pause.style.display = "block";
        play.style.display = "none";
        audio.src = link;
        resetTime()
        audio.play()
        await wait();
        updateTime();
        }
        console.log(start);
        console.log(end);
})();
