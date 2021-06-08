<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-orange-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Mango </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-tabs vertical class="text-teal">
          <q-route-tab to="/" label="Home" style="justify-content: initial" />
          <q-route-tab
            to="/search"
            label="Search"
            style="justify-content: initial"
          />
          <q-route-tab
            to="/management"
            label="Management"
            style="justify-content: initial"
          />
          <q-route-tab
            to="/docs"
            label="Docs"
            style="justify-content: initial"
          />
          <q-route-tab
            to="/about"
            label="About"
            style="justify-content: initial"
          />
        </q-tabs>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import Search from "./components/Search.vue";

export default {
  name: "SignedInLayout",

  components: {
    // Search,
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style></style>
