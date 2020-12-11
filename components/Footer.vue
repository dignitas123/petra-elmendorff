<template>
  <footer class="footer">
    <b-container>
      <b-row>
        <b-col>
          <h3>Kontakt</h3>
          <!-- <p>{{ block.children[0] }}</p> -->
          <PortableText :blocks="blocks" />
          <!-- <SanityContent :blocks="block.children[0]" /> -->
          <!-- <DivBlockContent v-for="block in blocks" :key="block._id" /> -->
        </b-col>
        <b-col>
          <h3 id="socialMediaText">Social Media</h3>
          <div class="pl-5 social-media-buttons">
            <font-awesome-icon
              class="social-media-icon"
              :icon="['fab', 'youtube-square']"
            />
            <font-awesome-icon
              class="social-media-icon"
              :icon="['fab', 'facebook-square']"
            />
          </div>
        </b-col>
        <b-col>
          <h3>Newsletter</h3>
          <ul>
            <li></li>
          </ul>
          <NewsletterFooter
        /></b-col>
      </b-row>
    </b-container>
    <div class="mt-3">
      <h2 class="divider-style"></h2>
    </div>
    <p class="copyright">
      <span class="copyright-text">© {{ year }} Petra Elemendorff</span>
      <span v-for="(link, i) in footermenue" :key="i" class="copyright-text">
        <nuxt-link :to="'/' + link.slug[selLanguage].current">{{
          link.title[selLanguage]
        }}</nuxt-link>
      </span>
    </p>
  </footer>
</template>

<script>
import NewsletterFooter from './NewsletterFooter.vue'
import PortableText from 'sanity-blocks-vue-component'

export default {
  components: {
    NewsletterFooter,
    PortableText
  },
  props: {
    language: {
      type: String,
      default: 'DE'
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      footermenue: this.$store.state.siteSettings.footermenue,
      selLanguage: this.$store.state.language
    }
  },
  computed: {
    blocks: function() {
      return this.$store.state.siteSettings.footerAddress
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.css';

.social-media-icon {
  width: 30px;
}

.item {
  .text {
    margin-bottom: 0px;
  }
  .social {
    margin-top: 15px;
  }
}

.divider-style {
  margin-top: 70px;
  position: relative;
  margin-right: 40px;
  margin-left: 40px;
  max-width: 1140px;
  @media (max-width: 1199px) {
    max-width: 950px;
  }
  @media (max-width: 991px) {
    max-width: 730px;
  }
  @media (max-width: 769px) {
    max-width: 95%;
  }
  left: 0;
  right: 0;
  margin: auto;
  span {
    background: #fff;
    padding: 0 20px;
    position: relative;
    z-index: 5;
  }
  &::before {
    content: '';
    display: block;
    border-top: solid 2px var(--color-dark-gray);
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
}

.footer {
  padding: 50px 0;
  color: var(--color-dark-gray);
  background-color: var(--color-background);
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
  }
  ul {
    padding: 0;
    list-style: none;
    line-height: 1.6;
    margin-bottom: 0;
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .item.text p {
    opacity: 0.6;
    margin-bottom: 0;
  }
  .item.text {
    margin-bottom: 36px;
  }
  .item.social {
    text-align: center;
    a {
      font-size: 20px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
      margin: 0 8px;
      color: #fff;
      opacity: 0.75;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .copyright {
    text-align: center;
    padding-top: 24px;
    margin-bottom: 0;
    a {
      color: var(--color-dark-gray);
    }
  }
}

.copyright-text {
  padding-right: 10px;
  padding-left: 10px;
  &:not(:last-child) {
    border-right: 1px solid var(--color-dark-gray);
  }
}

@media (max-width: 767px) {
  .social-media-buttons {
    padding-left: 0 !important;
  }
  .footer {
    padding-top: 20px;
    .container {
      padding-left: 5px;
      padding-right: 5px;
      max-width: 640px;
    }
    #socialMediaText {
      display: none;
    }
  }
}

@media (max-width: 657px) {
  div.col:nth-child(2) {
    max-width: 100px;
  }
}

@media (max-width: 509px) {
  div.col:nth-child(3) {
    margin-top: 30px;
  }
  .copyright-text {
    display: block ruby;
  }
}
</style>
