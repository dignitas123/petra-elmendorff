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
        <!-- <figcaption>{{ info.image.caption }}</figcaption> -->
      </figure>
      <!-- <h1 class="title">{{ info.name }}</h1>
      <p class="subtitle">{{ info.description }}</p> -->
      <!-- <div class="dates">
        {{ new Date(info.schedule.from) | dateFilter('DD MMMM ha') }}
        &ndash;
        {{ new Date(info.schedule.to) | dateFilter('ha') }}
      </div> -->
      <!-- <div class="venue">{{ info.venue.name }}, {{ info.venue.city }}</div> -->
    </header>
    <div class="content">
      <!-- <h1 class="sessionTitle">{{ $t(title) }}</h1> -->
      <!-- <p v-if="$t(summary)" class="summary">
        {{ $t(summary) }}
      </p> -->
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
      // selLanguage: '',
      image: '',
      slug: {}
    }
  }
}
</script>

<style scoped>
.page-content {
  max-width: 800px;
  margin: 0 auto;
}

h1, figure {
    text-align: center;
}

.content {
  margin-top: 100px;
}
</style>