<template>
  <footer class="footer mb-4">
    <client-only>
      <b-container class="footer-container">
        <b-row class="align-items-center">
          <b-col>
            <div class="social-media-buttons align-items-center text-center">
              <a :href="youtubeLink">
                <YouTubeCornered />
              </a>
              <a :href="facebookLink">
                <FacebookCornered />
              </a>
              <a :href="`mailto:${emailAddress}`">
                <Email />
              </a>
            </div>
          </b-col>
          <b-col style="max-width: 300px;">
            <h3>Newsletter</h3>
            <ul>
              <li></li>
            </ul>
            <NewsletterFooter
          /></b-col>
        </b-row>
      </b-container>
    </client-only>
    <div class="mt-3">
      <h2 class="divider-style"></h2>
    </div>
    <div class="copyright">
      <!-- <span class="copyright-text"> Petra Elemendorff</span> -->
      <span v-for="(link, i) in footermenue" :key="i" class="copyright-text">
        <nuxt-link :to="'/' + $t(link.slug).current">{{
          $t(link.title)
        }}</nuxt-link>
      </span>
    </div>
  </footer>
</template>

<script>
import NewsletterFooter from './NewsletterFooter.vue'
import PortableText from 'sanity-blocks-vue-component'
import YouTubeCornered from './icons/YouTubeCornered.vue'
import FacebookCornered from './icons/FacebookCornered.vue'
import Email from './icons/Email.vue'

export default {
  components: {
    NewsletterFooter,
    PortableText,
    YouTubeCornered,
    FacebookCornered,
    Email
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
      selLanguage: this.$store.state.language,
      youtubeLink: this.$store.state.siteSettings.youtube,
      facebookLink: this.$store.state.siteSettings.facebook,
      emailAddress: this.$store.state.siteSettings.email
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.social-media-icon {
  width: 37px;
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
    border-top: solid 2px var(--color-golden);
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
}

.footer {
  padding: 15px 100px;
  color: var(--color-dark-gray);
  background-color: var(--color-background);
  margin-right: 40px;
  margin-left: 40px;
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
  .footer-container {
    max-width: 1140px;
  }
}

.copyright-text {
  padding-right: 10px;
  padding-left: 10px;
  &:not(:last-child) {
    border-right: 1px solid var(--color-dark-gray);
  }
}

@media (max-width: 472px) {
  .footer {
    margin-left: 7px !important;
    margin-right: 7px !important;
  }
}

@media (max-width: 1203px) {
  .footer {
    margin-left: 15px;
    margin-right: 15px;
  }
}

@media (max-width: 767px) {
  .social-media-buttons {
    padding-left: 0 !important;
  }
  .footer {
    padding: 15px 0;
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

svg:hover {
  color: white;
}
</style>
