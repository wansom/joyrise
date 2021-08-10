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
	import CardStudentstable from '../components/Cards/CardStudentstable' ;
	import {mapState} from 'vuex';


	
	// "Authors" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'NAME',
			dataIndex: 'NAME',
			scopedSlots: { customRender: 'name' },
		},
		{
			title: 'GRADE',
			dataIndex: 'grade',
			scopedSlots: { customRender: 'grade' },
		},
		{
			title: 'BALANCE',
			dataIndex: 'Paid',
			class: 'text-muted',
		},
		{
			title: '',
			scopedSlots: { customRender: 'viewBtn' },
			width: 50,
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
		
		{
			title: '',
			scopedSlots: { customRender: 'deleteBtn' },
			width: 50,
		},
	];

	// "Authors" table list of rows and their properties.
	const table1Data = [
		{
			key: '1',
			admissionno: {
				avatar: 'images/face-2.jpg',
				number: '1223',
				email: 'michael@mail.com',
			},
			name: {
				job: 'Manager',
				department: 'Organization',
			},
			level: 1,
			balance: '333445',
		},
		{
			key: '2',
			admissionno: {
				avatar: 'images/face-6.jpeg',
				number: '123',
				email: 'john@mail.com',
			},
			name: {
				job: 'Tester',
				department: 'Developer',
			},
			level: 4,
			balance: '8899',
		},
	];
	
	// "Projects" table list of columns and their properties.
	const table2Columns = [
		{
			title: 'COMPANIES',
			dataIndex: 'company',
			scopedSlots: { customRender: 'company' },
			width: 300,
		},
		{
			title: 'BUDGET',
			dataIndex: 'budget',
			class: 'font-semibold text-muted',
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: 'COMPLETION',
			scopedSlots: { customRender: 'completion' },
			dataIndex: 'completion',
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	];

	// "Projects" table list of rows and their properties.
	const table2Data = [
		{
			key: '1',
			company: {
				name: 'Spotify Version',
				logo: 'images/logos/logo-spotify.svg',
			},
			status: "working",
			budget: '$14,000',
			completion: 60,
		},
		{
			key: '2',
			company: {
				name: 'Progress Track',
				logo: 'images/logos/logo-atlassian.svg',
			},
			status: "working",
			budget: '$3,000',
			completion: 10,
		},
		{
			key: '3',
			company: {
				name: 'Jira Platform Errors',
				logo: 'images/logos/logo-slack.svg',
			},
			status: "done",
			budget: 'Not Set',
			completion: {
				status: 'success',
				value: 100,
			},
		},
		{
			key: '4',
			company: {
				name: 'Launch new Mobile App',
				logo: 'images/logos/logo-spotify.svg',
			},
			status: "canceled",
			budget: '$20,600',
			completion: {
				status: 'exception',
				value: 50,
			},
		},
		{
			key: '5',
			company: {
				name: 'Web Dev',
				logo: 'images/logos/logo-webdev.svg',
			},
			status: "working",
			budget: '$4,000',
			completion: 80,
		},
		{
			key: '6',
			company: {
				name: 'Redesign Online Store',
				logo: 'images/logos/logo-invision.svg',
			},
			status: "canceled",
			budget: '$2,000',
			completion: {
				status: 'exception',
				value: 0,
			},
		},
	];

	export default ({
		components: {
			CardStudentstable,
		},
		data() {
			return {
				// Associating "Authors" table data with its corresponding property.
				table1Data: table1Data,

				// Associating "Authors" table columns with its corresponding property.
				table1Columns: table1Columns,

				// Associating "Projects" table data with its corresponding property.
				table2Data: table2Data,

				// Associating "Projects" table columns with its corresponding property.
				table2Columns: table2Columns,
			}
		},
		computed:{
			...mapState(["students"])
		},
		created(){
			this.$store.dispatch("getstudents")
		}
	})

</script>

<style lang="scss">
</style>