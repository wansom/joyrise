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
      <a-form-item class="mb-10" label="Select Term">
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
          <a-form-item class="mb-10" label="Record Type">
              <a-select
              ref="recordType" v-model="recordType"
              placeholder="select type"
            >
              <a-select-option value="transport">
                Transport
              </a-select-option>
              <a-select-option value="tuition">
               Tuition
              </a-select-option>
            </a-select>
          </a-form-item>
              <a-form-item class="mb-10" label="Total Amount">
            <a-input
              v-decorator="[
                'amount',
                {
                  rules: [
                    { required: true, message: 'Enter amount!' },
                  ],
                },
              ]"
              placeholder="Enter amount"
            >
            </a-input>
          </a-form-item>
            <a-form-item class="mb-10" label="Boarding" v-if="recordType =='tuition'">
            <a-input
              v-decorator="[
                'boarding',
                {
                  rules: [{ required: false }],
                },
              ]"
              placeholder="boarding amount"
            >
            </a-input>
          </a-form-item>
            <a-form-item label="Grades">
      <a-select
        v-decorator="[
          'levels',
          { rules: [{ required: true, message: 'No grade selected!' }] },
        ]"
        placeholder="Select levels"
      >
        <a-select-option value="ecd">
                ECD
              </a-select-option>
              <a-select-option value="lowerprimary">
                lower Primary
              </a-select-option>
               <a-select-option value="upperprimary">
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
        visible :false,
        recordType:"tuition"

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
           console.log(values,this.recordType)
        this.$store.dispatch('addFeeRecords',{
            term:values.term??"",
        amount:values.amount??"",
        level:values.levels??"",
        recordtype:this.recordType??"",
        boarding:values.boarding??""

        })
          this.$message.success(`records added successfully.`);
         }else{
           this.$message.error(`some values are missing.`);
         }
         
     })
    
}
}
}
</script>

<style>

</style>