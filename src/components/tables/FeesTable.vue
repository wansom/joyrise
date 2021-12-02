<template>
  <a-table :columns="columns" :data-source="records" :pagination="false" rowKey='id'>
    <template slot="author" slot-scope="amount">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>Ksh{{ amount}}</h6>
        </div>
      </div>
    </template>
    <template >
        <div>
        hello
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
            :placeholder="row.date"
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
			<a-button type="link" :data-id="row.key" class="btn-edit" @click="()=>{
        deleteRow(row)}">
       Delete     
			</a-button></template>
      <template slot="printBtn" slot-scope="row">     
			<a-button type="link" :data-id="row.key" class="btn-edit" @click=" generateReport">
       PRINT 
			</a-button>
       <div>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="student.name"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content" class="pdf">
            <!-- PDF Content Here -->
             <div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="images/stIsaacLogo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Invoice #: 123<br />
									Created:{{ new Date().toDateString() }}<br />
									
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									St. Isaac Township School.<br />
									P>O Box<br />
									Vihiga,Kenya
								</td>

								<td>
									{{student.name}}<br />
									Grade:{{student.grade}}<br />
									Term:{{row.term}}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>{{row.payment_method}} #</td>
				</tr>

				<tr class="details">
					<td>{{row.payment_method}}</td>

					<td>#</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>School Fees</td>

					<td>KES {{row.amount}}</td>
				</tr>

			
				<tr class="total">
					<td></td>

					<td>Total:KES {{row.amount}}</td>
				</tr>
			</table>
		</div>
        </section>
    </vue-html2pdf>
   </div>
      </template>
  </a-table>
</template>
<script>
import { mapState } from "vuex";
import VueHtml2pdf from "vue-html2pdf";


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
    	{
			title: '',
			scopedSlots: { customRender: 'printBtn' },
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
      paidamount:0,
      student: this.$route.params.student
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
            amount:values.amount,
            balance:this.arreas,
            carried_forward:this.carried_forward,
            payment_method:values.method,
            term:values.term,
            record_type:values.recordtype,
            student_id:this.student.id,
            date: new Date(values.date)
          });
          fb.studentCollection.doc(this.student.id).update({
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
    deleteRow(row){
      this.$store.dispatch('deleteRecord',{
        id:row.id
      })
    },
      generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(e){
           this.$message.success(`task started.....`);
        },
        hasGenerated(e){
         this.$message.success(`PDF generated successfully!`); 
        }
  }
};
</script>
<style scoped>
	.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
</style>