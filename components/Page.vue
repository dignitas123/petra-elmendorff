<template>
  <div>
    <header
      class="header-content container"
      :style="imageTitle.asset ? '' : 'margin-top: 150px;'"
    >
      <div class="position-relative">
        <SanityImage
          v-if="imageTitle.asset"
          :image="imageTitle"
          :width="1614"
          :height="516"
          class="mainImage"
        />
        <div
          class="quote-block quote-block-desktop position-absolute medium-font letter-spacing-0 text-center mb-3 py-3"
          style="letter-spacing: 0.1px;"
        >
          <block-content
            v-if="$t(imageTitle.zitat)"
            :blocks="$t(imageTitle.zitat)"
            :serializers="serializers"
            projectId="ie6m0uwl"
            dataset="production"
            class="quote px-3 my-1"
          />
        </div>
      </div>
      <hr class="image-sep" style="margin-top: 5px; margin-bottom: 7px;" />
      <b-breadcrumb
        v-if="
          $route.params.page == 'jiro-murai' ||
            $route.params.page == 'mary-burmeister'
        "
        :items="items"
        class="text-center"
      ></b-breadcrumb>
      <div
        class="quote-block quote-block-mobile medium-font letter-spacing-0 text-center px-3"
        style="letter-spacing: 0.1px;"
      >
        <block-content
          v-if="$t(imageTitle.zitat)"
          :blocks="$t(imageTitle.zitat)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
          class="quote px-3 my-1"
        />
      </div>
    </header>
    <div class="page-content">
      <h3 v-if="heading" class="medium-font mt-5 heading-main">
        {{ $t(heading) }}
      </h3>
      <div class="content">
        <div class="sessionContent medium-font letter-spacing-less mb-3 pb-5">
          <h3
            v-if="heading"
            class="medium-font heading-main-mobile"
            style="color: #d4cac7;"
          >
            {{ $t(heading) }}
          </h3>
          <div class="kalender-link pb-3">
            <nuxt-link :to="$t(angebote)">
              <h4
                class="kalender medium-font color-dark-grey float-right mb-0 p-1"
              >
                {{ $t(kalender)
                }}<span class="plus-calendar d-block ml-1 float-right"
                  ><Plus width="13"
                /></span>
              </h4>
            </nuxt-link>
          </div>
          <SanityImage
            v-if="image"
            :image="image"
            :zitat="$t(image.zitat)"
            :width="150"
            :height="150"
            :author="image.zitatsource"
            class="mainImage2"
            :class="
              $route.params.page == 'jin-shin-jyutsu'
                ? 'mainImageJinAdaption'
                : ''
            "
          />
          <BlockContent
            :v-if="$t(content)"
            :blocks="$t(content)"
            :serializers="serializers"
            projectId="ie6m0uwl"
            dataset="production"
          />
          <div class="text-center">
            <figure v-if="imageUnderText1" class="imageUnderText">
              <figcaption
                class="medium-font"
                style="color: #d4cac7; font-size: 1.5rem; width: max-content; padding-left: 0; padding-right: 0; margin: 0 auto;"
              >
                {{ imageUnderText1.imgHeading }}
              </figcaption>
              <nuxt-link :to="imageUnderText1.linkToSlug"
                ><SanityImage
                  :image="imageUnderText1"
                  :width="100"
                  :height="100"
                  class="golden-border imageUnderTextLinks"
                />
              </nuxt-link>
            </figure>
            <figure v-if="imageUnderText2" class="imageUnderText">
              <figcaption
                class="medium-font"
                style="color: #d4cac7; font-size: 1.5rem; width: max-content; padding-left: 0; padding-right: 0; margin: 0 auto;"
              >
                {{ imageUnderText2.imgHeading }}
              </figcaption>
              <nuxt-link :to="imageUnderText2.linkToSlug">
                <SanityImage
                  :image="imageUnderText2"
                  :width="100"
                  :height="100"
                  class="golden-border imageUnderTextLinks"
                />
              </nuxt-link>
            </figure>
          </div>
          <div class="kalendar-link">
            <nuxt-link :to="$t(angebote)">
              <h4 class="kalender medium-font color-yellow-golden float-right">
                {{ $t(kalender) }}
              </h4>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import Plus from '~/components/icons/Plus'

