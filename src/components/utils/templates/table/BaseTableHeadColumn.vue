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
	position: relative
	padding: 0 rem(28) rem(30) 0
	margin: 0

	font-size: var(--fontSizeP3)
	font-weight: 500
	line-height: var(--lineHeightP1)

	text-align: left
	vertical-align: bottom

	+until-tablet
		padding: 0 rem(16) rem(18) 0

	&::after
		content: ""
		position: absolute
		bottom: rem(18)
		left: 0

		height: 2px
		width: 100%

		border-radius: 0
		background-color: var(--color-primary)

		+until-tablet
			bottom: rem(8)

	&:first-child
		&:after
			border-radius: var(--radius-divider) 0 0 var(--radius-divider)

	&:last-child
		padding-right: rem(24)

		&:after
			border-radius: 0 var(--radius-divider) var(--radius-divider) 0

</style>
