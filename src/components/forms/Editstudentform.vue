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
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Student Information">
          <a-form-item class="mb-10" label="Student Name">
            <a-input v-decorator="['name', {}]" :placeholder="student.name">
            </a-input>
          </a-form-item>

          <a-form-item class="mb-10" label="Birth Date">
            <a-input
              v-decorator="[
                'birth_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
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
                  rules: [{ required: true, message: 'please pick a date' }],
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
                  rules: [{ required: true, message: 'please pick a date' }],
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
                {
                  rules: [
                    { required: false, message: 'Please select your gender!' },
                  ],
                },
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
              <a-select-option
                v-for="grade in grades"
                :key="grade.id"
                :value="grade.grade"
              >
                {{ grade.grade }}
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
        
          <a-form-item class="mb-10" label="Boarding School">
              <div v-if="student.boarding">
            <a-switch default-checked @change="addBoarding" />
          </div>
            <div v-else>
              <a-switch  @change="addBoarding" />
            </div>
          </a-form-item>
             <a-form-item class="mb-10" label="School Transport">
              <div v-if="student.transport">
            <a-switch default-checked @change="addTransport" />
          </div>
            <div v-else>
              <a-switch  @change="addTransport" />
            </div>
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
                    {
                      required: false,
                      message: 'Please input fathers phone name!',
                    },
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
        <!-- <a-tab-pane key="3" tab="Confirm & Submit">
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
                {
                  rules: [
                    { required: false, message: 'Select payment method!' },
                  ],
                },
              ]"
              placeholder="Select payment method"
            >
              <a-select-option value="bank">
                Bank
              </a-select-option>
              <a-select-option value="mpesa">
                Mpesa
              </a-select-option>
              <a-select-option value="cash">
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
              <a-select-option value="one">
                One
              </a-select-option>
              <a-select-option value="two">
                Two
              </a-select-option>
              <a-select-option value="three">
                three
              </a-select-option>
            </a-select>
          </a-form-item>

        </a-tab-pane> -->
      </a-tabs>
    </a-form>
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
import { mapState } from "vuex";
import VueHtml2pdf from "vue-html2pdf";
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
      boarding:false,
      transport:false,
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "student_info" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("editStudent", {
            name: values.name ?? this.student.name,
            birth_date:
              new Date(values.birth_date) ?? this.student.birth_date ?? null,
            father_name: values.father_name ?? this.student.father_name ?? null,
            gender: values.gender ?? this.student.gender ?? null,
            grade: values.grade ?? this.student.grade ?? null,
            home_address:
              values.home_address ?? this.student.home_address ?? null,
            mother_name: values.mother_name ?? this.student.mother_name ?? null,
            id: this.student.id ?? null,
            mother_phone:
              values.mother_phone ?? this.student.mother_phone ?? null,
            previous_school:
              values.previous_school ?? this.student.previous_school ?? null,
            admission_date:
              new Date(values.admission_date) ??
              this.student.admission_date ??
              null,
            reporting_date:
              new Date(values.reporting_date) ??
              this.student.reporting_date ??
              null,
              transport:this.student.transport,
              boarding:this.student.boarding
          });
          if (values.amount > 0) {
            //this.$refs.html2Pdf.generatePdf()
            this.visible = true;
          }

          this.$message.success(`records updated successfully.`);
        } else {
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err);
          this.$message.error(`check your values and try again`);
        }
      });
    },
    handleOk() {
      console.log("ok");
      this.$refs.html2Pdf.generatePdf();
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    addBoarding(){
      this.student.boarding =!this.student.boarding;
    },
    addTransport(){
       this.student.transport =!this.student.transport;
    }
  },
  computed: {
    ...mapState(["grades"]),
    namesplit: function() {
      return this.student.name.split(/\s+/);
    },
  },
  mounted() {
    this.$store.dispatch("getClasses");
  },
  components: {
    VueHtml2pdf,
  },
};
</script>
<style scoped lang="scss">
#invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 2mm;
  margin: 0 auto;
  width: 100%;
  background: #fff;

  ::selection {
    background: #f31544;
    color: #fff;
  }
  ::moz-selection {
    background: #f31544;
    color: #fff;
  }
  h1 {
    font-size: 1.5em;
    color: #222;
  }
  h2 {
    font-size: 0.9em;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
  }

  #top,
  #mid,
  #bot {
    /* Targets all id with 'col-' */
    border-bottom: 1px solid #eee;
  }

  #top {
    min-height: 100px;
  }
  #mid {
    min-height: 80px;
  }
  #bot {
    min-height: 50px;
  }

  #top .logo {
    //float: left;
    height: 60px;
    width: 60px;
    background: url(https://firebasestorage.googleapis.com/v0/b/st-isaac.appspot.com/o/stIsaacLogo.png?alt=media&token=329b395a-2d03-4edd-8053-14b8d1474b52)
      no-repeat;
    background-size: 60px 60px;
  }
  .clientlogo {
    float: left;
    height: 60px;
    width: 60px;
    background: url(https://firebasestorage.googleapis.com/v0/b/st-isaac.appspot.com/o/stIsaacLogo.png?alt=media&token=329b395a-2d03-4edd-8053-14b8d1474b52)
      no-repeat;
    background-size: 60px 60px;
    border-radius: 50px;
  }
  .info {
    display: block;
    //float:left;
    margin-left: 0;
  }
  .title {
    float: right;
  }
  .title p {
    text-align: right;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    padding: 5px 0 5px 15px;
    border: 1px solid #eee;
  }
  .tabletitle {
    //padding: 5px;
    font-size: 0.5em;
    background: #eee;
  }
  .service {
    border-bottom: 1px solid #eee;
  }
  .item {
    width: 24mm;
  }
  .itemtext {
    font-size: 0.5em;
  }

  #legalcopy {
    margin-top: 5mm;
  }
}
</style>
