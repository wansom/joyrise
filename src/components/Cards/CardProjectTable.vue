<template>
  <!-- Projects Table Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h6>Students</h6>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group v-model="projectHeaderBtns" size="small">
            <a-radio-button value="all" @click="convert">ALL</a-radio-button>
            <a-radio-button value="online">CLASS 1</a-radio-button>
            <a-radio-button value="stores">CLASS 2</a-radio-button>
            <a-radio-button value="stores">CLASS 3</a-radio-button>
            <a-radio-button value="stores">CLASS 4</a-radio-button>
            <a-radio-button value="stores">CLASS 5</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="true">
      <template slot="number" slot-scope="number">
        <h6 class="m-0">
          {{ number }}
        </h6>
      </template>
      <template slot="name" slot-scope="name">
        <h6 class="m-0">
          {{ name.name }}
        </h6>
      </template>

      <template slot="completion" slot-scope="completion">
        <span class="font-bold text-muted text-sm">{{
          completion.label ? completion.label : completion
        }}</span>
        <a-progress
          :percent="completion.value ? completion.value : completion"
          :show-info="false"
          size="small"
          :status="completion.status ? completion.status : 'normal'"
        />
      </template>
    </a-table>

    <div class="table-upload-btn">
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p class="ant-upload-hint">
          make sure all excel files are rightly formatted
        </p>
      </a-upload-dragger>
      <input type="file" @change="uploadFile" ref="file" />
      <form enctype="multipart/form-data">
        <input type="file" @change="onFileChange" />
      </form>
    </div>
  </a-card>
  <!-- / Projects Table Card -->
</template>

<script>
const csv = require("csvtojson/v2");
const csvToJson = require("convert-csv-to-json");
const csv1 = require("csv-parser");
const fs = require("fs");
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
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      file: "",
      results: [],
      fileinput:""
    };
  },
  methods: {
  onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]);
    },
    createInput(file) {
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        result => {
          /* handle a successful result */
        var lines = result.split("\n");
    var newresult = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      newresult.push(obj);
      }  
      //return result; //JavaScript object
       //JSON
    console.log(newresult);
        },
        error => {
          /* handle an error */ 
          console.log(error);
        }
      );
    }

  },
};
</script>
