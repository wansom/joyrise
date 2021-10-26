<template>
   <!-- Profile Information Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full card-profile-information"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
    :headStyle="{ paddingRight: 0 }"
  >
   <a-modal v-model="visible" title="Basic Modal">
   
    </a-modal>
    <template #title>
      <h6 class="font-semibold m-0">Cast Vote</h6>
    </template>
    

    <hr class="my-25" />
           <a-form
      id="student-information"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item class="mb-10" label="Select President">
              <a-select
              v-decorator="[
                'president',
                {
                  rules: [
                    { required: false, message: 'Please select president!' },
                  ],
                },
              ]"
              placeholder="Select President"
            >
              <a-select-option value="ruto">
                Ruto
              </a-select-option>
              <a-select-option value="raila">
                Raila
              </a-select-option>
               <a-select-option value="mudavadi">
                Mudavadi
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="mb-10" label="Select Governor">
              <a-select
                 v-decorator="[
                'governor',
                {
                  rules: [
                    { required: false, message: 'Please select governor!' },
                  ],
                },
              ]"
              placeholder="select Governor"
            >
              <a-select-option value="orengo">
               Orengo
              </a-select-option>
              <a-select-option value="obado">
               Obado
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="mb-10" label="Select Women Rep">
              <a-select
                v-decorator="[
                'womenrep',
                {
                  rules: [
                    { required: false, message: 'Please select women rep!' },
                  ],
                },
              ]"
              placeholder="select women rep"
            >
              <a-select-option value="waiguru">
               Waiguru
              </a-select-option>
              <a-select-option value="shebesh">
               Obado
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="mb-10" label="Select MCA">
              <a-select
                v-decorator="[
                'mca',
                {
                  rules: [
                    { required: false, message: 'Please select MCA!' },
                  ],
                },
              ]"
              placeholder="select MCA"
            >
              <a-select-option value="kalonzo">
               kalonzo
              </a-select-option>
              <a-select-option value="karua">
               karua
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="mb-10" label="Select MP">
              <a-select
                v-decorator="[
                'mp',
                {
                  rules: [
                    { required: false, message: 'Please select MP!' },
                  ],
                },
              ]"
              placeholder="Member of Parliament"
            >
              <a-select-option value="ababu">
               Ababu Namwamba
              </a-select-option>
              <a-select-option value="babu">
               Babu Owino
              </a-select-option>
            </a-select>
          </a-form-item>
                <a-form-item class="mb-10" label="Select Senator">
              <a-select
                v-decorator="[
                'senator',
                {
                  rules: [
                    { required: false, message: 'Please select Senator!' },
                  ],
                },
              ]"
              placeholder="Select senator"
            >
              <a-select-option value="nyongo">
               nyongo
              </a-select-option>
              <a-select-option value="sonko">
               sonko
              </a-select-option>
            </a-select>
          </a-form-item>
    
            <!-- <a-form-item class="mb-10" label="Boarding" v-if="recordType =='tuition'">
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
          </a-form-item> -->
            <!-- <a-form-item label="Grades">
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
    </a-form-item> -->
        
           <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              Vote
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