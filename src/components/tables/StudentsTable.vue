<template>
  <a-table :columns="columns" :data-source="data" rowKey="user">
        <div
      slot="filterDropdown"
      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="c => (searchInput = c)"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        style="width: 188px; margin-bottom: 8px; display: block;"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
      />
      <a-button
        type="primary"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
      >
        Search
      </a-button>
      <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
        Reset
      </a-button>
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
     <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <!-- <a  slot="fees"  slot-scope="record">

    <router-link  :to="{name:'Feerecords', params:{student:record}}" >VIEW RECORDS</router-link>
    </a>
     
    <a  slot="action"  slot-scope="record">

    <router-link  :to="{name:'Editstudent', params:{student:record}}" >EDIT </router-link>
    </a>
    <a  slot="delete"  slot-scope="record" >

   <a-button type="link" :data-id="record.key" class="btn-edit" @click="deleterecord(record)">
       DELETE
			</a-button>
    </a> -->
    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
      <ul>
        <li> Mother's Name: {{ record.mother_name }}</li>
        <li>Father's Name: {{record.father_name}}</li>
        <li>
          Date of birth: {{ record.birth_date.toDate().toDateString()}}
        </li>
        <li>Father's Phone: {{record.father_phone}}</li>
        <li>mother's Phone: {{record.mother_phone}}</li>
      </ul>
    </p>
  </a-table>
</template>
<script>
import * as fb from "@/firebase";
export default {
  	props: {
			data: {
				type: Array,
				default: () => [],
			},
	
		},
  data() {
    return {
      columns:[
  { title: 'Name', 
  dataIndex: 'username',
   key: 'username',
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
  { title: 'County', dataIndex: 'county', key: 'county',  scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
             onFilter: (value, record) =>
            record.grade
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }, },

  { title: 'Constituency', dataIndex: 'constituency', key: 'constituency', 
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.balance - b.balance,
  scopedSlots: {
            customRender: 'customRender',
          } },
            { title: 'National ID', dataIndex: 'id', key: 'id' ,  scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          }, },
  // { title: 'Carried Forward', dataIndex: 'carried_forward', key: 'carried_forward' },
  //  { dataIndex: '', key: 'y', scopedSlots: { customRender: 'fees' }},
  // { dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, fixed:"right" },
  //  { dataIndex: '', key: 'z', scopedSlots: { customRender: 'delete' }, fixed:"right" },
],
         searchText: '',
      searchInput: null,
      searchedColumn: '',
    };
  },
  methods:{
    tryRecord(record){
      console.log(record)
    },
        handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
        deleterecord(row){
fb.recordsCollection.doc(row.id).delete()
    }
  }
};
</script>
