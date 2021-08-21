<template>
  <a-table :columns="columns" :data-source="data" rowKey="id">
    <a slot="action"  href="javascript:;">EDIT</a>
    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
      <ul>
        <li> Mother's Name: {{ record.mother_name }}</li>
        <li>Father's Name: {{record.father_name}}</li>
        <li>
          Date of birth: {{record.dob}}
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
  { title: 'Balance', dataIndex: 'balance', key: 'balance' },
  
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
};
</script>
