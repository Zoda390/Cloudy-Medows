
class Sound {
    constructor(src) {
        this.src = src;

    }
    play() {
        this.sound = document.createElement("audio");
        this.sound.src = this.src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}


class MusicPlayer {
    constructor(tracks) {
        this.player = document.createElement("audio");
        this.tracks = tracks;
        
        this.currentTrack = 0;
        this.player.src = tracks[this.currentTrack];
        this.player.setAttribute("preload", "auto");
        this.player.setAttribute("controls", "none");
        this.player.style.display = "none";
        this.volume = this.player.volume;

        document.body.appendChild(this.player);
        this.player.play();
    }

    play() {
        this.player.play();
    }
    stop() {
        this.player.pause();
    }


    update(){ 
        this.play();
        this.player.volume = 0.05;
        //console.log(this.player.currentTime + " Not " + (this.player.duration - 0.1) + " Track " + this.currentTrack);
        if( this.player.currentTime >= this.player.duration - 0.1){ //check if done
            console.log(this.player.currentTime + " DONE " + this.player.duration)
            this.currentTrack++; // go to the next track
            
            if(this.currentTrack >=  this.tracks.length-1){
                this.currentTrack = 0; // all tracks playied
            }
            this.player.src = this.tracks[this.currentTrack];
            this.play()
        }

    }

}