<template>
  <a-table :columns="columns" :data-source="fees" :pagination="false" rowKey='id'>
       <template slot="recordtype" slot-scope="recordtype">
      <div class="table-avatar-info">
        <div class="avatar-info">
          <h6>{{recordtype}}</h6>
        </div>
      </div>
    </template>
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

  <template slot="date" slot-scope="date">
      <div class="author-info">
        <h6 class="m-0">{{date.toDate().toDateString()}}</h6>
      </div>
    </template>
  </a-table>
</template>
<script>
import { mapState } from "vuex";
const columns = [
     {
    title: "RECORD TYPE",
    dataIndex: "recordtype",
    scopedSlots: { customRender: "recordtype" },
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    scopedSlots: { customRender: "author" },
  },
    {
    title: "BOARDING",
    dataIndex: "boarding",
     scopedSlots: { customRender: "carried" },
    class: "text-muted",
  },
  {
    title: "LEVELS",
    dataIndex: "level",
    scopedSlots: { customRender: "func" },
  },
  {
    title: "TERM",
    dataIndex: "term",
    scopedSlots: { customRender: "status" },
  },

   {
    title: "DATE",
    dataIndex: "date",
    scopedSlots: { customRender: "date" },
  },

];

export default {
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState(["fees"]),
  },
};
</script>
