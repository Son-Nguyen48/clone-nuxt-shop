<template>
  <client-only>
    <div class="slider py-25px md:pt-[105px] touch-none">
      <vue-agile class="md:hidden lg:hidden" :settings="sliderSettings">
        <div v-for="slide in slides" :key="slide.id">
          <nuxt-link to="/collections/special-event">
            <img :src="slide.src" alt="" />
          </nuxt-link>
        </div>
        <template slot="prevButton"
          ><font-awesome-icon
            :icon="['fas', 'chevron-left']"
            style="color: #000000"
          />
        </template>
        <template slot="nextButton"
          ><font-awesome-icon
            :icon="['fas', 'chevron-right']"
            style="color: #000000"
          />
        </template>
      </vue-agile>

      <vue-agile class="hidden md:block lg:block" :settings="sliderSettings">
        <div v-for="slide in slidesDesktop" :key="slide.id">
          <nuxt-link to="/collections/special-event">
            <img :src="slide.src" alt="" />
          </nuxt-link>
        </div>
        <template slot="prevButton"
          ><font-awesome-icon
            :icon="['fas', 'chevron-left']"
            style="color: #000000"
          />
        </template>
        <template slot="nextButton"
          ><font-awesome-icon
            :icon="['fas', 'chevron-right']"
            style="color: #000000"
          />
        </template>
      </vue-agile>
    </div>
  </client-only>
</template>

<script>
import { VueAgile } from 'vue-agile'

export default {
  components: {
    VueAgile,
  },

  data() {
    return {
      slides: [
        {
          id: 1,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_2_mb.jpg?v=3010',
        },
        {
          id: 2,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_3_mb.jpg?v=3010',
        },
        {
          id: 3,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_4_mb.jpg?v=3010',
        },
        {
          id: 4,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_5_mb.jpg?v=3010',
        },
        {
          id: 5,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_6_mb.jpg?v=3010',
        },
        {
          id: 6,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_7_mb.jpg?v=3010',
        },
        {
          id: 7,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_8_mb.jpg?v=3010',
        },
      ],
      slidesDesktop: [
        {
          id: 1,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_2.jpg?v=3010',
        },
        {
          id: 2,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_3.jpg?v=3010',
        },
        {
          id: 3,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_4.jpg?v=3010',
        },
        {
          id: 4,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_5.jpg?v=3010',
        },
        {
          id: 5,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_6.jpg?v=3010',
        },
        {
          id: 6,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_7.jpg?v=3010',
        },
        {
          id: 7,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/slideshow_8.jpg?v=3010',
        },
      ],

      sliderSettings: {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
      },
    }
  },
}
</script>
