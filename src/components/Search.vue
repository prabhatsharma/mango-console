<template>
  <div class="q-pa-lg home">
    <form @submit.prevent="search(searchTerm, searchType)">
      <div class="row">
        <div class="col">
          Start Time:
          <input type="datetime-local" v-model="startTime" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End Time:
          <input type="datetime-local" v-model="endTime" />
        </div>
        <div class="col">
          <div class="q-gutter-sm">
            <q-radio
              v-model="searchType"
              val="querystring"
              label="Query String"
            />
            <q-radio v-model="searchType" val="term" label="Term" />
            <q-radio v-model="searchType" val="fuzzy" label="Fuzzy" />
            <q-radio v-model="searchType" val="prefix" label="Prefix" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col fields">
          <q-select
            v-model="indexName"
            :options="indexList"
            label="Index to search"
            @input="getSchema(indexName)"
            dense
          />
        </div>
        <div class="col fields">
          <q-input label="Max result size" v-model="resultSize" dense />
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <q-input label="Search Query" v-model="searchTerm" dense />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="col">
            <div>Fields</div>
            <div>{{ schema }}</div>
          </div>
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col">
          <q-btn
            icon="pageview"
            color="secondary"
            type="submit"
            label="Search"
          />
        </div>
      </div>
    </form>

    <br />

    <!-- {{ qresult }} -->

    <!-- <div class="row">
      <div class="col">
        <q-table :data="qresult" title="Search results" row-key="timestamp" />
      </div>
    </div> -->

    <!-- {{ result }} -->

    <div class="row">
      <div class="col">
        <table class="fl-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Record</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in result" :key="item.id">
              <td style="width: 12%">
                {{ item._timestamp_ }}
              </td>
              <td>
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import { date } from "quasar";

export default {
  name: "Search",
  data: function () {
    return {
      startTime: "",
      endTime: "",
      searchType: "querystring",
      searchTerm: "",
      result: {},
      resultSize: 50,
      qresult: [],
      currentRecordJSON: {},
      resultCount: 0,
      indexList: [],
      indexFields: [],
      indexListDetails: [],
      indexName: "",
      schema: [],
      pagination: {
        rowsPerPage: 50, // current rows per page being displayed
      },
    };
  },
  created() {
    this.getIndexList();
    let sDate = date.subtractFromDate(new Date(), { days: 7 });
    this.startTime = date.formatDate(sDate, "YYYY-MM-DDTHH:mm");
    var eDate = new Date();
    this.endTime = date.formatDate(eDate, "YYYY-MM-DDTHH:mm");
  },
  methods: {
    getSchema(indexName) {
      for (var i = 0; i < this.indexListDetails.length; i++) {
        if (this.indexListDetails[i].name == indexName) {
          this.schema = this.indexListDetails[i].fields;
        }
      }

      this.search("", indexName); // Load first 50 records when the index is selected
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
    search(term, searchType) {
      if (this.indexName == "") {
        this.$q.notify({
          message: "Please select the index to be searched",
          color: "orange",
        });
        return;
      }
      if (term == "") {
        searchType = "matchall";
      }

      var query = {
        size: parseInt(this.resultSize),
        searchType: searchType,
        from: 0,
        explain: true,
        highlight: {},
        query: {
          boost: 1,
          term: term,
          startTime: new Date(this.startTime).toISOString(),
          endTime: new Date(this.endTime).toISOString(),
        },
        fields: ["*"],
      };

      this.qresult = [];

      var url = this.$store.state.server + "api/" + this.indexName + "/_search";
      this.$axios
        .post(url, query)
        .then((res) => {
          this.result = {};
          if (res.data.result.hits.length > 0) {
            for (var i = 0; i < res.data.result.hits.length; i++) {
              this.result[res.data.result.hits[i].id] =
                res.data.result.hits[i].fields;

              var temp = {};

              for (var j = 0; j < res.data.result.hits.length; j++) {
                temp = res.data.result.hits[j].fields;
                temp["id"] = res.data.result.hits[j].id;
                this.qresult.push(temp);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            message: err,
            color: "red",
          });
        });
    },
  },
};
</script>

<style scoped>
.asearch {
  height: 300px;
}

.fields {
  margin: 5px;
}

.search-class {
  white-space: pre;
}

.fl-table {
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  background-color: white;
}

.fl-table td,
.fl-table th {
  text-align: left;
  padding: 8px;
}

.fl-table td {
  border-right: 1px solid #f8f8f8;
  font-size: 12px;
  word-wrap: break-word;
}

.fl-table thead th {
  color: #ffffff;
  background: #4fc3a1;
}

.fl-table thead th:nth-child(odd) {
  color: #ffffff;
  background: #324960;
}

.fl-table tr:nth-child(even) {
  background: #f8f8f8;
}
</style>
