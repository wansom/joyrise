<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" rowKey='president'>
    <template slot="president" slot-scope="president">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>Ksh{{ president}}</h6>
        </div>
      </div>
    </template> 
    <template slot="func" slot-scope="governor">
      <div class="author-info">
        <h6 class="m-0">{{ governor}}</h6>
      </div>
    </template>

    <template slot="status" slot-scope="mca">
     <div class="author-info">
        <h6 class="m-0">{{mca}}</h6>
      </div>
    </template>
     <template slot="mp" slot-scope="mp">
      <div class="author-info">
        <h6 class="m-0">{{mp}}</h6>
      </div>
    </template>

  <template slot="womanrep" slot-scope="womanrep">
      <div class="author-info">
        <h6 class="m-0">{{womanrep}}</h6>
      </div>
    </template>

    <template slot="editBtn" slot-scope="row">     
			<a-button type="link" :data-id="row.key" class="btn-edit" @click="reveal(row)">
       EDIT      
			</a-button>
     
		</template>
    <template slot="deleteBtn" slot-scope="row">     
			<a-button type="link" :data-id="row.key" class="btn-edit" @click="deleterecord(row)">
       DELETE
			</a-button>
		</template>
  </a-table>
</template>
<script>
import { mapState } from "vuex";

import * as fb from "@/firebase";

const columns = [
		{
			title: 'Voter ID',
			dataIndex: 'id',
			scopedSlots: { customRender: 'author' },
		},
		{
			title: 'President',
			dataIndex: 'president',
			scopedSlots: { customRender: 'president' },
		},
				{
			title: 'Governor',
			dataIndex: 'governor',
			scopedSlots: { customRender: 'governor' },
		},
				{
			title: 'Women Rep',
			dataIndex: 'womanrep',
			
		},
		{
			title: 'MCA',
			dataIndex: 'mca',
			class: 'text-muted',
		},
		{
			title: 'MP',
			dataIndex: 'mp',
			class: 'text-muted',
		},

	];
export default {
  	props: {
			data: {
				type: Array,
				default: () => [],
			},
	
		},
  data() {
    return {
      columns,
       receipt:false,
       record:{},
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      feestructure: {},
      changetype:"",
      arreas:0,
      carried_forward:0,
      term:"",
      paidamount:0
    };
  },
  computed: {
    ...mapState(["records"]),
  },
    components: {
  },
  methods:{
    reveal(row){
      this.receipt =!this.receipt
      this.record =row;
       console.log(this.record)
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) { 

          const balance = this.feestructure[0].amount - parseInt(values.amount) 
          this.paidamount= values.amount
          if(balance>0){
            this.arreas =balance
          }else{
            this.carried_forward = balance
          }
          fb.recordsCollection.doc(this.record.id).update({
            amount:values.amount??this.record.amount,
            balance:this.arreas??this.record.balance,
            carried_forward:this.carried_forward??this.record.carried_forward,
            payment_method:values.method??this.record.payment_method,
            term:values.term??this.record.term,
            record_type:values.recordtype??this.record.record_type,
            student_id:this.record.student_id,
            date: new Date(values.date)
          });
          fb.studentCollection.doc(this.record.student_id).update({
            balance:this.arreas
          })
          
            console.log(
                "Received values of form: ",
                values,
              );
        }
      });
      
    },
        recordChange(change){
      this.changetype=change
    },
    handleSelectChange(value) {
      this.term = value;
         fb.feesCollection.where("term","==",value).where("recordtype","==", this.changetype)
            .onSnapshot((snapshot) => {
              const loadedFees = [];
              snapshot.forEach((doc) => {
                const loadedFee = doc.data();
                (loadedFee.id = doc.id), loadedFees.push(loadedFee);
              });
              this.feestructure = loadedFees;
            })
    },
    deleterecord(row){
fb.recordsCollection.doc(row.id).delete()
    }
  }
};
</script>
