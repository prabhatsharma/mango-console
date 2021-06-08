<template>
  <div>
    <div class="row">
      <div class="col-2 menu-style">
        <q-tabs vertical class="text-teal" align="left">
          <q-route-tab
            to="/management/create-index"
            label="Index List"
            style="justify-content: initial"
          />
          <q-route-tab
            to="/management/create-document"
            label="Create Document"
            style="justify-content: initial"
          />
        </q-tabs>
      </div>

      <div class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.menu-style {
  align-content: flex-start;
  align-self: flex-start;
  left: 0%;
}
</style>
