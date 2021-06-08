<template>
  <div>
    <div class="row create-index">
      <div class="col">
        <q-input
          v-model="indexName"
          label="Index Name"
          outlined
          :dense="true"
          class="create-index"
        />
      </div>
      <br />
    </div>

    <div class="row create-index">
      <div class="col">
        <q-btn
          icon="create"
          color="secondary"
          label="Create Index"
          class="create-index"
          @click="createIndex(indexName, createIndexQuery)"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <!-- {{indexListDetails}} -->
        <q-table
          title="Search Results"
          :data="indexListDetails"
          row-key="name"
          dense
          :pagination.sync="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { Notify } from "quasar";

export default {
  created() {
    this.getIndexList();
  },
  data: function () {
    return {
      indexName: "",
      createIndexQuery: "",
      indexList: [],
      indexListDetails: [],
      pagination: {
        rowsPerPage: 50, // current rows per page being displayed
      },
    };
  },
  methods: {
    getIndexList() {
      this.indexList = [];
      this.$axios.get(this.$store.state.server + "api/_list").then((res) => {
        var list = res.data.result;
        this.indexListDetails = res.data.result;
        list = list.map((element) => {
          return element.name;
        });
        this.indexList = list;
      });
    },
    createIndex(indexName) {
      var url = this.$store.state.server + "api/" + indexName;
      this.$axios.put(url, {}).then((res) => {
        if (res.status == 201) {
          this.getIndexList();
          this.$q.notify({
            message: "Index: " + indexName + " created.",
            color: "purple",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.create-index {
  margin: 10px;
  /* margin-bottom: 20px;
  margin-top: 20px; */
  /* white-space: pre; */
}
</style>
