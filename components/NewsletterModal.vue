<template>
  <div id="newsletterModal">
    <b-modal
      id="modal-ns"
      class="modal custom"
      centered
      size="md"
      hide-footer
      header-bg-variant="dark"
      body-bg-variant="dark"
    >
      <div class="p-4">
        <b-container class="p-4">
          <b-row class="mb-4" style="margin-top: -70px;">
            <b-col>
              <b-img src="@/assets/img/ModalBlüte.png" width="150xp"></b-img>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col>
              <h5 class="text-center bold-font">{{ $t(title) }}</h5>
              <span class="text-justify">{{ $t(text) }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <NewsletterFooter />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
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
      title: {
        de: 'Verbunden bleiben.', 
        en: 'Stay connected.'
      },
      text: {
        de:
          'Über meinen Newsletter erhalten Sie Informationen über neue Kurse und Seminare.',
        en:
          'You will receive information about new courses and seminars via my newsletter.'
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.$axios.post('https://www.algoinvest.online/mailapi/sendmessage', {
        msg: {
          sender: this.form.email,
          subject: this.form.anliegen,
          text: `Name: ${this.form.name}\n\nMail: ${this.form.email}\n\nAnliegen: \n\n${this.form.text}`
        }
      })
      this.$bvToast.toast(
        'Vielen Dank! Wir werden in Kürze mit Ihnen Kontakt aufnehmen.',
        {
          title: 'Ihre Nachricht wurde gesendet.',
          toaster: 'b-toaster-bottom-center',
          solid: true,
          appendToast: false
        }
      )
      this.$bvModal.hide('modal-ns')
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.anliegen = null
      this.form.text = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
