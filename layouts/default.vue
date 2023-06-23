<template>
  <v-app>
    <main-header></main-header>
    <search-bar class="pt-28 md:hidden lg:hidden"></search-bar>
    <side-menu></side-menu>
    <Nuxt />
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import SideMenu from '~/components/Side-menu/SideMenu.vue'
import MainHeader from '~/components/Main-header/MainHeader.vue'
import SearchBar from '~/components/Main-header/SearchBar.vue'
import TheFooter from '~/components/The-footer/TheFooter.vue'

export default {
  components: {
    MainHeader,
    SearchBar,
    TheFooter,
    SideMenu,
  },
}
</script>

<style>
.agile__dot {
  padding: 2px;
}

.agile__dot.agile__dot--current button {
  background-color: black;
}

.agile__dot button {
  height: 12px;
  width: 12px;
  background-color: #8b8b8b;
  border-radius: 50%;
}

.agile__actions {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
}

button.agile__nav-button.agile__nav-button--prev,
button.agile__nav-button.agile__nav-button--next {
  position: absolute;
  top: -95px;
}

@media screen and (max-width: 425px) {
  button.agile__nav-button.agile__nav-button--prev {
    font-size: 32px;
    left: -70px;
  }

  button.agile__nav-button.agile__nav-button--next {
    font-size: 32px;
    right: -70px;
  }

  .agile__dot button {
    height: 12px;
    width: 12px;
    background-color: #8b8b8b;
    border-radius: 50%;
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  button.agile__nav-button.agile__nav-button--prev {
    font-size: 32px;
    left: -250px;
    top: -140px;
  }

  button.agile__nav-button.agile__nav-button--next {
    font-size: 32px;
    right: -250px;
    top: -140px;
  }

  .agile__dot button {
    height: 24px;
    width: 24px;
    background-color: #8b8b8b;
    border-radius: 50%;
  }
}

@media screen and (min-width: 1024px) {
  button.agile__nav-button.agile__nav-button--prev {
    font-size: 72px;
    left: -195%;
    -webkit-tap-highlight-color: transparent;
  }

  button.agile__nav-button.agile__nav-button--next {
    font-size: 72px;
    right: -195%;
    top: -205px;
    -webkit-tap-highlight-color: transparent;
  }

  .agile__dot button {
    height: 24px;
    width: 24px;
    background-color: #8b8b8b;
    border-radius: 50%;
  }
}

@media screen and (min-width: 1024px) {
  button.agile__nav-button.agile__nav-button--prev {
    top: -246px;
  }

  button.agile__nav-button.agile__nav-button--next {
    top: -246px;
  }
}

@media screen and (min-width: 1440px) {
  button.agile__nav-button.agile__nav-button--prev {
    left: -280%;
  }

  button.agile__nav-button.agile__nav-button--next {
    right: -280%;
  }
}

body {
  font-family: 'Montserrat', sans-serif !important;
}

.remove-hightlight {
  -webkit-tap-highlight-color: transparent;
}

.v-application a {
  color: black !important;
}

.v-application ul,
.v-application ol {
  padding-left: 0;
}

/* .v-application .mx-4 {
  margin-left: 0 !important;
  margin-right: 0 !important;
} */
</style>
