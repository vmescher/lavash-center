<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "BaseTableHeadColumn"
})
</script>

<template>
	<th class="table-title">
		<slot></slot>
	</th>
</template>

<style scoped lang="sass">
.table-title
	padding: 0 rem(28) rem(30) 0
	margin: 0

	font-size: var(--fontSizeP3)
	font-weight: 500
	line-height: var(--lineHeightP1)

	text-align: left
	vertical-align: bottom

	&:last-child
		padding-right: rem(24)

</style>
