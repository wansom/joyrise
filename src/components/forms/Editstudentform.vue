<template>


  <!-- Profile Information Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full card-profile-information"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
    :headStyle="{ paddingRight: 0 }"
  >
    <div>
    <a-modal v-model="visible" title="Print Receipt" @ok="handleOk">
      <div id="invoice-POS">
    
    <center id="top">
      <div class="logo"></div>
      <div class="info"> 
        <h2>St.Isaac Academy</h2>
      </div><!--End Info-->
    </center><!--End InvoiceTop-->
    
    <div id="mid">
      <div class="info">
        <h2>Contact Info</h2>
        <p> 
            Address : street city, state 0000<br>
            Email   : JohnDoe@gmail.com<br>
            Phone   : 555-555-5555<br>
        </p>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

					<div id="table">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>Item</h2></td>
								<td class="Hours"><h2>Qty</h2></td>
								<td class="Rate"><h2>Sub Total</h2></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Communication</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="tableitem"><p class="itemtext">$375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Asset Gathering</p></td>
								<td class="tableitem"><p class="itemtext">3</p></td>
								<td class="tableitem"><p class="itemtext">$225.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Design Development</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="tableitem"><p class="itemtext">$375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation</p></td>
								<td class="tableitem"><p class="itemtext">20</p></td>
								<td class="tableitem"><p class="itemtext">$1500.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation Revisions</p></td>
								<td class="tableitem"><p class="itemtext">10</p></td>
								<td class="tableitem"><p class="itemtext">$750.00</p></td>
							</tr>


							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>tax</h2></td>
								<td class="payment"><h2>$419.25</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2>$3,644.25</h2></td>
							</tr>

						</table>
					</div><!--End Table-->

					<div id="legalcopy">
						<p class="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
						</p>
					</div>

				</div><!--End InvoiceBot-->
  </div><!--End Invoice-->
    </a-modal>
  </div>
    <template #title>
      <h6 class="font-semibold m-0">Edit Student</h6>
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
      <a-tabs default-active-key="1" >
        <a-tab-pane key="1" tab="Student Information">
     
      <a-form-item class="mb-10" label="Student Name">
            <a-input
              v-decorator="[
                'name',
                {
                },
              ]"
              :placeholder=" student.name"
            >
            </a-input>
          </a-form-item>
            
          <a-form-item class="mb-10" label="Birth Date">
            <a-input
              v-decorator="[
                'birth_date',
                {
                  rules: [{ required: false, message: 'please pick a date' }],
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
                  rules: [{ required: false, message: 'please pick a date' }],
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
                  rules: [{ required: false, message: 'please pick a date' }],
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
          { rules: [{ required: false, message: 'Please select your gender!' }] },
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
          { rules: [{ required: false, message: 'No grade selected!' }] },
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
                    { required: false, message: 'Please input home address!' },
                  ],
                },
              ]"
              placeholder="Home Address"
            >
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Fees & Payment">
              <a-form-item class="mb-10">
            <a-input
            label="Amount received"
              v-decorator="[
                'amount',
                {
                  rules: [
                    { required: false, message: 'Please input home address!' },
                  ],
                },
              ]"
              placeholder="Amount "
            >
            </a-input>
          </a-form-item>
          <a-form-item label="payment_method">
      <a-select
        v-decorator="[
          'payment_method',
          { rules: [{ required: false, message: 'Select payment method!' }] },
        ]"
        placeholder="Select payment method"
      >
        <a-select-option value='bank' >
         Bank
        </a-select-option>
        <a-select-option value='mpesa' >
         Mpesa
        </a-select-option>
        <a-select-option value='cash' >
         Cash
        </a-select-option>
      </a-select>
    </a-form-item>
      <a-form-item label="Term?">
      <a-select
        v-decorator="[
          'term',
          { rules: [{ required: false, message: 'Select term!' }] },
        ]"
        placeholder="Select term"
      >
        <a-select-option value='one' >
         One
        </a-select-option>
        <a-select-option value='two' >
         Two
        </a-select-option>
        <a-select-option value='three' >
         three
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
              Edit Records
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
    	props: {
			student: {
				type: Object,
				default: () => {},
			},
	
		},
  data() {
    return {
      gender: "",
      visible: false,
      
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
         if(values.amount>0){
              console.log(values)
              this.visible =true
         }

          this.$message.success(`records added successfully.`);

        }else{
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err)
           this.$message.error(`check your values and try again`);
        }
      });
    },

  },
  computed:{
    ...mapState(["grades"]),
    namesplit:function(){
        return this.student.name.split(/\s+/)
    }
  },
  mounted(){
    this.$store.dispatch("getClasses")
  }
};
</script>
<style scoped lang="scss">
#invoice-POS{
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding:2mm;
  margin: 0 auto;
  width: 100%;
  background: #FFF;
  
  
::selection {background: #f31544; color: #FFF;}
::moz-selection {background: #f31544; color: #FFF;}
h1{
  font-size: 1.5em;
  color: #222;
}
h2{font-size: .9em;}
h3{
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p{
  font-size: .7em;
  color: #666;
  line-height: 1.2em;
}
 
#top, #mid,#bot{ /* Targets all id with 'col-' */
  border-bottom: 1px solid #EEE;
}

#top{min-height: 100px;}
#mid{min-height: 80px;} 
#bot{ min-height: 50px;}

#top .logo{
  //float: left;
	height: 60px;
	width: 60px;
	background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
	background-size: 60px 60px;
}
.clientlogo{
  float: left;
	height: 60px;
	width: 60px;
	background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
	background-size: 60px 60px;
  border-radius: 50px;
}
.info{
  display: block;
  //float:left;
  margin-left: 0;
}
.title{
  float: right;
}
.title p{text-align: right;} 
table{
  width: 100%;
  border-collapse: collapse;
}
td{
  padding: 5px 0 5px 15px;
  border: 1px solid #EEE
}
.tabletitle{
  //padding: 5px;
  font-size: .5em;
  background: #EEE;
}
.service{border-bottom: 1px solid #EEE;}
.item{width: 24mm;}
.itemtext{font-size: .5em;}

#legalcopy{
  margin-top: 5mm;
}

  
  
}
</style>
