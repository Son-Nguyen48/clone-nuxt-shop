<template>
  <div class="grid grid-cols-2 md:grid-cols-4">
    <div
      v-for="item in supportItems"
      :key="item.id"
      class="text-center pt-[30px] px-2.5 pb-[45px] border-[0.1px] border-[#fafafa]"
    >
      <nuxt-link to="/policy">
        <div>
          <img class="max-w-full mx-auto" :src="item.src" alt="icon" />
        </div>
        <h3
          class="text-[13px] uppercase text-[#383838] font-medium tracking-[0.3px] mt-5 mb-[5px]"
        >
          {{ item.title }}
        </h3>
        <p class="text-[13px] text-[#636363]">{{ item.content }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supportItems: [
        {
          id: 1,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/support_1_ic.png?v=3011',
          title: 'Free delivery',
          content:
            'For orders over 800KVND (applies to products with NO discount)',
        },
        {
          id: 2,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/support_2_ic.png?v=3011',
          title: 'Warranty Policy',
          content: 'Free remedial support if eligible',
        },
        {
          id: 3,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/support_3_ic.png?v=3011',
          title: 'Refund Policy',
          content: 'Exchange when eligible',
        },
        {
          id: 4,
          src: 'https://theme.hstatic.net/1000376021/1000834008/14/support_4_ic.png?v=3011',
          title: 'Hotline Hệ Thống Cửa Hàng',
          content: '0902779414',
        },
      ],
    }
  },
}
</script>

<style></style>
