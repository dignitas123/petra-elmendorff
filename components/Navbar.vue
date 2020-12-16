<template>
  <header class="header text-center">
    <h1 id="headerText">
      <nuxt-link to="/">{{ title }}</nuxt-link>
    </h1>
    <div id="subHeaderText">
      <img id="chinesSign" src="~/assets/img/chinese_sign_jinshinjyutsu.png" />
      <h2 id="subHeaderTextHeading">
        {{ subheader }}
      </h2>
    </div>
    <b-navbar toggleable="lg" type="light" variant="sucess">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pl-20 ml-auto main-nav">
          <!-- <div>
          <nuxt-link class="nav-option" title="home" to="/">Home</nuxt-link>
        </div> -->
          <li v-for="link in headermenue" :key="link.slug.current">
            <div>
              <nuxt-link
                class="nav-option"
                :title="link.title"
                :to="'/' + link.slug.current"
                >{{ link.title }}</nuxt-link
              >
            </div>
          </li>
          <li>
            <div>
              <nuxt-link
                class="nav-option"
                :title="$t(courseLinkTitle)"
                :to="$t(courseLinkSlug)"
                >{{ $t(courseLinkTitle) }}</nuxt-link
              >
            </div>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="lang ml-auto pr-5">
          <div>
            <span
              class="lang border-right-v"
              :class="underlineIfLang('en')"
              right
              @click="changeLanguage('en')"
              >E</span
            >
          </div>
          <div>
            <span
              class="lang"
              :class="underlineIfLang('de')"
              right
              @click="changeLanguage('de')"
              >D</span
            >
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="language-mobile">
      <span :class="underlineIfLang('en')" right @click="changeLanguage('en')"
        >E</span
      >
      <span :class="underlineIfLang('de')" right @click="changeLanguage('de')"
        >D</span
      >
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: 'Petra Elmendorff'
    }
  },
  data: function() {
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
  },
  computed: {
    // auto include store getters
    ...mapGetters(['subheader', 'headermenue', 'currentSlug'])
  },
  methods: {
    changeLanguage: function(lang) {
      console.log('changed language', lang)
      this.$store.commit('setLanguage', lang)
      // this.setCurrentSlug(this.courseLinkSlug[this.$store.state.language])
      if (this.currentSlug) {
        // navigate to other right lang slug
        this.$router.push({
          path: '/' + this.$t(this.currentSlug).current
        })
      }
    },
    underlineIfLang: function(lang) {
      return lang == this.$store.getters.getLanguage ? 'underline' : ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.css';

.language-mobile {
  display: none;
}

.navbar {
  font-size: var(--font-large-size);
}

.underline {
  text-decoration: underline;
}

#headerText {
  a {
    color: inherit;
    text-decoration: none;
  }
  font-size: var(--font-title1-size);
  color: var(--color-gray);
  margin: 19px 0 10px 0;
  font-weight: bold;
}

#subHeaderTextHeading {
  font-family: var(--font-family-sans-secondary);
  font-size: var(--font-title2-size);
  display: inline-block;
  vertical-align: middle;
  color: var(--color-golden);
}

#chinesSign {
  height: 40px;
  padding-bottom: 5px;
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

.main-nav {
  padding-left: 80px;
  li {
    display: inline-block;
    font-size: 0;
    &:not(:last-child) {
      .nav-option {
        border-right: 1px solid var(--color-dark-gray);
      }
    }
    .nav-option {
      display: inline-block;
      padding-right: 10px;
      padding-left: 10px;
      text-align: center;
      font: normal var(--font-title3-size) var(--font-family-sans-secondary);
      .lang {
        font-family: var(--font-family-sans);
        font-weight: bold;
      }
      &:hover {
        font-weight: bold;
        text-decoration: none;
      }
      &::before {
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
    .nuxt-link-exact-active {
      font-weight: bold;
      text-decoration: none;
    }
  }
}

.border-right-v {
  border-right: 1px solid var(--color-dark-gray);
}

.lang {
  color: var(--color-dark-gray);
  padding-right: 5px;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

@media (max-width: 542px) {
  #headerText {
    padding-left: 20px;
    font-size: var(--font-title2-size);
  }
  #subHeaderTextHeading {
    font-size: var(--font-title3-size);
  }
  .language-mobile {
    top: 105px !important;
    left: 0;
    width: 100px;
  }
}

@media (max-width: 991px) {
  .main-nav {
    padding-left: 0;
    li {
      display: block !important;
    }
  }
  .navbar-nav {
    display: block;
    margin: 0 auto;
    width: 200px;
    margin-top: 5px;
    text-align: center;
    li {
      div {
        padding-bottom: 5px;
        a {
          border-right: none !important;
        }
      }
    }
  }
  .lang {
    display: none;
  }

  .language-mobile {
    color: var(--color-dark-gray);
    font-size: 21px;
    display: block;
    position: absolute;
    top: 15px;
    right: 25px;
    span:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
