<script lang="ts">
import {defineComponent} from 'vue'
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";

export default defineComponent({
	name: "BaseTableColumnActions",
	components: {BaseTableColumn},
})
</script>

<template>
	<BaseTableColumn>
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

</style>
