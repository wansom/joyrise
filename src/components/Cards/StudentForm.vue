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
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Student Information">
          <a-form-item class="mb-10" label='First Name'>
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
          
          <a-form-item class="mb-10" label='Last Name'>
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
                  rules: [
                    { required: true, message:'please pick a date' },
                  ],
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
                'birth_date',
                {
                  rules: [
                    { required: true, message:'please pick a date' },
                  ],
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
                'birth_date',
                {
                  rules: [
                    { required: true, message:'please pick a date' },
                  ],
                },
              ]"
              placeholder="Birth Date"
			  type="date"
			  
            >
            </a-input>
          </a-form-item>
		  <a-form-item class="mb-10" label='Gender'>
            <a-select
              default-value="select Gender"
              style="width: 100%"
              @change="setGender"
            >
              <a-select-option value="male">
                Male
              </a-select-option>
              <a-select-option value="female">
                Female
              </a-select-option>
      
             
            </a-select>
          </a-form-item>
		  <a-form-item class="mb-10" label='Class'>
            <a-select
              default-value="select Class"
              style="width: 100%"
              @change="setGender"
            >
              <a-select-option value="male">
                1
              </a-select-option>
              <a-select-option value="female">
                2
              </a-select-option>
      
             
            </a-select>
          </a-form-item>
		  <a-form-item class="mb-10" label='previous School'>
            <a-input
              v-decorator="[
                'first_name',
                {
                  rules: [
                    { required: false },
                  ],
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
                'first_name',
                {
                  rules: [
                    { required: true, message: 'Please input fathers name!' },
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
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
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
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
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
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
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
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
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
export default {
  data() {
    return {
		gender:""
	};
  },
  methods:{
	  setGender(value){
		  this.gender = value
		  console.log(this.gender);
	  }
  }
};
</script>
