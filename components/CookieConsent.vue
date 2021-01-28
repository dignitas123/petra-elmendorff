<template>
  <transition>
    <div v-if="show" class="cookie-consent" role="dialog">
      <span class="cookie-consent-message">
        {{ $t(message) }}
      </span>
      <div class="buttons text-center mt-3">
        <a :href="$t(privacySlug)">
          <input class="btn btn-secondary" :value="$t(privacyLinkLabel)"
        /></a>
        <a class="ml-5" @click="dismiss">
          <input class="btn btn-secondary" :value="$t(acceptanceLabel)"
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
    },
    message: {
      type: Object,
      default: () => {}
    },
    privacySlug: {
      type: Object,
      default: () => {}
    },
    acceptanceLabel: {
      type: Object,
      default: () => {}
    },
    privacyLinkLabel: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    dismiss: function() {
      this.show = false
      this.$cookies.set('cookie-cookie', true, {
        maxAge: 60 * 60 * 24 * 7 * 4 // 1 month
      })
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
  background: rgba(238, 238, 239, 0.86);
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.btn {
  border-radius: 0;
  max-height: 30px;
  &:active,
  &:active,
  &:focus {
    text-decoration: none;
    border: none;
  }
}
</style>
