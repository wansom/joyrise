<template>
	<a-table :columns="columns" :data-source="reports" :pagination="false" rowKey="id">

		<template slot="Name" slot-scope="Name">
			<div class="table-avatar-info">
				<div class="avatar-info">
					<h6>{{Name}}</h6>
				
				</div>
			</div>
		</template>

		<template slot="Paid" slot-scope="Paid">
			<div class="author-info">
				<h6 class="m-0">{{ Paid }}</h6>
			</div>
		</template>
				<template slot="Balance" slot-scope="Balance">
			<div class="author-info">
				<h6 class="m-0">{{ Balance }}</h6>
			</div>
		</template>
			<template slot="Term" slot-scope="Term">
			<div class="author-info">
				<h6 class="m-0">{{Term}}</h6>
			</div>
		</template>
		
		<template slot="Carry Forward" slot-scope="CarryForward">
			<div class="author-info">
				<h6 class="m-0">{{ CarryForward }}</h6>
			</div>
		</template>

	</a-table>
</template>
<script>
import { mapState } from "vuex";
	const columns = [
		{
			title: 'Name',
			dataIndex: 'Name',
			scopedSlots: { customRender: 'author' },
		},
		{
			title: 'Amount',
			dataIndex: 'Paid',
			scopedSlots: { customRender: 'Paid' },
		},
				{
			title: 'Balance',
			dataIndex: 'Balance',
			scopedSlots: { customRender: 'balance' },
		},
				{
			title: 'Term',
			dataIndex: 'Term',
			
		},
		{
			title: 'Carried Forward',
			dataIndex: 'Carry Forward',
			class: 'text-muted',
		},

	];

	const data = [
		{
			key: '1',
			author: {
				avatar: '/images/face-2.jpg',
				name: 'Michael John',
				email: 'michael@mail.com',
			},
			func: {
				job: 'Manager',
				department: 'Organization',
			},
			status: 1,
			employed: '23/04/18',
		},
		{
			key: '2',
			author: {
				avatar: '/images/face-3.jpg',
				name: 'Alexa Liras',
				email: 'alexa@mail.com',
			},
			func: {
				job: 'Programator',
				department: 'Developer',
			},
			status: 0,
			employed: '23/12/20',
		},
		{
			key: '3',
			author: {
				avatar: '/images/face-1.jpg',
				name: 'Laure Perrier',
				email: 'laure@mail.com',
			},
			func: {
				job: 'Executive',
				department: 'Projects',
			},
			status: 1,
			employed: '13/04/19',
		},
		{
			key: '4',
			author: {
				avatar: '/images/face-4.jpg',
				name: 'Miriam Eric',
				email: 'miriam@mail.com',
			},
			func: {
				job: 'Marketing',
				department: 'Organization',
			},
			status: 1,
			employed: '03/04/21',
		},
		{
			key: '5',
			author: {
				avatar: '/images/face-5.jpeg',
				name: 'Richard Gran',
				email: 'richard@mail.com',
			},
			func: {
				job: 'Manager',
				department: 'Organization',
			},
			status: 0,
			employed: '23/03/20',
		},
		{
			key: '6',
			author: {
				avatar: '/images/face-6.jpeg',
				name: 'John Levi',
				email: 'john@mail.com',
			},
			func: {
				job: 'Tester',
				department: 'Developer',
			},
			status: 0,
			employed: '14/04/17',
		},
	];

	export default {
		data() {
			return {
				data,
				columns,
			};
		},
		  computed: {
    ...mapState(["reports"]),
    namesplit: function() {
      return this.student.name.split(/\s+/);
    },
  },
	};
</script>