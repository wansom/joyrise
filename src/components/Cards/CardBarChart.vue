<template>

	<!-- Active Users Card -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<chart-bar :height="250" :data="barChartData"></chart-bar>
		<div class="card-title">
			<h6>Learners by Class</h6>
			
		</div>
	
	</a-card>
	<!-- Active Users Card -->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;

	export default ({
		components: {
			ChartBar,
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
					datasets: [{
						label: "Students",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [850, 600, 500, 620, 900, 500, 900, 630, 900],
						maxBarThickness: 20,
					}, ],
				},
			}
		},
	})

</script>