<template>
  <v-sheet>
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-primary"
      mandatory
    >
      <v-slide-item v-for="slide in slides" :key="slide.id">
        <v-card class="pr-3">
          <nuxt-link :to="`${slide.link}`">
            <div>
              <img class="h-[200px]" :src="slide.src" alt="img" />
            </div>
          </nuxt-link>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      slides: [
        {
          id: 1,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_1.jpg?v=3277',
          link: '/collections/geox',
        },
        {
          id: 2,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_2.jpg?v=3277',
          link: '/collections/native',
        },
        {
          id: 3,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_3.jpg?v=3277',
          link: '/collections/camela',
        },
        {
          id: 4,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_4.jpg?v=3277',
          link: '/collections/toms',
        },
        {
          id: 5,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_5.jpg?v=3277',
          link: '/collections/xti',
        },
        {
          id: 6,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_6.jpg?v=3277',
          link: '/collections/adidas',
        },
        {
          id: 7,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_7.jpg?v=3277',
          link: '/collections/nike',
        },
        {
          id: 8,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_8.jpg?v=3277',
          link: '/collections/heydude',
        },
        {
          id: 9,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_9.jpg?v=3277',
          link: '/collections/holster',
        },
        {
          id: 10,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_10.jpg?v=3277',
          link: '/collections/sledgers',
        },
        {
          id: 11,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_11.jpg?v=3277',
          link: '/collections/rollink',
        },
        {
          id: 12,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_12.jpg?v=3277',
          link: '/collections/vionic',
        },
        {
          id: 13,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_13.jpg?v=3277',
          link: '/collections/artemys',
        },
        {
          id: 14,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_14.jpg?v=3277',
          link: '/collections/xox',
        },
        {
          id: 15,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_15.jpg?v=3277',
          link: '/collections/shucare',
        },
        {
          id: 16,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/logo_image_16.jpg?v=3277',
          link: '/collections/flossy',
        },
      ],
    }
  },
}
</script>

<style></style>
