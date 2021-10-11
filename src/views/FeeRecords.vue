<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->
    <!--modal start-->
    <a-modal v-model="visible" :title="student.name">
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
            placeholder="amount in shillings"
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
            placeholder="Select method"
           
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
            placeholder="Select a term"
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
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--modal end-->
    <!--htnl to pdf model-->
    <div>
      <a-modal v-model="visible" title="Print Receipt" @ok="handleOk">
        <div>
          <vue-html2pdf
            :show-layout="true"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="hee hee"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="landscape"
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
                    <h2>School Info</h2>
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
                      Name : {{ student.name }}<br />
                      Grade : {{ student.grade }}<br />
                      Term : One<br />
                    </p>
                  </div>
                </div>

                <div id="bot">
                  <div id="table">
                    <table>
                      <tr class="tabletitle">
                        <td class="item"><h2>Item</h2></td>
                        <td class="Hours"><h2>Qty</h2></td>
                        <td class="Rate"><h2>Sub Total(KSH)</h2></td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Tution Fee</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">3750.00</p>
                        </td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Medical Fee</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">3</p></td>
                        <td class="tableitem">
                          <p class="itemtext">225.00</p>
                        </td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Activity Fee</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">5</p></td>
                        <td class="tableitem">
                          <p class="itemtext">1750.00</p>
                        </td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">E.W.&C</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem"><p class="itemtext">00.00</p></td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem"><p class="itemtext">Lunch</p></td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">750.00</p>
                        </td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Personal Emoluments</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">750.00</p>
                        </td>
                      </tr>
                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Exam Fee</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">750.00</p>
                        </td>
                      </tr>

                      <tr class="service">
                        <td class="tableitem"><p class="itemtext">PTA</p></td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">150.00</p>
                        </td>
                      </tr>
                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Development Fund</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem"><p class="itemtext">00.00</p></td>
                      </tr>
                      <tr class="service">
                        <td class="tableitem">
                          <p class="itemtext">Transport</p>
                        </td>
                        <td class="tableitem"><p class="itemtext">1</p></td>
                        <td class="tableitem">
                          <p class="itemtext">750.00</p>
                        </td>
                      </tr>

                      <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>E&OE</h2></td>
                        <td class="payment"><h2>0.00</h2></td>
                      </tr>

                      <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>Total</h2></td>
                        <td class="payment"><h2>3,644.25</h2></td>
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
      </a-modal>
    </div>
    <!--html to PDF end-->
    <a-card
      :bordered="false"
      class="card-profile-head"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12" class="col-info">
            <a-avatar :size="74" shape="square" src="images/stIsaacLogo.png" />
            <div class="avatar-info">
              <h4 class="font-semibold m-0">{{ student.name }}</h4>
              <p>Grade: {{ student.grade }}</p>
            </div>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-button @click="showModal">ADD NEW RECORD</a-button>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <FeesTable></FeesTable>
  </div>
</template>

<script>
import FeesTable from "../components/tables/FeesTable";
import VueHtml2pdf from "vue-html2pdf";

import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  data() {
    return {
      student: this.$route.params.student,
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      feestructure: {},
      changetype:"",
      arreas:0,
      carried_forward:0
    };
  },
  components: {
    FeesTable,
    VueHtml2pdf
  },
  computed: {
    ...mapState(["fees"]),
  },
  methods: {
    studentlog() {
      console.log(this.$route.params.student);
    },
    showModal() {
      this.visible = !this.visible;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {  
          const balance = this.feestructure[0].amount - parseInt(values.amount) 
          if(balance>0){
            this.arreas =balance
          }else{
            this.carried_forward = balance
          }
          fb.recordsCollection.add({
            amount:values.amount,
            balance:this.arreas,
            carried_forward:this.carried_forward,
            payment_method:values.method,
            term:values.term,
            record_type:values.recordtype,
            student_id:this.student.id
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
  },
  created() {
    this.$store.dispatch("getRecords", this.student);
    this.$store.dispatch("getFees");
  },
};
</script>

<style></style>
