<template>
  <a-table :columns="columns" :data-source="records" :pagination="false" rowKey='id'>
    <template slot="author" slot-scope="amount">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>Ksh{{ amount}}</h6>
        </div>
      </div>
    </template>
    <template slot-scope="row">
        <div>
          <vue-html2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            :filename="student.name"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="500px"
            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
          >
            <section slot="pdf-content">
              <!-- PDF Content Here -->
              <div id="invoice-POS">
                <center id="top">
                  <div class="logo"></div>
                  <div class="info">
                    <h2>St.Isaac Academy</h2>
                  </div>
                  <!--End Info-->
                </center>
                <!--End InvoiceTop-->

                <div id="mid">
                  <div class="info">
                    <p>
                      P.O BOX : 53-5006<br />
                      date : {{ new Date().toDateString() }}<br />
                      Phone : 555-555-5555<br />
                    </p>
                  </div>
                </div>
                <!--End Invoice Mid-->
                <div id="mid">
                  <div class="info">
                    <h2>Student Details</h2>
                    <p>
                      Name : {{row.id}}<br />
                      Grade : {{row.id}}<br />
                      Term : {{row.id}}<br />
                    </p>
                  </div>
                </div>

                <div id="bot">
                  <div id="table">
                    <table>
                    

                      <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>Total</h2></td>
                        <td class="payment"><h2>{{paidamount}}</h2></td>
                      </tr>
                    </table>
                  </div>
                  <!--End Table-->

                  <div id="legalcopy">
                    <p class="legal">
                      <strong>Thank you for you!</strong> <br />
                      Balance_______________________________ <br /><br />
                      signature ______________________________ <br />
                      All fees shuld be paid to the official school bank account
                      or paybill.
                    </p>
                  </div>
                </div>
                <!--End InvoiceBot-->
              </div>
            </section>
          </vue-html2pdf>
        </div>
    </template> 
    <template slot="func" slot-scope="payment_method">
      <div class="author-info">
        <h6 class="m-0">{{ payment_method}}</h6>
      </div>
    </template>

    <template slot="status" slot-scope="term">
     <div class="author-info">
        <h6 class="m-0">{{term}}</h6>
      </div>
    </template>
     <template slot="caried" slot-scope="carried_forward">
      <div class="author-info">
        <h6 class="m-0">{{carried_forward}}</h6>
      </div>
    </template>

  <template slot="balance" slot-scope="balance">
      <div class="author-info">
        <h6 class="m-0">{{balance}}</h6>
      </div>
    </template>
    <template slot="date" slot-scope="date">
      <div class="author-info">
        <h6 class="m-0">{{date.toDate().toDateString()}}</h6>

      </div>
    </template>
    <template slot="editBtn" slot-scope="row">     
			<a-button type="link" :data-id="row.key" class="btn-edit" @click="reveal(row)">
       EDIT      
			</a-button>
      <a-modal v-model="receipt" title="Download Receipt">
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
                rules: [
                  { required: true, message: 'Please enter the amount paid!' },
                ],
              },
            ]"
            :placeholder="row.amount"
          />
        </a-form-item>
      
        <a-form-item label="Payment method">
          <a-select
            v-decorator="[
              'method',
              {
                rules: [
                  { required: true, message: 'Please select payment method!' },
                ],
              },
            ]"
            :placeholder="row.payment_method"
           
          >
            <a-select-option value="mpesa">
              MPESA
            </a-select-option>
            <a-select-option value="bank">
              Bank Slip
            </a-select-option>
          </a-select>
        </a-form-item>
       <a-form-item label="Record Type">
          <a-select
            v-decorator="[
              'recordtype',
              {
                rules: [
                  { required: true, message: 'Please select type of record!' },
                ],
              },
            ]"
            placeholder="Select record type"
            @change="recordChange"
          >
            <a-select-option value="transport">
              TRANSPORT
            </a-select-option>
            <a-select-option value="tuition">
              TUITION
            </a-select-option>
          </a-select>
        </a-form-item>
          <a-form-item label="Term">
          <a-select
            v-decorator="[
              'term',
              {
                rules: [{ required: true, message: 'Please select the term!' }],
              },
            ]"
            :placeholder="row.term"
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
         <a-form-item label="Date" >
          <a-input
          type="date"
            v-decorator="[
              'date',
              {
                rules: [
                  { required: true, message: 'Please enter the for record!' },
                ],
              },
            ]"
            placeholder="enter date"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
      </a-modal>
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
import VueHtml2pdf from "vue-html2pdf";
import * as fb from "@/firebase";

const columns = [
  {
    title: "AMOUNT PAID",
    dataIndex: "amount",
    scopedSlots: { customRender: "author" },
  },
  {
    title: "PAID BY",
    dataIndex: "payment_method",
    scopedSlots: { customRender: "func" },
  },
  {
    title: "TERM",
    dataIndex: "term",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "CARRIED FORWARD",
    dataIndex: "carried_forward",
     scopedSlots: { customRender: "carried" },
    class: "text-muted",
  },
   {
    title: "BALANCE",
    dataIndex: "balance",
    scopedSlots: { customRender: "balance" },
  },
   {
    title: "DATE",
    dataIndex: "date",
    scopedSlots: { customRender: "date" },
  },
  	{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
    {
			title: '',
			scopedSlots: { customRender: 'deleteBtn' },
			width: 50,
		},

];

export default {
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
    VueHtml2pdf
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
