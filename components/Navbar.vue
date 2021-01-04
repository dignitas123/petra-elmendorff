<template>
  <header class="nav-header text-center position-relative">
    <div class="brand-sign">
      <h1 id="headerText">
        <nuxt-link to="/">Petra Elmendo<span class="wider-ls">rff</span></nuxt-link>
      </h1>
      <h2 id="subHeaderText">
        <img
          id="chineseSign"
          src="~/assets/img/chinese_sign_jinshinjyutsu.png"
          class="float-left"
        />
        <h2 id="subHeaderTextHeading" class="float-left">
          Jin Shin Jyutsu <span class="smaller-unit">&amp;</span> AstroMatrix
        </h2>
      </h2>
    </div>
    <div class="menue-container position-absolute">
      <DoubleCheeseBurger />
      <div class="language-switch mt-2">
        <span
          class="lang d-inline-block mr-2"
          :class="underlineIfLang('de')"
          right
          @click="changeLanguage('de')"
          >D</span
        >
        <div
          style="height: 13px; width: 1px; background: #593f4c;"
          class="d-inline-block"
        ></div>
        <span
          class="lang d-inline-block ml-1"
          :class="underlineIfLang('en')"
          right
          @click="changeLanguage('en')"
          >E</span
        >
      </div>
    </div>
    <NavCard :display="displayNavbar" :menuelinks="headermenue" />
    <div class="language-mobile">
      <span :class="underlineIfLang('de')" right @click="changeLanguage('de')"
        >D</span
      >
      <span :class="underlineIfLang('en')" right @click="changeLanguage('en')"
        >E</span
      >
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DoubleCheeseBurger from './icons/DoubleCheeseBurger.vue'
import NavCard from '~/components/NavCard.vue'

export default {
  components: { DoubleCheeseBurger, NavCard },
  props: {
    title: {
      type: String,
      default: 'Petra Elmendorff'
    }
  },
  data: function() {
    return {
      displayNavbar: false
    }
  },
  computed: {
    // auto include store getters
    ...mapGetters(['headermenue', 'currentSlug'])
  },
  methods: {
    changeLanguage: function(lang) {
      console.log('changed language', lang)
      this.$store.commit('setLanguage', lang)
      if (this.currentSlug) {
        this.$router.push({
          path: '/' + this.$t(this.currentSlug).current
        })
      }
    },
    underlineIfLang: function(lang) {
      return lang == this.$store.getters.getLanguage ? 'bolder' : ''
    }
  },
  created() {
    this.$nuxt.$on('menu-hover', () => {
      this.displayNavbar = true
    }),
    this.$nuxt.$on('nav-card-out', () => {
      this.displayNavbar = false
    })
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.nav-card {
  z-index: 3;
  position: absolute;
  top: 0;
  width: 100%;
}

.language-switch {
  font-size: 16px;
  font-weight: 100;
}

.language-mobile {
  display: none;
}

.navbar {
  font-size: var(--font-large-size);
}

.bolder {
  font-family: var(--font-family-sans-bold) !important;
}

#headerText {
  a {
    color: inherit;
    text-decoration: none;
  }
  font-size: var(--font-logo-size);
  color: var(--color-gray);
  font-weight: bold;
  text-align: left;
}

#subHeaderTextHeading {
  font-family: var(--font-family-sans-thin);
  font-size: calc(44 / var(--unit) * 1rem);
  display: inline-block;
  vertical-align: middle;
  color: var(--color-golden);
  margin-top: -6px;
  margin-left: 5px;
}

#chineseSign {
  height: 90px;
  padding-bottom: 5px;
  margin-top: -25px;
}

#subHeaderText {
  margin-top: -16px;
}

.navbar-light .navbar-toggler {
  margin: 0 auto;
}

.navbar.navbar-light.navbar-expand-md {
  text-align: center;
  margin: 0 auto;
}

.wider-ls {
  letter-spacing: 5px;
}

.menue-container {
  right: 20px;
  top: 0;
  font-size: 8px;
  &:hover {
    cursor: pointer;
  }
}

.brand-sign {
  margin-top: 75px;
  margin-left: 12%;
}

.smaller-unit {
  font-size: var(--font-title2-size);
}

// .border-right-v {
//   border-right: 1px solid var(--color-dark-gray);
// }

.lang {
  color: var(--color-dark-gray);
  padding-right: 5px;
  padding-left: 5px;
  font-family: var(--font-family-sans-light);
  width: 20px;
  &:hover {
    cursor: pointer;
    font-family: var(--font-family-sans-bold);
  }
}

@media (max-width: 542px) {
  #headerText {
    padding-left: 25px;
    font-size: var(--font-title2-size);
  }
}

@media (max-width: 991px) {
  .lang {
    display: none;
  }
}
</style>
