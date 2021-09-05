<template>
  <a-table :columns="columns" :data-source="data" rowKey="id">
    <a  slot="action"  slot-scope="record" @click="()=>{
      tryRecord(record)}">

    <router-link  :to="{name:'Editstudent', params:{student:record}}" >EDIT </router-link>
    </a>
    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
      <ul>
        <li> Mother's Name: {{ record.mother_name }}</li>
        <li>Father's Name: {{record.father_name}}</li>
        <li>
          Date of birth: {{record.birth_date}}
        </li>
        <li>Father's Phone: {{record.father_phone}}</li>
        <li>mother's Phone: {{record.mother_phone}}</li>
      </ul>
    </p>
  </a-table>
</template>
<script>
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Arreas', dataIndex: 'balance', key: 'balance' },
   { title: 'Carried Forward', dataIndex: 'carried_forward', key: 'carried_forward' },
  
  { dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, fixed:"right" },
];

export default {
  	props: {
			data: {
				type: Array,
				default: () => [],
			},
	
		},
  data() {
    return {
      columns,
    };
  },
  methods:{
    tryRecord(record){
      console.log(record)
    }
  }
};
</script>
