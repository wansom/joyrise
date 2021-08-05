<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">STUDENT LIST</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="authorsHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">CLASS 1</a-radio-button>
						<a-radio-button value="online">CLASS 2</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true">

			<template slot="admissionno" slot-scope="admissionno">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="admissionno.avatar" />
					<div class="avatar-info">
						<h6>{{ admissionno.number}}</h6>
					</div>
				</div>
			</template>

			<template slot="name" slot-scope="name">
				<div class="author-info">
					<h6 class="m-0">{{ name.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ name.department }}</p>
				</div>
			</template>

			<template slot="level" slot-scope="level">
				<a-tag class="tag-status" :class="level ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ level }}
				</a-tag>
			</template>

			<template slot="editBtn" slot-scope="row">
				<a-button type="link" :data-id="row.key" class="btn-edit">
					Edit
				</a-button>
			</template>

		</a-table>
	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
			}
		},
	})

</script>