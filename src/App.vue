<template>
  <q-layout view="hHh lpR fFf">
    <SignedInLayout v-if="loggedIn" />
    <SignedOutLayout v-if="!loggedIn" />
  </q-layout>
</template>

<script>
// import Search from "./components/Search.vue";
import SignedInLayout from "./SignedInLayout";
import SignedOutLayout from "./SignedOutLayout";

export default {
  name: "LayoutDefault",

  components: {
    SignedInLayout,
    SignedOutLayout,
  },

  data() {
    return {
      leftDrawerOpen: false,
      loggedIn: true,
    };
  },
};
</script>

<style></style>
