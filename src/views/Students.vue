<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Authors Table -->
    <a-row :gutter="24" type="flex">
      <!-- Authors Table Column -->
      <a-col :span="24" class="mb-24">
        <!-- Authors Table Card -->
        <CardStudentstable
          :data="students"
          :columns="table1Columns"
        ></CardStudentstable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- / Authors Table -->
  </div>
</template>

<script>
// "Authors" table component.
import CardStudentstable from "../components/tables/StudentsTable.vue";
import { mapState } from "vuex";

// "Authors" table list of columns and their properties.
const table1Columns = [
  {
    title: "NAME",
    dataIndex: "NAME",
	scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender:'customRender',
          },
		  onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
  },
  {
    title: "GRADE",
    dataIndex: "grade",
    scopedSlots: { customRender: "grade" },
  },
  {
    title: "BALANCE",
    dataIndex: "Paid",
    class: "text-muted",
  },
  {
    title: "CARRIED FORWARD",
    dataIndex: "forward",
    class: "text-muted",
  },
  {
    title: "",
    scopedSlots: { customRender: "viewBtn" },
    width: 50,
  },
  {
    title: "",
    scopedSlots: { customRender: "editBtn" },
    width: 50,
  },

  {
    title: "",
    scopedSlots: { customRender: "deleteBtn" },
    width: 50,
  },
];

export default {
  components: {
    CardStudentstable,
  },
  data() {
    return {
      // Associating "students" table columns with its corresponding property.
      table1Columns:[
  {
    title: "NAME",
    dataIndex: "NAME",
	scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
		  onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
  },
  {
    title: "GRADE",
    dataIndex: "grade",
    scopedSlots: { customRender: "grade" },
  },
  {
    title: "BALANCE",
    dataIndex: "Paid",
    class: "text-muted",
  },
  {
    title: "CARRIED FORWARD",
    dataIndex: "forward",
    class: "text-muted",
  },
  {
    title: "",
    scopedSlots: { customRender: "viewBtn" },
    width: 50,
  },
  {
    title: "",
    scopedSlots: { customRender: "editBtn" },
    width: 50,
  },

  {
    title: "",
    scopedSlots: { customRender: "deleteBtn" },
    width: 50,
  },
],

      searchInput: null,
      searchedColumn: "",
    };
  },
  computed: {
    ...mapState(["students"]),
  },
  created() {
    this.$store.dispatch("getvoters");
  },
};
</script>

<style lang="scss"></style>
