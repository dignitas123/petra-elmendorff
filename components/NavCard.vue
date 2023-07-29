<template>
  <transition name="fade">
    <b-card
      v-if="display"
      id="navCard"
      no-body
      border-variant="light"
      style="max-width: 350px; float: right; right: 0; background: #f4f1f0;"
      class="nav-card overflow-hidden"
      @mouseleave="$nuxt.$emit('nav-card-out')"
      @click="$nuxt.$emit('nav-card-out')"
    >
      <b-row no-gutters>
        <b-col class="py-2" style="padding-left: 70px;">
          <b-card-body class="text-left">
            <div
              class="close-button position-absolute"
              style="right: 30px; top: 15px; font-size: 30px"
            >
              <b>x</b>
            </div>
            <b-card-text>
              <b-list-group>
                <nuxt-link class="nav-option" to="/">
                  Home
                </nuxt-link>
                <nuxt-link class="nav-option" to="/jin-shin-jyutsu">
                  Jin Shin Jyutsu
                </nuxt-link>
                <nuxt-link class="nav-option" to="/astromatrix">
                  AstroMatrix
                </nuxt-link>
                <nuxt-link
                  class="nav-option"
                  :title="$t(courseLinkTitle)"
                  :to="'/' + $t(courseLinkSlug)"
                  >{{ $t(courseLinkTitle) }}</nuxt-link
                >
                <nuxt-link class="nav-option" to="/youtube">
                  YouTube
                </nuxt-link>
                <nuxt-link class="nav-option" to="/shop">
                  Shop
                </nuxt-link>
                <nuxt-link class="nav-option" to="/about">
                  {{ $t(about) }}
                </nuxt-link>
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
        en: 'Calendar',
        de: 'Kalender'
      },
      courseLinkSlug: {
        en: 'courses-offers',
        de: 'kurse-angebote'
      },
      about: {
        en: 'About',
        de: 'Über'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.nav-card {
  font-size: 25px;
}

.nav-card:hover {
  cursor: pointer;
}

.list-group a:hover {
  text-decoration: none;
}

.nav-option:hover {
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

#navCard {
  top: 0;
}

@media (max-width: 766px) {
  #navCard {
    top: -16px !important;
  }
}

@media (max-width: 690px) {
  .image-col {
    display: none;
  }
  // .nav-card {
  //   top: -200px !important;
  //   background: red;
  // }
  // #navCard {
  //   position: fixed !important;
  //   top: -200px !important;
  // }
}
</style>
