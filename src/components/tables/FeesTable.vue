<template>
  <a-table :columns="columns" :data-source="records" :pagination="false" rowKey='id'>
    <template slot="author" slot-scope="amount">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>Ksh{{ amount}}</h6>
        </div>
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
  </a-table>
</template>
<script>
import { mapState } from "vuex";
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

];

export default {
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState(["records"]),
  },
};
</script>
