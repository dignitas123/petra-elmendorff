<template>
  <div>
    <newsletter-modal ref="newsletterpopup" />
    <navbar />
    <nuxt />
    <Footer />
    <scroll-to-top-arrow />
    <div class="gap"></div>
    <cookie-consent
      :message="cookie_text"
      :acceptanceLabel="cookie_accept_text"
      :privacyLinkLabel="policy_link_text"
      :privacySlug="policy_link_slug"
      :show="cookieShow"
    />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  components: {
    Footer
  },
  data() {
    return {
      cookieShow: false,
      cookie_text: {
        de:
          'Diese Website verwendet Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website erhalten. Mit der Nutzung disere Webseite stimmen Sie unseren Datenschutzrechlinien zu.',
        en:
          'This website uses cookies to ensure you get the best experience on our website. With the use of this website you agree with our privacy policy.'
      },
      cookie_accept_text: {
        de: 'Einverstanden',
        en: 'Accept'
      },
      policy_link_text: {
        de: 'Datenschutzerklärung',
        en: 'Privacy Policy'
      },
      policy_link_slug: {
        de: '/datenschutz',
        en: '/privacy-policy'
      }
    }
  },
  computed: {
    title: function() {
      return this.$store.state.siteSettings.title
    },
    language: function() {
      return this.$store.state.language
    }
  },
  mounted() {
    let cooky = this.$cookies.get('cookie-cookie')
    // console.log('cookie-cookie:', cooky)
    if (!cooky) {
      this.cookieShow = true
    }
    this.$refs.newsletterpopup.$bvModal.show('modal-ns')
  }
}
</script>

<style lang="scss">
@import '~/styles/custom-properties';
@import '~/styles/custom-media';

.gap {
  height: 15px;
}

html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
  letter-spacing: 0.03rem;
  margin-top: 1.25rem;
  max-width: 1614px;
  margin-right: auto;
  margin-left: auto;
  @media (--media-max-mid-small) {
    margin-top: 0.45rem;
  }
}

.title {
  font-weight: 600;
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  margin-bottom: 0.25rem;
  padding-bottom: 0;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.container {
  padding-right: 40px;
  padding-left: 40px;
}

.title + p {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);
  margin-top: 0;
  margin-bottom: 4rem;

  @media (--media-min-medium) {
    font-size: var(--font-title3-size);
    line-height: var(--font-title3-line-height);
  }
}
</style>
