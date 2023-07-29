<template>
  <iframe
    v-if="videoCode"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    width="auto"
    height="auto"
    type="text/html"
    :src="
      `https://www.youtube.com/embed/${videoCode}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`
    "
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    videoCode() {
      const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:&\S*|)$/i
      const match = this.src.match(regex)
      return match ? match[1] : null
    }
  }
}
</script>
