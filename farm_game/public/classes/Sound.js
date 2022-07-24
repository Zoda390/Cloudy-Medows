
class Sound {
    constructor(srcarray) {
        this.src = srcarray;
        this.var = 0;
    }
    play() {
        this.sound = document.createElement("audio")
        this.sound.setAttribute("class","soundfx");
        this.var = round(random(0,this.src.length-1))
        console.log(this.src.length);
        console.log(this.var);
        this.sound.src = this.src[this.var];
        this.sound.setAttribute("preload", "none");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.sound.volume = fxSlider.value();
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
        
        this.currentTrack = round(random(0,this.tracks.length-1));
        this.player.src = tracks[this.currentTrack];
        //this.player.setAttribute("preload", "auto");
        this.player.setAttribute("controls", "none");
        this.player.setAttribute("preload", "none");
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
        this.player.volume = musicSlider.value();
        //console.log(this.player.currentTime + " Not " + (this.player.duration - 0.1) + " Track " + this.currentTrack);
        if( this.player.currentTime >= this.player.duration - 0.1){ //check if done

            this.player.src = this.tracks[round(random(0,this.tracks.length))];
            this.play()
        }

        var fxlist = document.getElementsByClassName("soundfx");
        for(var i =0; i<fxlist.length; i++){
            if(fxlist[i].currentTime >= fxlist[i].duration - 0.1){ //check if done
                //console.log(fxlist[i].currentTime + " DONE " + fxlist[i].duration)
                fxlist[i].remove();
            }
        }
    }

}