export default {
  props: {
    title: {
      type: Object,
      default: () => {}
    },
    content: {
      type: Object,
      default: () => {}
    },
    imageTitle: {
      default: false
    },
    imageUnderText1: {
      default: false
    },
    imageUnderText2: {
      default: false
    },
    image: {
      default: false
    },
    heading: {
      default: false
    }
  },
  components: {
    BlockContent,
    Plus
  },
  data() {
    return {
      serializers: {
        types: {}
      },
      slug: {},
      angebote: {
        de: 'kurse-angebote',
        en: 'courses-offers'
      },
      kalender: {
        de: 'Kalender',
        en: 'Calendar'
      }
    }
  },
  computed: {
    items: function() {
      return [
        {
          text: 'Jin Shin Jyutsu',
          href: '/jin-shin-jyutsu'
        },
        {
          text: this.$route.params.page,
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

ul {
  list-style: none;
  text-align: center;
  padding-left: 0;
}

.imageUnderText {
  width: 200px;
  display: inline-block;
  margin: 0;
}

.kalender-link {
  position: absolute;
  right: 50px;
  top: 200px;
  display: none;
}

.page-content {
  max-width: 840px;
  margin: 0 auto;
}

.sessionContent {
  font-size: 1.25rem;
  color: #717174;
  position: relative;
  background: #f8f6f6;
  padding-right: 5%;
  padding-top: 5%;
  padding-left: 15%;
  padding-bottom: 5%;
}

.mainImage {
  width: 100%;
  vertical-align: top;
}

.mainImage2 {
  border: 1px solid #e3c85d;
  position: absolute;
  left: -11%;
  top: 25%;
}

.heading-main {
  color: #d4cac7;
  font-size: 3rem;
  transform: translateX(25%);
}

@media (max-width: 978px) {
  .sessionContent {
    padding-left: 5%;
  }
  .page-content {
    margin-top: -50px;
  }
}

.heading-main-mobile {
  display: none;
}

@media (max-width: 542px) {
  .heading-main {
    font-size: 2rem;
  }
}

@media (max-width: 668px) {
  .imageUnderTextLinks {
    width: 70px;
  }
  .imageUnderText {
    figcaption {
      font-size: 1.2rem !important;
    }
  }
  .imageUnderText {
    width: 170px;
  }
}

@media (max-width: 485px) {
  .imageUnderTextLinks {
    width: 120px !important;
  }
  .imageUnderText {
    margin-left: 20px;
    margin-right: 20px;
    figcaption {
      font-size: 1.25rem !important;
    }
  }
  .imageUnderText {
    width: 120px;
  }
}

.mainImageJinAdaption {
  border: 1px solid #e2ce8a;
}

@media (max-width: 978px) {
  .mainImage2 {
    position: relative;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    border: 3px solid #e3c85d;
    margin-bottom: 30px;
  }
  .mainImageJinAdaption {
    border: 1px solid #e2ce8a;
  }
  .heading-main {
    display: none;
  }
  .heading-main-mobile {
    display: block;
    text-align: center;
    font-size: 2rem;
  }
  .sessionContent {
    font-family: var(--font-family-sans-thin);
    font-size: 1.5rem;
    color: #717174;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    text-align: justify;
    text-justify: distribute;
  }
  .content {
    margin: 70px 20px 0px 20px !important;
  }
  .kalender-link {
    display: block;
  }
  .kalendar-link {
    display: none;
  }
}

h1,
figure {
  text-align: center;
}

.content {
  margin: 30px 20px 0px 20px;
}

@media (max-width: 657px) {
  .sessionContent {
    font-size: 1.2rem;
  }
  figure > img {
    width: 100%;
  }
  .content {
    margin-left: 15px;
    margin-right: 15px;
  }
}

.image-container {
  position: relative;
  width: 50%;
}

.text {
  color: var(--color-dark-gray);
  font-size: var(--font-title2-size);
}

.image-container:hover .grid-image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}

.quote-block {
  color: #5f4142;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  p {
    margin: 0;
  }
}

.quote-block-desktop {
  background: rgba(255, 255, 255, 0.7);
  padding-right: 20%;
  padding-left: 20%;
}

.kalender {
  font-size: 27px;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  width: 300px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.color-dark-grey {
  color: var(--color-dark-gray);
}

.color-grey {
  color: var(--color-gray);
}

.color-golden-2 {
  color: var(--color-golden-2);
}

.max-width-div {
  max-width: 50%;
  margin: 0 auto;
}

.grid-row {
  margin: 0 auto;
}

.grid-image {
  opacity: 1;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.fixed-width-wide {
  width: 500px !important;
}

.locale-to-course {
  margin-top: -8px;
}

.container2 {
  background: white;
}

.image-sep {
  border: 0;
  height: 4px;
  background: #dacf3d;
}

.container {
  padding-top: 1.75rem;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.header-content {
  text-align: center;
  width: 100%;
  margin-top: 55px;
}

.content {
  background: #f3efee;
}

.plus-calendar svg {
  margin-bottom: 5px;
}

.max-width-container {
  max-width: 950px;
}

.title + p + .dates {
  margin-bottom: 0;
  font-weight: 600;
}

.max-width-row {
  max-width: 100px;
}

.title + p + .dates + .venue {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  margin-bottom: 5rem;
}

figure {
  margin: 0 0 3em;
}

figcaption {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  padding: 0.25rem 1.5rem;
}

.mainImage {
  width: 100%;
  vertical-align: top;
}

.kalendar-link {
  right: 5%;
  bottom: 5%;
}

.sessionListTitle {
  text-align: center;
  font-weight: 600;
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  margin: 0 0 3rem;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.sessionListContainer {
  max-width: var(--width-small);
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.text-dec-none:hover {
  text-decoration: none;
}

.grid-image-caption {
  display: none;
  color: #ada2a1;
  font-size: 45px !important;
}

.quote-block > p {
  font-size: 35px;
}

.image-container a:hover {
  text-decoration: none;
}

.kalendar-link,
.quote-block {
  letter-spacing: -1px;
}

.quote-block > p {
  font-size: 27px;
}

.max-width-div {
  max-width: 100%;
}

.text-responsive {
  text-align: center;
}

.image-sep {
  margin-top: 12px !important;
  height: 8px;
}

.locale-col {
  min-width: 200px;
}

.quote-block-mobile {
  display: none;
}

.imageUnderTextLinks {
  width: 150px;
}

@media (max-width: 1203px) {
  .quote-block-mobile {
    display: block;
  }
  .quote-block-desktop {
    display: none;
  }
  .text-responsive {
    text-align: left;
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .kalender {
    font-size: 22px;
  }
}

@media (max-width: 1495px) {
  .quote-block-desktop {
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media (max-width: 993px) {
  .image-sep {
    margin-top: 5px !important;
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 0;
  }
}

@media (max-width: 972px) {
  .quote {
    font-size: 20px;
  }
  .quote-block > p {
    font-size: 21px;
  }
}

@media (max-width: 766px) {
  .image-sep {
    height: 3.5px;
  }
  .grid-image {
    width: 100%;
  }
  .grid-image-caption {
    display: block;
    font-size: 39px;
  }
  .header-content {
    margin-top: 0;
  }
  .quote-block > p {
    font-size: 16px;
  }
  .max-width-container {
    max-width: 50%;
  }
}

@media (max-width: 667px) {
  .grid-image-caption {
    font-size: 30px !important;
  }
}

@media (max-width: 620px) {
  .quote {
    font-size: 12px;
  }
  .quote-block > p {
    font-size: 15px;
  }
}

@media (max-width: 472px) {
  .grid-image-caption {
    font-size: 22px !important;
  }
  .quote {
    font-size: 12px;
  }
  .container {
    padding-left: 7px;
    padding-right: 7px;
  }
  .quote-block > p {
    font-size: 15px;
  }
}

@media (max-width: 522px) {
  .kalender-link {
    right: 5px;
  }
  .sessionContent {
    padding-right: 10%;
    padding-left: 10%;
  }
}

@media (max-width: 415px) {
  .mainImage2 {
    width: 100px;
  }
  .kalender-link {
    top: 150px;
  }
  .sessionContent {
    padding-right: 6%;
    padding-left: 6%;
  }
}

@media (max-width: 452px) {
  .quote-block > p {
    font-size: 12px;
  }
  .quote-block > p {
    font-size: 14px;
  }
}

@media (max-width: 393px) {
  .quote-block > p {
    font-size: 12px;
  }
  .grid-image-caption {
    font-size: 20px !important;
  }
}
@media (max-width: 349px) {
  .quote-block > p {
    font-size: 11px;
  }
  .grid-image-caption {
    font-size: 20px !important;
  }
}

@media (max-width: 360px) {
  .grid-image-caption {
    font-size: 18px !important;
  }
  .kalender {
    font-size: 14px;
  }
}
</style>
