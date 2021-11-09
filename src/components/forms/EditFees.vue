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
     <div>
    <a-steps :current="current" direction="vertical">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" :description="steps[current].description" />
    </a-steps>
  
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
           <!-- <a-form
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
               Shebesh
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
        
           <!-- <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              Vote
            </a-button>
          </a-form-item>
        
    
          </a-form> --> 
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
import EosService from '@/eosio/EosioService';
export default {
data(){
    return{
        visible :false,
        recordType:"tuition",
               accountName: 'bygpvrgjnhgc',
      privateKey: '5K6FHys4VU3ZRwDCkvpmvDZp1QWTwrGAuUqSVyX5uSUb8D8Hspk',
      current: 0,
      steps: [
        {
          title: 'President',
          description: 'Selecet President',
        },
        {
          title: ' Governor',
          description: 'Select governor',
        },
        {
          title: 'Senators',
          description: 'Select Senators',
        },
      ],

    }
},
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "student_info" });
  },
methods:{
 handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        
             EosService.vote (this.accountName, this.privateKey,values).then(()=>{
          this.$message.success(` voted successfully.`);
        }).catch(err=>{
            this.$message.error(err.toString());
        })         
        } else {
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err);
          this.$message.error(`check your values and try again`);
        }
      });
    },
     next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
}
}
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>