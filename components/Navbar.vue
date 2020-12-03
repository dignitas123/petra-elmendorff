<template>
  <header class="header">
    <h1 id="petraelmendorff" class="text-center">
      <nuxt-link to="/">{{ sitetitle }}</nuxt-link>
    </h1>
    <div id="subHeaderText">
      <img id="chinesSign" src="~/assets/img/chinese_sign_jinshinjyutsu.png" />
      <h2 id="petraelmendorffSub" class="text-center">
        {{ subheadertext }}
      </h2>
    </div>
    <b-navbar toggleable="lg" type="light" variant="sucess">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pl-20 ml-auto main-nav"
          ><div>
            <nuxt-link
              class="nav-option border-right"
              title="Jin Shin Jyutsu"
              to="/JinShinJyutsu"
              >Jin Shin Jyutsu</nuxt-link
            >
          </div>
          <div>
            <nuxt-link
              class="nav-option border-right"
              title="AstroMatrix"
              to="/AstroMatrix"
              >AstroMatrix</nuxt-link
            >
          </div>
          <div>
            <nuxt-link
              class="nav-option border-right"
              title="Kurse-Angebote"
              to="/KurseAngebote"
              >Kurse-Angebote</nuxt-link
            >
          </div>
          <div>
            <nuxt-link class="nav-option" title="Über" to="/About"
              >Über</nuxt-link
            >
          </div>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="lang ml-auto pr-5">
          <div>
            <span
              class="lang border-right"
              :class="isLanguage('EN')"
              right
              @click="changeLanguage($event)"
              >E</span
            >
          </div>
          <div>
            <span
              class="lang"
              :class="isLanguage('DE')"
              right
              @click="changeLanguage($event)"
              >D</span
            >
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Petra Elmendorff'
    }
  },
  data() {
    return {
      selLanguage: this.$store.state.language
    }
  },
  computed: {
    sitetitle: function() {
      return this.$store.state.eventInformation.name
    },
    subheadertext: function() {
      return this.$store.state.eventInformation.description
    }
  },
  methods: {
    changeLanguage: function(event) {
      let lang = event.target.innerHTML
      if (lang == 'D') {
        this.selLanguage = 'DE'
      } else {
        this.selLanguage = 'EN'
      }
    },
    isLanguage: function(lang) {
      return lang == this.selLanguage ? 'underline' : ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.css';

.navbar {
  font-size: var(--font-large-size);
}

.underline {
  text-decoration: underline;
}

#petraelmendorff {
  a {
    color: inherit;
    text-decoration: none;
  }
  font-size: var(--font-title1-size);
  color: var(--color-gray);
  margin: 19px 0 10px 0;
  font-weight: bold;
}

#petraelmendorffSub {
  font-family: var(--font-family-sans-secondary);
  font-size: var(--font-title2-size);
  display: inline-block;
  vertical-align: middle;
  color: var(--color-golden);
}

#chinesSign {
  height: 33px;
}

#subHeaderText {
  text-align: center;
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
  div {
    display: inline-block;
    font-size: 0;
    .border-right {
      border-right: 1px solid var(--color-dark-gray);
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

.lang {
  color: var(--color-dark-gray);
  padding-right: 5px;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.navbar-nav {
  font-family: var(--font-family-sans);
  font-weight: bold;
}
</style>
