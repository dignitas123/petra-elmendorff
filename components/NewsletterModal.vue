<template>
  <div id="newsletterModal">
    <!-- <b-modal
      id="modal-ns"
      class="modal custom"
      centered
      size="md"
      hide-footer
      header-bg-variant="dark"
      @hide="$nuxt.$emit('newsletter-closed')"
    >
      <div class="p-4" style="background: #ddd4d2;">
        <b-container class="p-4">
          <b-container class="images-mod-mobile">
            <b-row>
              <b-col class="pl-0 pr-0">
                <b-img
                  src="@/assets/img/haende.png"
                  width="100px"
                  class="mb-2 mobile-img golden-border"
                ></b-img>
              </b-col>
              <b-col class="pl-0 pr-0">
                <b-img
                  src="@/assets/img/astrokreise.png"
                  width="100px"
                  class="mb-2 mobile-img golden-border"
                ></b-img>
              </b-col>
              <b-col class="pl-0 pr-0">
                <b-img
                  src="@/assets/img/derbuddha.png"
                  width="100px"
                  class="mb-2 mobile-img"
                ></b-img>
              </b-col>
            </b-row>
          </b-container>
          <b-row class="mb-4" style="margin-top: -70px;">
            <b-col class="images-mod">
              <b-row
                ><b-col>
                  <b-img
                    src="@/assets/img/haende.png"
                    width="100xp"
                    class="mb-2"
                  ></b-img> </b-col
              ></b-row>
              <b-row
                ><b-col>
                  <b-img
                    src="@/assets/img/astrokreise.png"
                    width="100xp"
                    class="mb-2"
                  ></b-img> </b-col
              ></b-row>
              <b-row
                ><b-col>
                  <b-img
                    src="@/assets/img/derbuddha.png"
                    width="100xp"
                    class="mb-2"
                  ></b-img> </b-col
              ></b-row>
            </b-col>
            <b-col>
              <b-row class="mb-3 pb-4">
                <b-col>
                  <h5
                    class="text-center medium-font newsletter-heading"
                    style="font-size: 3rem; color: #5f4142;"
                  >
                    Newsletter
                  </h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <NewsletterFooter
                    inputColor="#e3d259"
                    textAlignPadding="true"
                  />
                </b-col>
              </b-row>
              <b-row class="mb-3">
                <b-col
                  class="text-center medium-font mt-3"
                  style="line-height: 1rem; font-size: 0.75rem; position: absolute;"
                >
                  <span class="text-justify">{{ $t(text) }}</span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import NewsletterFooter from './NewsletterFooter.vue'

export default {
  components: {
    NewsletterFooter
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: {
        de:
          'Deine Daten werden ausschließlich zum Zweck des Newsletterversandes gespeichert und verwendet.',
        en:
          'Your data will be managed and used for the purpose of sending the newsletter.'
      },
      form: {
        email: '',
        name: '',
        anliegen: null
        // checked: [],
      },
      anliegenAuswahl: [
        { text: 'Auswählen', value: null },
        'Webseite',
        'Mobile App entwickeln',
        'Desktopanwendung erstellen',
        'Modernisierung',
        'E-Commerce',
        'Social Media',
        'Anderes'
      ],
      show: true
    }
  },
  created() {
    this.$nuxt.$on('newsletter-subscribed', () => {
      this.$cookies.set('newsletter-cookie', true, {
        maxAge: 60 * 60 * 24 * 7 * 4 * 3 // 3 month
      })
    })
    this.$nuxt.$on('newsletter-closed', () => {
      this.$cookies.set('newsletter-cookie', true, {
        maxAge: 60 * 60 * 24 // 1 day
      })
    })
  }
}
</script>

<style scoped lang="scss">
.images-mod {
  position: absolute;
  left: -20%;
}
.images-mod-mobile {
  display: none;
  position: absolute;
  top: -35%;
  padding-left: 0;
  margin-left: 0;
  margin-right: 0;
}
@media (max-width: 571px) {
  .images-mod {
    display: none;
  }
  .images-mod-mobile {
    display: block;
  }
  .newsletter-heading {
    padding-top: 30px;
  }
}
@media (max-width: 531px) {
  .mobile-img {
    width: 80px;
  }
  .images-mod-mobile {
    top: -30%;
  }
}
@media (max-width: 476px) {
  .mobile-img {
    width: 60px;
  }
  .images-mod-mobile {
    top: -25%;
  }
}
@media (max-width: 398px) {
  .images-mod-mobile {
    margin-left: -20px;
  }
}
</style>
