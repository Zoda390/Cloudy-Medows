
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
    }

    play() {
        this.player.play();
    }
    stop() {
        this.player.pause();
    }


    update(){
        //check if done 
        
        console.log(this.player.currentTime + " Not " + this.player.duration)
        if( this.player.currentTime >= this.player.duration){
            console.log(this.player.currentTime + " DONE " + this.player.duration)
            if(this.currentTrack >=  this.tracks.length-1){
                // all tracks playied
                this.currentTrack = 0;
            }else{

                // go to the next track
                this.currentTrack++;
            }
            this.play()
        }   

    }

}