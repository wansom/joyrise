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
            <a-radio-button value="all" @click="filterClasses">ALL</a-radio-button>
            <a-radio-button  v-for="grade in grades" :key="grade.id" :value="grade.id"> {{grade.grade}} </a-radio-button>
           
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="true" rowKey="id">
      <template slot="number" slot-scope="number">
        <h6 class="m-0">
          {{ number }}
        </h6>
      </template>
      <template slot="NAME" slot-scope="NAME">
        <h6 class="m-0">
          {{ NAME}}
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
    </div>
  </a-card>
  <!-- / Projects Table Card -->
</template>

<script>
import * as fb from "@/firebase.js";

import {mapState} from "vuex";
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
    rowKey:String
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
        handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.createInput(info.file.originFileObj);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
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
       if(newresult &&(typeof newresult === "object")){
         Object.keys(newresult).forEach((data)=>{
           fb.studentCollection.doc().set(newresult[data])
            console.log(newresult[data]);
         })
       }
   
        },
        error => {
          /* handle an error */ 
          console.log(error);
        }
      );
    }

  },
  		  created(){
    this.$store.dispatch("getClasses")
  },
  computed:{
    ...mapState(["grades"])
  }

};
</script>
