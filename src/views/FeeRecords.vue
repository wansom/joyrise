<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->
    <!--modal start-->
    <a-modal v-model="visible" :title="student.name">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="Amount">
          <a-input
            v-decorator="[
              'amount',
              {
                rules: [{ required: true, message: 'Please enter the amount paid!' }],
              },
            ]"
            placeholder="amount in shillings"
          />
        </a-form-item>
        <a-form-item label="Term">
          <a-select
            v-decorator="[
              'term',
              {
                rules: [
                  { required: true, message: 'Please select the term!' },
                ],
              },
            ]"
            placeholder="Select a term"
            @change="handleSelectChange"
          >
            <a-select-option value="one">
              ONE
            </a-select-option>
            <a-select-option value="two">
              TWO
            </a-select-option>
            <a-select-option value="three">
              THREE
            </a-select-option>
          </a-select>
        </a-form-item>
          <a-form-item label="Payment Method">
          <a-input
            v-decorator="[
              'method',
              {
                rules: [{ required: true, message: 'Please enter the payment method!' }],
              },
            ]"
            placeholder="Payment method"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--modal end-->
    <a-card
      :bordered="false"
      class="card-profile-head"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12" class="col-info">
            <a-avatar :size="74" shape="square" src="images/stIsaacLogo.png" />
            <div class="avatar-info">
              <h4 class="font-semibold m-0">{{ student.name }}</h4>
              <p>Grade: {{ student.grade }}</p>
            </div>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-button @click="showModal">ADD NEW RECORD</a-button>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <FeesTable></FeesTable>
  </div>
</template>

<script>
import FeesTable from "../components/tables/FeesTable";

export default {
  data() {
    return {
      student: this.$route.params.student,
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  components: {
    FeesTable,
  },
  methods: {
    studentlog() {
      console.log(this.$route.params.student);
    },
    showModal() {
      this.visible = !this.visible;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
    },
  },
  created() {
    this.$store.dispatch("getRecords", this.student);
  },
};
</script>

<style></style>
