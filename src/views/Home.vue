<template>
  <div class="home">
    <mu-row gutter>
      <mu-col span="12" md="6">
        <Recorder />
      </mu-col>
      <mu-col span="12" md="6">
        <Recorder />
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Recorder from "@/components/Recorder.vue";

export default {
  components: {
    Recorder,
  },
};
</script>

<style lang="stylus" scoped>
.col {
  margin-top: 20px;
}
</style>
