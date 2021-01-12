<template>
  <transition name="fade">
    <!-- v-if="display" -->
    <b-card
      no-body
      border-variant="light"
      style="max-width: 310px; float: right; position: absolute; right: 0; background: #f4f1f0;"
      class="nav-card overflow-hidden"
      @mouseleave="$nuxt.$emit('nav-card-out')"
    >
      <b-row no-gutters>
        <b-col>
          <b-card-body class="text-center">
            <b-card-text>
              <b-list-group>
                <nuxt-link
                  v-for="link in menuelinks"
                  :key="link.slug.current"
                  class="nav-option"
                  :title="link.title"
                  :to="'/' + link.slug.current"
                >
                  {{ link.title }}
                </nuxt-link>
                <nuxt-link
                  class="nav-option"
                  :title="$t(courseLinkTitle)"
                  :to="'/' + $t(courseLinkSlug)"
                  >{{ $t(courseLinkTitle) }}</nuxt-link
                >
              </b-list-group>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </transition>
</template>

<script>
export default {
  props: {
    display: {
      type: Boolean,
      default: false
    },
    menuelinks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      courseLinkTitle: {
        en: 'Classes-Offers',
        de: 'Kurse-Angebote'
      },
      courseLinkSlug: {
        en: 'courses-offers',
        de: 'kurse-angebote'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.nav-card:hover {
  cursor: pointer;
}

.list-group a:hover {
  text-decoration: none;
}

.nav-option div:hover {
  background: var(--color-golden) !important;
  color: white;
  font-weight: bold;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (max-width: 767px) {
  .image-col {
    display: none;
  }
}
</style>
