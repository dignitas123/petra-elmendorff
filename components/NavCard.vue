<template>
  <transition name="fade">
    <b-card
      v-if="display"
      no-body
      class="nav-card overflow-hidden"
      @mouseleave="$nuxt.$emit('nav-card-out')"
    >
      <b-row no-gutters>
        <b-col md="3" class="mt-2">
          <nuxt-link to="/">
            <b-card-img
              src="~/assets/img/navCardLotusBackgroundPetraElmendorff.png"
              alt="navCard Lotus Background Petra Elmendorff"
            ></b-card-img
          ></nuxt-link>
        </b-col>
        <b-col md="3" class="ml-auto">
          <b-card-body title="Navigation" class="text-center">
            <b-card-text>
              <b-list-group>
                <nuxt-link
                  v-for="link in menuelinks"
                  :key="link.slug.current"
                  class="nav-option"
                  :title="link.title"
                  :to="'/' + link.slug.current"
                >
                  <b-list-group-item>
                    {{ link.title }}
                  </b-list-group-item></nuxt-link
                >
                <nuxt-link
                  class="nav-option"
                  :title="$t(courseLinkTitle)"
                  :to="'/' + $t(courseLinkSlug)"
                  ><b-list-group-item>{{
                    $t(courseLinkTitle)
                  }}</b-list-group-item></nuxt-link
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
        en: 'Courses-Offers',
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
  transition: opacity 2s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
