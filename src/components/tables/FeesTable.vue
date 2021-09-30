<template>
  <a-table :columns="columns" :data-source="records" :pagination="false" rowKey='id'>
    <template slot="author" slot-scope="amount">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>Ksh{{ amount}}</h6>
        </div>
      </div>
    </template>
    <template  slot-scope="row" >
        <!--html to pdf model-->
    <div>
      <a-modal v-model="receipt" title="Download Receipt" >
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
                      Name : {{ row.id }}<br />
                      Grade : {{ row.amount }}<br />
                      Term : {{row.amount}}<br />
                    </p>
                  </div>
                </div>

                <div id="bot">
                  <div id="table">
                    <table>
                    

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
        <h6 class="m-0">{{date}}</h6>
      </div>
    </template>
    <template slot="editBtn" slot-scope="row">
			<a-button type="link" :data-id="row.key" class="btn-edit" @click="reveal(row)">
				Edit
       
			</a-button>   
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
    scopedSlots: { customRender: "balance" },
  },
  	{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},

];

export default {
  data() {
    return {
      columns,
       receipt:false,
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
      console.log(row)
      this.receipt =!this.receipt
    }
  }
};
</script>
