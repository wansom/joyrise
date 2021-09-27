<template>
  <!-- Profile Information Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full card-profile-information"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
    :headStyle="{ paddingRight: 0 }"
  >
    <a-modal v-model="visible" title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <template #title>
      <h6 class="font-semibold m-0">Add Student</h6>
    </template>

    <a slot="extra">
      <a-upload
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> Click to Upload csv</a-button>
      </a-upload>
    </a>
    <hr class="my-25" />
    <a-form
      id="student-information"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Student Information">
          <a-form-item class="mb-10" label="Student's Name">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    { required: true, message: 'Please input first name!' },
                  ],
                },
              ]"
              placeholder=" Timothy Nasibi"
            >
            </a-input>
          </a-form-item>
         
 
          <a-form-item class="mb-10" label="Birth Date">
            <a-input
              v-decorator="[
                'birth_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10" label="Admission Date">
            <a-input
              v-decorator="[
                'admission_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10" label="Reporting Date">
            <a-input
              v-decorator="[
                'reporting_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="Gender">
            <a-select
              v-decorator="[
                'gender',
                {
                  rules: [
                    { required: true, message: 'Please select your gender!' },
                  ],
                },
              ]"
              placeholder="Select gender"
            >
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Grade">
            <a-select
              v-decorator="[
                'grade',
                { rules: [{ required: true, message: 'No grade selected!' }] },
              ]"
              placeholder="Select student's grade"
            >
              <a-select-option
                v-for="grade in grades"
                :key="grade.id"
                :value="grade.grade"
              >
                {{ grade.grade }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="mb-10" label="Boarding School">
            <a-switch default-checked @change="addBoarding" />
          </a-form-item>
          <a-form-item class="mb-10" label="School Transport">
            <a-switch default-checked @change="addTransport" />
          </a-form-item>
          <a-form-item class="mb-10" label="previous School">
            <a-input
              v-decorator="[
                'previous_school',
                {
                  rules: [{ required: false }],
                },
              ]"
              placeholder="Nasibi primary School"
            >
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Guardian Details" force-render>
          <a-form-item class="mb-10">
            <a-input
              v-decorator="[
                'father_name',
                {
                  rules: [
                    { required: false, message: 'Please input fathers name!' },
                  ],
                },
              ]"
              placeholder=" Father's Name"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10">
            <a-input
              v-decorator="[
                'father_phone',
                {
                  rules: [
                    {
                      required: false,
                      message: 'Please input fathers phone name!',
                    },
                  ],
                },
              ]"
              placeholder="Father's Phone"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10">
            <a-input
              v-decorator="[
                'mother_name',
                {
                  rules: [
                    { required: false, message: 'Please input mothers name!' },
                  ],
                },
              ]"
              placeholder="mother's name"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10">
            <a-input
              v-decorator="[
                'mother_phone',
                {
                  rules: [
                    { required: false, message: 'Please input mothers phone!' },
                  ],
                },
              ]"
              placeholder="mother's phone"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-10">
            <a-input
              v-decorator="[
                'home_address',
                {
                  rules: [
                    { required: true, message: 'Please input home address!' },
                  ],
                },
              ]"
              placeholder="Home Address"
            >
            </a-input>
          </a-form-item>
           <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              ADD STUDENT
            </a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase.js";
export default {
  data() {
    return {
      gender: "",
      visible: false,
      boarding: false,
      transport: false,
      headers: {
        authorization: "authorization-text",
      },
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "student_info" });
  },
  methods: {
        addBoarding(){
      this.boarding =!this.boarding;
    },
    addTransport(){
       this.transport =!this.transport;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("addStudent",{
            name: values.name ?? "",
            birth_date:
              new Date(values.birth_date) ?? new Date(),
            father_name: values.father_name ?? null,
            father_phone:values.father_phone??null,
            gender: values.gender ?? null,
            grade: values.grade ?? null,
            home_address:
              values.home_address ?? null,
            mother_name: values.mother_name ?? null,
            mother_phone:
              values.mother_phone ?? null,
            previous_school:
              values.previous_school ?? null,
            admission_date:
              new Date(values.admission_date) ??
             new Date(),
            reporting_date:
              new Date(values.reporting_date) ??
             new Date(),
              transport:this.transport,
              boarding:this.boarding
          });

          this.$message.success(`student added successfully.`);
        } else {
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err);
          this.$message.error(`check your values and try again`);
        }
      });
    },
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
