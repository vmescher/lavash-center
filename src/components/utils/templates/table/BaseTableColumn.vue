<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "BaseTableColumn",
	props: {
		isWide: {
			type: Boolean,
			default: false
		}
	}
})
</script>

<template>
	<td class="table-column" :colspan="isWide ? '100%' : ''">
		<slot></slot>
	</td>
</template>

<style scoped lang="sass">
.table-column
	padding: rem(24) rem(28) rem(24) 0

	vertical-align: top

	&:first-child
		padding-left: rem(24)

	&:last-child
		padding-right: rem(24)

</style>
