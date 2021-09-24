<template>
  <!-- Authors Table Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">STUDENT LIST</h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-radio-button value="all">ALL</a-radio-button>
            <a-radio-button
              v-for="grade in grades"
              :key="grade.id"
              :value="grade.id"
              >{{ grade.grade }}</a-radio-button
            >
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="true">
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
	    <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
      <template slot="NAME" slot-scope="NAME">
        <div class="author-info">
          <h6 class="m-0">{{ NAME }}</h6>
          <p class="m-0 font-regular text-muted">{{ NAME }}</p>
        </div>
      </template>

      <template slot="grade" slot-scope="grade">
        <a-tag
          class="tag-status"
          :class="level ? 'ant-tag-primary' : 'ant-tag-muted'"
        >
          {{ grade }}
        </a-tag>
      </template>
      <template slot="Paid" slot-scope="Paid">
        <a-tag
          class="tag-status"
          :class="Paid ? 'ant-tag-primary' : 'ant-tag-muted'"
        >
          {{ Paid }}
        </a-tag>
      </template>
      <template slot="viewBtn" slot-scope="row">
        <a-button type="link" :data-id="row.key" class="btn-edit">
          View
        </a-button>
      </template>
      <template slot="editBtn" slot-scope="row">
        <a-button type="link" :data-id="row.key" class="btn-edit">
          Edit
        </a-button>
      </template>
      <template slot="deleteBtn" slot-scope="row">
        <a-button type="link" :data-id="row.key" class="btn-edit">
          Delete
        </a-button>
      </template>
    </a-table>
  </a-card>
  <!-- / Authors Table Card -->
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: "all",
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]);
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.createInput(info.file.originFileObj);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    createInput(file) {
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        (result) => {
          /* handle a successful result */
          var lines = result.split("\n");
          var newresult = [];
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            newresult.push(obj);
          }
          //return result; //JavaScript object
          //JSON
          if (newresult && typeof newresult === "object") {
            Object.keys(newresult).forEach((data) => {
              fb.studentCollection.doc().set(newresult[data]);
              console.log(newresult[data]);
            });
          }
        },
        (error) => {
          /* handle an error */

          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(["grades"]),
  },
  mounted() {
    this.$store.dispatch("getClasses");
  },
};
</script>
