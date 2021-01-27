<template>
  <div>
    <navbar />
    <nuxt />
    <Footer />
    <scroll-to-top-arrow />
    <div class="gap"> </div>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'

export default {
  computed: {
    title: function() {
      return this.$store.state.siteSettings.title
    },
    language: function() {
      return this.$store.state.language
    }
  }
}
</script>

<style lang="scss">
@import '~/styles/custom-properties';
@import '~/styles/custom-media';

.gap {
  height: 15px;
}

html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
  letter-spacing: 0.03rem;
  margin-top: 1.25rem;
  max-width: 1614px;
  margin-right: auto;
  margin-left: auto;
  @media (--media-max-mid-small) {
      margin-top: 0.45rem;
  }
}

.title {
  font-weight: 600;
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  margin-bottom: 0.25rem;
  padding-bottom: 0;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.container {
  padding-right: 40px;
  padding-left: 40px;
}

.title + p {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);
  margin-top: 0;
  margin-bottom: 4rem;

  @media (--media-min-medium) {
    font-size: var(--font-title3-size);
    line-height: var(--font-title3-line-height);
  }
}
</style>
