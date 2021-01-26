<template>
  <header class="nav-header text-center position-relative">
    <div class="brand-sign">
      <h1 id="headerText" class="medium-font letter-spacing-less">
        <nuxt-link to="/"
          >Petra Elmendorff</nuxt-link
        >
      </h1>
      <h2 id="subHeaderText">
        <img
          id="chineseSign"
          src="~/assets/img/chinese_sign_jinshinjyutsu.png"
          class="float-left"
        />
      </h2>
      <h2 id="subHeaderTextHeading" class="float-left light-font">
        Jin Shin Jyutsu <span class="smaller-unit">&amp;</span> AstroMatrix
      </h2>
    </div>
    <div class="menue-container position-absolute">
      <DoubleCheeseBurger />
      <DoubleCheeseBurgerSmall />
      <DoubleCheeseBurgerVerySmall />
      <div class="language-switch mt-2 mr-1">
        <span
          class="lang lang-left d-inline-block"
          :class="boldIfLang('de')"
          right
          @click="changeLanguage('de')"
          >D</span
        >
        <div id="langSeperator" class="d-inline-block"></div>
        <span
          class="lang d-inline-block"
          :class="boldIfLang('en')"
          right
          @click="changeLanguage('en')"
          >E</span
        >
      </div>
    </div>
    <NavCard :display="displayNavbar" :menuelinks="headermenue" />
    <div class="language-mobile">
      <span :class="boldIfLang('de')" right @click="changeLanguage('de')"
        >D</span
      >
      <span :class="boldIfLang('en')" right @click="changeLanguage('en')"
        >E</span
      >
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
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
      // console.log('changed language', lang)
      this.$store.commit('setLanguage', lang)
      this.$cookies.set('lang', this.$store.getters.getLanguage, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
      if (this.currentSlug) {
        this.$router.push({
          path: '/' + this.$t(this.currentSlug).current
        })
      }
    },
    boldIfLang: function(lang) {
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

#langSeperator {
  height: 13px;
  width: 1px;
  background: #593f4c;
}

.menue-content-mobile {
  display: none;
}

.menue-content-mobile-2 {
  display: none;
}

.nav-card {
  z-index: 3;
  position: absolute;
  top: 0;
  width: 100%;
}

.language-switch {
  font-size: 16px;
  font-weight: 100;
  margin-top: 30px !important;
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
  text-align: left;
}

#subHeaderTextHeading {
  font-size: 42px;
  display: inline-block;
  vertical-align: middle;
  color: var(--color-golden);
  margin-top: -15px;
  margin-left: 5px;
}

#chineseSign {
  height: 55px;
  padding-bottom: 5px;
  margin-top: -19px;
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

.menue-container {
  right: 20px;
  top: 0;
  &:hover {
    cursor: pointer;
  }
}

.brand-sign {
  // margin-top: 75px;
  margin-top: 10px;
  margin-left: 8%;
}

.smaller-unit {
  font-size: 20px;
}

// .border-right-v {
//   border-right: 1px solid var(--color-dark-gray);
// }

.lang {
  color: var(--color-dark-gray);
  // padding-right: 5px;
  // padding-left: 5px;
  font-family: var(--font-family-sans-light);
  // width: 20px;
  &:hover {
    cursor: pointer;
    font-family: var(--font-family-sans-bold);
  }
}

@media (max-width: 991px) {
  .lang {
    display: none;
  }
}

@media (max-width: 767px) {
  .language-switch {
    margin-top: 15px !important;
    .lang {
      width: 0;
      margin-left: 0 !important;
    }
    .lang-left {
      margin-right: 10px;
    }
  }
  #headerText {
    font-size: 55px;
  }
  #subHeaderTextHeading {
    font-size: 28px;
    margin-left: 1px;
    margin-top: -9px;
  }
  .smaller-unit {
    font-size: 14px;
  }
  #chineseSign {
    height: 37px;
    margin-top: -10px;
  }
  .menue-content-mobile {
    display: block;
    margin-top: -15px;
  }
  .menue-content {
    display: none;
  }
  .language-switch {
    font-size: 12px;
    font-weight: 100;
  }
  .lang {
    padding-right: 1px;
    padding-left: 1px;
    width: 10px;
  }
  #langSeperator {
    height: 8px;
    width: 1px;
  }
}

@media (max-width: 542px) {
  #headerText {
    font-size: 45px;
  }
  #chineseSign {
    height: 30px;
    margin-top: -7px;
  }
  #subHeaderTextHeading {
    font-size: 22px;
    .smaller-unit {
      font-size: 12px;
    }
  }
}

@media (max-width: 482px) {
  #headerText {
    font-size: 43px;
    padding-top: 5px;
  }
  #subHeaderTextHeading {
    font-size: 21px;
    margin-top: -4px;
    margin-left: 0.5px;
  }
  #chineseSign {
    height: 30px;
    margin-top: -6px;
  }
  .smaller-unit {
    font-size: 9px;
  }
  .menue-container {
    right: 5px;
  }
}

@media (max-width: 404px) {
  .menue-content-mobile {
    display: none;
  }
  .menue-content-mobile-2 {
    display: block;
  }
  .brand-sign {
    margin-left: 8%;
  }
  #headerText {
    font-size: 35px;
  }
  #subHeaderTextHeading {
    font-size: 16px;
  }
  #chineseSign {
    height: 25px;
  }
  .menue-container {
    top: -7px;
  }
}
</style>
