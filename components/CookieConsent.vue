<template>
  <transition>
    <div v-if="show" class="cookie-consent" role="dialog">
      <span class="cookie-consent-message">
        {{ $t(cookie_text) }}
      </span>
      <div class="buttons text-center mt-3">
        <a :href="$t(policy_link_slug)">
          <input class="btn btn-secondary" spellcheck="false" :value="$t(policy_link_text)"
        /></a>
        <a class="ml-5" @click="dismiss">
          <input class="btn btn-secondary" spellcheck="false" :value="$t(cookie_accept_text)"
        /></a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
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
  methods: {
    dismiss: function() {
      this.$cookies.set('cookie-cookie', true, {
        maxAge: 60 * 60 * 24 * 7 * 4 // 1 month
      })
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
.buttons {
  @media (max-width: 603px) {
    a {
      input {
        font-size: 2.5vw;
      }
    }
  }
}

.cookie-consent-message {
  @media (max-width: 603px) {
    font-size: 3vw;
  }
}

.cookie-consent {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgb(214 201 201);
  width: 100%;
  padding: 20px;
  text-align: center;
}
</style>
