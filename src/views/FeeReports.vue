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
			title: 'Voter ID',
			dataIndex: 'user',
			scopedSlots: { customRender: 'author' },
		},
		{
			title: 'President',
			dataIndex: 'President',
			scopedSlots: { customRender: 'Paid' },
		},
				{
			title: 'Governor',
			dataIndex: 'Balance',
			scopedSlots: { customRender: 'balance' },
		},
				{
			title: 'Women Rep',
			dataIndex: 'Term',
			
		},
		{
			title: 'MCA',
			dataIndex: 'Carry Forward',
			class: 'text-muted',
		},
		{
			title: 'MP',
			dataIndex: 'Carry Forward',
			class: 'text-muted',
		},

	];

	export default {
		data() {
			return {
				columns,
			};
		},
		  computed: {
    ...mapState(["votes"]),
    namesplit: function() {
      return this.student.name.split(/\s+/);
    },
  },
	};
</script>