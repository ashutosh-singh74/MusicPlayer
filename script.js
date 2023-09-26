new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Mai Nikla Gaddi Leke",
          artist: "Udit N",
          cover: "https://iili.io/JJ4QXbj.th.jpg",
          source: "https://audio.jukehost.co.uk/BhALOCMDSWkBMKzQtt215vPyBe3xSwzN",
          url: "https://www.youtube.com/watch?v=2nK6WBcGPOw&pp=ygUabWFpIG5pa2xhIGhvIGdhZGRpIGxla2UgZGo%3D",
          favorited: false
        },
        {
          name: "Kanhaiya Twitter Pe Aaja",
          artist: "Pritam",
          cover: "https://iili.io/JJ4DmkF.th.jpg",
          source: "https://audio.jukehost.co.uk/VosSSMZHfaXV5Ej7TID2sCe3gIANscz7",
          url: "https://www.youtube.com/watch?v=g0YhUhtSQiE",
          favorited: true
        },

        {
          name: "Heart Throb",
          artist: "Pritam & amitabh",
          cover: "https://iili.io/JJ4yjvS.th.jpg",
          source: "https://audio.jukehost.co.uk/UMNgJXH7Q0DzLZ6hf4F8sMcaEobXMZNg",
          url: "https://www.youtube.com/watch?v=0oEIQKV5akQ",
          favorited: false
        },

        {
          name: "JALSA 2.0 ",
          artist: "Satinder Sartaaj",
          cover: "https://iili.io/JJ6HEg4.th.jpg",
          source: "https://audio.jukehost.co.uk/1sjlD9SxYkVs3HQvEmqVrwxxtByE7HwF",
          url: "https://www.youtube.com/watch?v=2EdgAic4nao",
          favorited: false
        },
        {
          name: "Ki Farak Painda Hai",
          artist: "Pritam, Dev, Neeti, Amitabh B",
          cover: "https://iili.io/JJ62D2j.th.jpg",
          source: "https://audio.jukehost.co.uk/QVLzUO7njwLaZiZUglDdlDFhNKwAXf5H",
          url: "https://www.youtube.com/watch?v=E9Oi-GYBpts",
          favorited: true
        },
        {
          name: "Dhindora Baje Re",
          artist: "Darshan",
          cover: "https://iili.io/JJ62U74.th.jpg",
          source: "https://audio.jukehost.co.uk/WpErwawFv6g3qfKjzHs1XFmFiEYk69k4",
          url: "https://www.youtube.com/results?search_query=dhindora+baje+re",
          favorited: false
        },
        {
          name: "Chaleya",
          artist: "Arijit",
          cover: "https://iili.io/JJ63DMX.th.jpg",
          source: "https://audio.jukehost.co.uk/zwIXfLhSIh80UhEGcmKEnfacZLbP5jFF",
          url: "https://www.youtube.com/watch?v=VAdGW7QDJiU",
          favorited: true
        },
        {
          name: "Naseeb Se",
          artist: "Sameer",
          cover: "https://iili.io/JJ6KXmQ.th.jpg",
          source: "https://audio.jukehost.co.uk/GQAT2mzmPdqGTPfdtaxlaDxY0ASsDkvp",
          url: "https://www.youtube.com/watch?v=Sk0DsJuJ_y8",
          favorited: false
        },
        {
          name: "Chal Tere Isaq Mai",
          artist: "Vishal",
          cover: "https://iili.io/JJ6fxjV.th.jpg",
          source: "https://audio.jukehost.co.uk/t8P6BAM3VJzOmbFeRg1p0RZ9WqdhrmwG",
          url: "https://www.youtube.com/watch?v=p_oYiDR6S0E&pp=ygUiY2hhbCB0ZXJlIGlzaHEgbWVpbiBwYWQgamFhdGUgaGFpbg%3D%3D",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});