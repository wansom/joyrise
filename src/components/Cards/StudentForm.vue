<template>
  <!-- Profile Information Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full card-profile-information"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
    :headStyle="{ paddingRight: 0 }"
  >
    <template #title>
      <h6 class="font-semibold m-0">Add Student</h6>
    </template>
    <a-button type="link" slot="extra">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="fill-muted"
          d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
          fill="#111827"
        />
        <path
          class="fill-muted"
          d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
          fill="#111827"
        />
      </svg>
    </a-button>
    <hr class="my-25" />
           <a-form
      id="student-information"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Student Information">
     
      <a-form-item class="mb-10" label="First Name">
            <a-input
              v-decorator="[
                'first_name',
                {
                  rules: [
                    { required: true, message: 'Please input first name!' },
                  ],
                },
              ]"
              placeholder=" Timothy"
            >
            </a-input>
          </a-form-item>
              <a-form-item class="mb-10" label="Last Name">
            <a-input
              v-decorator="[
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
                  ],
                },
              ]"
              placeholder="Nasibi"
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
          { rules: [{ required: true, message: 'Please select your gender!' }] },
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
        <a-select-option  v-for="grade in grades" :key="grade.id" :value="grade.grade">
          {{grade.grade}}
        </a-select-option>
      </a-select>
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
                    { required: false, message: 'Please input fathers phone name!' },
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
        </a-tab-pane>
        <a-tab-pane key="3" tab="Confirm & Submit">
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
import {mapState} from 'vuex';
export default {
  data() {
    return {
      gender: "",
    };
  },
  	beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'student_info' });
		},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //this.$store.dispatch("addStudent",values)
          
          this.$message.success(`student added successfully.`);

        }else{
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err)
           this.$message.error(`check your values and try again`);
        }
      });
    },

  },
  computed:{
    ...mapState(["grades"])
  },
  mounted(){
    this.$store.dispatch("getClasses")
  }
};
</script>
