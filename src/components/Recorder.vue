<template>
  <div>
    <mu-paper class="my-paper" :z-depth="1" round>
      <mu-row>
        <mu-col span="12">
          <div class="grid-cell grid-title">
            <h1>{{ formatDuring(time) }}</h1>
          </div>
        </mu-col>
      </mu-row>
      <mu-row>
        <mu-col span="6">
          <div class="grid-cell grid-button">
            <mu-button
              color="primary"
              large
              @click="recorderStart"
              fab
              v-show="!isRecording"
            >
              <mu-icon value="mic"></mu-icon>
            </mu-button>
            <mu-button
              color="error"
              large
              @click="recorderStop"
              fab
              v-show="isRecording"
            >
              <mu-icon value="mic_off"></mu-icon>
            </mu-button>
          </div>
        </mu-col>
        <mu-col span="6">
          <div class="grid-cell grid-button">
            <mu-button color="success" large @click="recorderPlay">
              <mu-icon value="play_arrow"></mu-icon>正序播放
            </mu-button>
            <mu-button color="secondary" large @click="recorderBackWards">
              <mu-icon value="replay"></mu-icon>倒序播放
            </mu-button>
          </div>
        </mu-col>
      </mu-row>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      inputData: [],
      size: 0,
      audioInput: null,
      recorder: null,
      dataArray: null,
      dataArrayBack: null,
      isRecording: false,
      isTimer: null,
      time: 0,
    };
  },
  created() {},
  methods: {
    recorderStart() {
      this.isRecording = true;
      this.reset();
      this.startTimer();
      let self = this;
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      // 录音节点
      this.recorder = this.context.createScriptProcessor(4096, 1, 1);

      this.recorder.onaudioprocess = function (e) {
        // getChannelData返回Float32Array类型的pcm数据
        let data = e.inputBuffer.getChannelData(0);
        self.inputData.push(new Float32Array(data));
        self.size += data.length;
      };

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          this.audioInput = this.context.createMediaStreamSource(stream);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(function () {
          self.audioInput.connect(self.recorder);
          self.recorder.connect(self.context.destination);
        });
    },
    recorderStop() {
      this.isRecording = false;
      this.stopTimer();
      this.recorder.disconnect();
      if (0 !== this.size) {
        // 组合数据
        this.dataArray = this.combine(this.inputData, this.size);
        this.dataArrayBack = this.combine(this.inputData, this.size);
      }
      this.dataArrayBack.reverse();
    },
    recorderPlay() {
      this.playSound(this.dataArray);
    },
    recorderBackWards() {
      this.playSound(this.dataArrayBack);
    },
    combine(buffer, size) {
      let data = new Float32Array(size);
      let offset = 0; // 偏移量计算
      // 将二维数据，转成一维数据
      for (let i = 0; i < buffer.length; i++) {
        data.set(buffer[i], offset);
        offset += buffer[i].length;
      }
      return data;
    },
    // 播放音频
    playSound(data) {
      let frameCount = data.byteLength / 4;
      let myArrayBuffer = this.context.createBuffer(1, frameCount, 44100);
      let nowBuffering = myArrayBuffer.getChannelData(0);
      nowBuffering.set(data);
      let source = this.context.createBufferSource();
      source.buffer = myArrayBuffer;
      source.connect(this.context.destination);
      source.start();
    },
    reset() {
      this.inputData = [];
      this.size = 0;
      this.audioInput = null;
      this.dataArray = null;
      this.dataArrayBack = null;
      this.time = 0;
    },
    startTimer() {
      this.isTimer = setInterval(() => {
        this.time++;
      }, 10);
    },
    stopTimer() {
      clearInterval(this.isTimer);
    },
    formatDuring(mss) {
      let m = this.return2num(Math.floor(mss / 6000));
      let s = this.return2num(
        Math.floor(mss / 100) - Math.floor(mss / 6000) * 60
      );
      let ms = this.return2num(mss - Math.floor(mss / 100) * 100);
      return m + ":" + s + ":" + ms;
    },
    return2num(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.my-paper {
  padding: 0 0 19px;
}

.grid-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
}

.grid-title {
  height: 60px;
  text-align: center;
}

.grid-button {
  text-align: center;
  line-height: 50px;
}
</style>
