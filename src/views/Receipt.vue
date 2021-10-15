<template>
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
                      Name : {{ student.name }}<br />
                      Grade : {{ student.grade }}<br />
                      Term : {{term}}<br />
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

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  data() {
    return {
      columns,
       receipt:false,
    };
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
}
</script>

<style>

</style>