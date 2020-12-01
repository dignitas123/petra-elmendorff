<template>
  <header class="header">
    <h1 id="petraelmendorff" class="text-center">
      {{ title }}
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
              <nuxt-link to="/">Jin Shin Jyutsu</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/">AstroMatrix</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/">Kurse-Angebote</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/">Über</nuxt-link>
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
@import '../styles/custom-properties.css';

.header {
  font-family: var(--font-family-sans);
}

#petraelmendorff {
  font-size: 40px;
  font-weight: bold;
  color: var(--color-gray);
  margin: 19px 0 10px 0;
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

#navcol-1 {
  height: 20px;
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
  padding-right: 5px;
  height: 25px;
  padding-left: 5px;
  & a {
    color: var(--color-dark-gray);
    text-decoration: none;
    &:hover {
      transition: text-shadow 0.5s ease;
      text-shadow: 0 0 1px var(--color-dark-gray);
    }
  }
}

.active-link {
  font-weight: bold;
}
</style>
