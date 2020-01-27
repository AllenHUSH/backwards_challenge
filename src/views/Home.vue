<template>
  <div class="home">
    <div class="recorder">
      <Recorder />
    </div>
    <div>
      <Recorder />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Recorder from "@/components/Recorder.vue";

export default {
  components: {
    Recorder
  }
};
</script>

<style lang="stylus" scoped>
.recorder {
  margin: 20px auto;
}
</style>
