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
            <a-radio-button value="all">ALL</a-radio-button>
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
    
    </div>
  </a-card>
  <!-- / Projects Table Card -->
</template>

<script>
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
    };
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
