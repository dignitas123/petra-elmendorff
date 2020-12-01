<template>
  <header class="header">
    <h1 id="petraelmendorff" class="text-center">
      <nuxt-link to="/">{{ title }}</nuxt-link>
    </h1>
    <div id="subHeaderText">
      <img id="chinesSign" src="~/assets/img/chinese_sign_jinshinjyutsu.png" />
      <h2 id="petraelmendorffSub" class="text-center">
        Jin Shin Jyutsu &amp; AstroMatrix
      </h2>
    </div>
    <nav class="navbar navbar-light navbar-expand-md">
      <div class="container-fluid">
        <div
          id="navcol-1"
          class="collapse navbar-collapse justify-content-center show"
        >
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <nuxt-link to="/JinShinJyutsu">Jin Shin Jyutsu</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/AstroMatrix">AstroMatrix</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/KurseAngebote">Kurse-Angebote</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/About">Über</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Petra Elemendorff'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.scss';

.header {
  font-family: var(--font-family-sans) !important;
}

.navbar {
  font-size: var(--font-large-size);
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
  font-size: var(--font-title2-size);
  display: inline-block;
  padding-top: 5px;
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

.nav-item:not(:last-child) {
  border-right: 1px solid var(--color-dark-gray);
}

.nav-item {
  max-width: 190px;
  padding-right: 10px;
  height: 27px;
  padding-left: 10px;
  & a {
    color: var(--color-dark-gray);
    text-decoration: none;
    &:hover {
      transition: text-decoration 0.5s ease;
      // text-shadow: 0 0 1px var(--color-dark-gray);
      text-decoration: underline;
    }
  }
  .nuxt-link-exact-active {
    font-family: var(--font-family-sans-secondary);
    font-weight: bold;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
