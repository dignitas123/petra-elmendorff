<template>
  <div class="page-content">
    <header class="header">
      <figure>
        <SanityImage
          v-if="image"
          :image="image"
          :zitat="$t(image.zitat)"
          :width="1800"
          :height="500"
          :author="image.zitatsource"
          class="mainImage"
        />
      </figure>
    </header>
    <div class="content">
      <div class="sessionContent">
        <BlockContent
          :v-if="$t(content)"
          :blocks="$t(content)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    BlockContent,
  },
  data() {
    return {
      serializers: {
        types: {}
      },
      image: '',
      slug: {}
    }
  }
}
</script>

<style scoped>
.page-content {
  max-width: 840px;
  margin: 0 auto;
}

h1, figure {
    text-align: center;
}

.content {
  margin: 100px 20px 0px 20px;
}

@media (max-width: 657px) {
  figure > img {
    width: 100%;
  }
  .content {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
