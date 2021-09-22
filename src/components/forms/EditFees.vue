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
      <h6 class="font-semibold m-0">Assign fees</h6>
    </template>
    

    <hr class="my-25" />
           <a-form
      id="student-information"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item class="mb-10" label="Term">
              <a-select
              v-decorator="[
                'term',
                {
                  rules: [
                    { required: false, message: 'Please select term!' },
                  ],
                },
              ]"
              placeholder="Select term"
            >
              <a-select-option value="one">
                one
              </a-select-option>
              <a-select-option value="two">
                two
              </a-select-option>
               <a-select-option value="three">
                three
              </a-select-option>
            </a-select>
          </a-form-item>
              <a-form-item class="mb-10" label="Tuition fees">
            <a-input
              v-decorator="[
                'tuition',
                {
                  rules: [
                    { required: true, message: 'Enter tuition fees!' },
                  ],
                },
              ]"
              placeholder="Tuition fees amount"
            >
            </a-input>
          </a-form-item>
            <a-form-item class="mb-10" label="transport">
            <a-input
              v-decorator="[
                'transport',
                {
                  rules: [{ required: false }],
                },
              ]"
              placeholder="transport amount"
            >
            </a-input>
          </a-form-item>
            <a-form-item label="Grade">
      <a-select
        v-decorator="[
          'grade',
          { rules: [{ required: true, message: 'No grade selected!' }] },
        ]"
        placeholder="Select levels"
      >
        <a-select-option value="one">
                ECD
              </a-select-option>
              <a-select-option value="two">
                lower Primary
              </a-select-option>
               <a-select-option value="three">
                Upper primary
              </a-select-option>
      </a-select>
    </a-form-item>
        
           <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              Assign Fees
            </a-button>
          </a-form-item>
        
    
          </a-form>
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
export default {
data(){
    return{
        visible :false
    }
},
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "student_info" });
  },
methods:{
handleSubmit(e){
    e.preventDefault();
     this.form.validateFields((err, values) => {
         if(!err){

         }
     })
}
}
}
</script>

<style>

</style>