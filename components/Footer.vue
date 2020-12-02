<template>
  <footer class="footer">
    <b-container>
      <b-row>
        <b-col>
          <h3>Kontakt</h3>
          <ul>
            <li>Petra Elmendorff</li>
            <li>Ekkeberstr. 8 | D-79117 Freiburg</li>
            <li>
              <a href="mailto:elmendorff.jsj@gmail.com"
                >elmendorff.jsj@gmail.com</a
              >
            </li>
          </ul></b-col
        >
        <b-col>
          <h3>Social Media</h3>
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'youtube-square']"
          />
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'facebook-square']"
          />
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
    <div class="text-center mt-40">
      <h2 class="divider-style"></h2>
    </div>
    <p class="copyright">
      <span class="copyright-text">© {{ year }} Petra Elemendorff</span>
      <span class="copyright-text"
        ><nuxt-link to="/">Impressum</nuxt-link></span
      >
      <span class="copyright-text"
        ><nuxt-link to="/">Datenschutz</nuxt-link></span
      >
      <span class="copyright-text"><nuxt-link to="/">Links</nuxt-link></span>
    </p>
  </footer>
</template>

<script>
import NewsletterFooter from './NewsletterFooter.vue'

export default {
  components: {
    NewsletterFooter
  },
  data: data => {
    if (!data.$store.state) {
      return
    }
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-properties.css';

.social-media-icon {
  font-size: var(--font-title2-size);
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
  .footer .item:not(.social) {
    text-align: center;
    padding-bottom: 20px;
  }
}

@media (max-width: 767px) {
  .footer .item.text {
    margin-bottom: 0;
  }
}

@media (max-width: 991px) {
  .footer .item.social {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
