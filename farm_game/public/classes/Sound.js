
class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}


class MusicSystem {

    constructor(tracks) {
        this.player = document.createElement("audio");
        this.player.tracks = tracks;
        this.player.src = tracks[0];
        this.player.setAttribute("preload", "auto");
        this.player.setAttribute("controls", "none");
        this.player.style.display = "none";
        document.body.appendChild(this.player);
    }
    play() {
        this.player.play();
    }
    stop() {
        this.player.pause();
    }
}