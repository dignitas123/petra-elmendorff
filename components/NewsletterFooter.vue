<template>
  <div>
    <div id="form-224136-wrapper">
      {{ $t(comingsoon) }}
      <!-- <form
        id="ktv2-form-224136"
        accept-charset="UTF-8"
        method="post"
        action="https://app.klicktipp.com/api/subscriber/signin.html"
      >
        <input
          id="FormField_ApiKey"
          type="hidden"
          name="apikey"
          value="57xvz1un2z8z964c"
        /><input
          id="FormField_Digit"
          type="hidden"
          name="fields[fieldDigit]"
          value=""
        />
        <div class="ktv2-form-element">
          <input
            id="FormField_FirstName"
            type="text"
            name="fields[fieldFirstName]"
            value=""
            :class="textAlignPadding ? 'py-4 text-center' : ''"
            :placeholder="$t(name)"
          />
        </div>
        <div class="ktv2-form-element">
          <input
            id="FormField_EmailAddress"
            type="text"
            name="email"
            value=""
            size="40"
            :class="textAlignPadding ? 'py-4 text-center' : ''"
            :placeholder="$t(email)"
          />
        </div>
        <div>
          <input
            id="FormSubmit"
            class="btn btn-secondary"
            type="submit"
            name="FormSubmit"
            :value="$t(submitText)"
            @click="$nuxt.$emit('newsletter-subscribed')"
            :style="`background: ${inputColor}; font-size: 1.5rem; padding-top: 5px;`"
          />
        </div>
      </form> -->
    </div>
    <script
      type="text/javascript"
      src="https://klicktipp.s3.amazonaws.com/listbuildings/system/forms/scripts/protect.js"
    ></script>
  </div>
</template>

<script>
export default {
  props: {
    inputColor: {
      default: '#5f4142'
    },
    textAlignPadding: {
      default: false
    }
  },
  data() {
    return {
      name: {
        de: 'Dein Name',
        en: 'Your Name'
      },
      email: {
        de: 'Deine Emailadresse',
        en: 'Your Emailaddress'
      },
      submitText: {
        de: 'Jetzt anmelden.',
        en: 'Subscribe now.'
      },
      comingsoon: {
        de: 'Kommt bald...',
        en: 'Coming soon...'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

@mixin form-style {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  font-family: var(--font-family-sans);
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: white;
  opacity: 1;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: white;
  opacity: 1;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: white;
  opacity: 1;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: white;
  opacity: 1;
}

.ktv2-form-element {
  input {
    @include form-style;
    border: 2px solid white;
    background: transparent;
    padding-left: 4px;
    color: var(--color-dark-gray);
    &:focus {
      border: 2px solid var(--color-dark-gray);
      caret-color: var(--color-dark-gray);
      color: var(--color-dark-gray);
      &::placeholder {
        color: transparent;
      }
    }
  }
}

input[type='submit'] {
  @include form-style;
  border-radius: 0;
  border: none;
  &:hover {
    color: var(--color-dark-gray) !important;
    background: transparent !important;
    border: 2px solid white !important;
    padding-top: 5px !important;
  }
}

input::-webkit-input-placeholder {
  color: var(--color-dark-gray);
  font-size: 18px;
  transform: translateY(2px);
}

input::-ms-input-placeholder {
  color: var(--color-dark-gray);
  font-size: 18px;
  transform: translateY(2px);
}

input::-moz-placeholder {
  color: var(--color-dark-gray);
  font-size: 18px;
  transform: translateY(2px);
}
</style>
