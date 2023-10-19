<script lang="ts">
import {defineComponent} from 'vue'
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";

export default defineComponent({
	name: "BaseTableColumnActions",
	components: {BaseTableColumn},
	props: {
		label: {
			type: String,
			default: ''
		}
	}
})
</script>

<template>
	<BaseTableColumn :label="label" class="table-column--actions">
		<div class="table-actions">
			<slot></slot>
		</div>
	</BaseTableColumn>
</template>

<style scoped lang="sass">
.table-actions
	display: flex
	align-items: center
	gap: rem(8)

.table-column
	&--actions
		+until-tablet
			width: 100%

</style>
