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
      <button>cast</button>
    </template>
    

    <hr class="my-25" />
     <div>
    <a-steps :current="current" direction="vertical">
        <a-step>
      <!-- <span slot="title">Finished</span> -->
      <template slot="title">
       Presidential Candidates
      </template>
      <div slot="description">
    <a-radio-group v-model="president"  v-for="candidate in candidates" :key="candidate.id" >
          <a-card  class="m-16"> 
          <a-avatar :src="candidate.photo"/>
          <a-radio  :value="candidate.first_name" >
          {{candidate.first_name}}
        </a-radio></a-card>
        </a-radio-group>
      </div>
    </a-step>  <a-step>
      <!-- <span slot="title">Finished</span> -->
      <template slot="title">
        Select governor
      </template>
      <span slot="description"><a-radio-group v-model="governor"  v-for="candidate in governors" :key="candidate.id" >
          <a-card  class="m-16"> 
          <a-avatar :src="candidate.photo"/>
          <a-radio :value="candidate.first_name" >
          {{candidate.first_name}}
        </a-radio></a-card>
        </a-radio-group></span>
    </a-step>  <a-step>
      <!-- <span slot="title">Finished</span> -->
      <template slot="title">
       Senate Candidates
      </template>
      <span slot="description">
        <a-radio-group v-model="senator"  v-for="candidate in senators" :key="candidate.id" >
          <a-card  class="m-16"> 
          <a-avatar :src="candidate.photo"/>
          <a-radio :value="candidate.first_name" >
          {{candidate.first_name}}
        </a-radio></a-card>
        </a-radio-group>
      </span>
    </a-step>
    </a-steps>
  
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="handleSubmit"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>     
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
import EosService from '@/eosio/EosioService';
import {mapState} from 'vuex';
export default {
data(){
    return{
        visible :false,
        recordType:"tuition",
               accountName: 'bygpvrgjnhgc',
      privateKey: '5K6FHys4VU3ZRwDCkvpmvDZp1QWTwrGAuUqSVyX5uSUb8D8Hspk',
      current: 0,
      selected:[],
      governor:"joho",
      president:"uhuru",
      senator:"kipchoge",
      mp:"wainaina",
      mca:"ruto",
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
       EosService.vote (this.accountName, this.privateKey,{
               "president": this.president,
               "governor": this.governor,
               "womanrep": this.womenreps,
               "mp":this.mp,
               "senator": this.senators,
               "mca":this.mca


             }).then(()=>{
          this.$message.success(` voted successfully.`);
        }).catch(err=>{
            this.$message.error(err.toString());
              this.$message.error(`check your values and try again`);
        }) 
    },
     next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    logUser(){
      console.log(this.userProfile)
    }
},
computed:{
  ...mapState(['candidates','governors','senators','womenreps','userProfile'])
},
watch:{
  getCandiate:function(){
    return this.candidates.filter(candidate=>candidate.role === "Admin")
    
  }
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