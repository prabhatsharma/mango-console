<template>
  <div>
    <div class="row">
      <div class="col">
        <q-select
          v-model="indexName"
          :options="indexList"
          label="Index to use"
        />
      </div>
    </div>
    <br />

    <br />

    <div class="row">
      <div class="col">
        <q-input
          v-model="createDocumentText"
          label="JSON document"
          type="textarea"
          rows="20"
          outlined
          :dense="true"
          class="search-class"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-btn
          icon="create"
          color="secondary"
          label="Create Document"
          @click="createDocument(createDocumentText)"
        />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  created() {
    this.getIndexList();
  },
  data: function () {
    return {
      createDocumentText: "",
      indexName: "",
      schema: [],
      indexList: [],
      indexListDetails: {},
      pagination: {
        rowsPerPage: 50, // current rows per page being displayed
      },
    };
  },
  methods: {
    createDocument(createDocumentText) {
      var url =
        this.$store.state.server + "api/" + this.indexName + "/document";
      this.$axios.put(url, JSON.parse(createDocumentText)).then((res) => {
        if (res.status == 201) {
          this.$q.notify({
            message: "Document in " + this.indexName + " created.",
            color: "purple",
          });
        }
      });
    },
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
  },
};
</script>
