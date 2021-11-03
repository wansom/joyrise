<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Counter Widgets -->
		<a-row :gutter="24">
			<a-col :span="24" :lg="12" :xl="6" class="mb-24">
				<!-- Widget 1 Card -->
				<WidgetCounter
				></WidgetCounter>
				<!-- / Widget 1 Card -->
				
			</a-col>
			<a-col :span="24" :lg="12" :xl="6" class="mb-24">
				<!-- Widget 2 Card -->
				<WidgetBalance></WidgetBalance>
				<!-- / Widget 2 Card -->
				
			</a-col>
		</a-row>
		<!-- / Counter Widgets -->

		<!-- Charts -->
		<!-- <a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="10" class="mb-24"> -->

				<!-- Active Users Card -->
				<!-- <CardBarChart></CardBarChart> -->
				<!-- Active Users Card -->

			<!-- </a-col>
			<a-col :span="24" :lg="14" class="mb-24"> -->
				
				<!-- Sales Overview Card -->
				<!-- <CardLineChart></CardLineChart> -->
				<!-- / Sales Overview Card -->
<!-- 
			</a-col>
		</a-row> -->
		<!-- / Charts -->

		<!-- Table & Timeline -->
		<a-row :gutter="24" type="flex" align="stretch">
			<!-- Table -->
			<a-col :span="24"  class="mb-24">
				
				<!-- Projects Table Card -->
				<CardProjectTable
					:data="voters"
					:columns="tableColumns"
					:rowKey="voters.id"
				></CardProjectTable>
				<!-- / Projects Table Card -->
				
			</a-col>
			<!-- / Table -->
		</a-row>
		<!-- / Table & Timeline -->


	</div>
</template>

<script>

	// Bar chart for "Active Users" card.
	import CardBarChart from '../components/Cards/CardBarChart' ;

	// Line chart for "Sales Overview" card.
	import CardLineChart from '../components/Cards/CardLineChart' ;

	// Counter Widgets
	import WidgetCounter from '../components/Widgets/WidgetCounter' ;
	//widget for balance
	import WidgetBalance from '../components/Widgets/WidgetBalance.vue';

	// "Projects" table component.
	import CardProjectTable from '../components/tables/StudentsTable.vue' ;

	// Order History card component.
	import CardOrderHistory from '../components/Cards/CardOrderHistory' ;

	// Information card 1.
	import CardInfo from '../components/Cards/CardInfo' ;

	// Information card 2.
	import CardInfo2 from '../components/Cards/CardInfo2' ;



	// "Projects" table list of columns and their properties.
	const tableColumns = [

		{
			title: 'NAME',
			dataIndex: 'NAME',
			scopedSlots: { customRender: 'name' },
			width: 300,
		},
		{
			title: 'GRADE',
			dataIndex: 'level',
			class: 'font-bold text-muted text-sm',
		},
		{
			title: 'AMOUNT PAID',
			dataIndex: 'Paid',
			class: 'font-bold text-muted text-sm',
		},
		{
			title: 'BALANCE',
			scopedSlots: { customRender: 'completion' },
			dataIndex: 'completion',
		},
	];

import {mapState} from "vuex";
	export default ({
		components: {
			CardBarChart,
			CardLineChart,
			WidgetCounter,
			CardProjectTable,
			CardOrderHistory,
			CardInfo,
			CardInfo2,
			WidgetBalance
		},
		data() {
			return {


				// Associating table columns with its corresponding property.
				tableColumns,
				
			}
		},
		  created(){
    this.$store.dispatch("getVoters")
	this.$store.dispatch("getVotes")
	this.$store.dispatch("getReports")
  },
  computed:{
    ...mapState(["voters"])
  }
	})

</script>

<style lang="scss">
</style>