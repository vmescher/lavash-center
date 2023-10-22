<script lang="ts">
import {defineComponent, inject} from 'vue'

export default defineComponent({
	name: "BaseTableColumn",
	props: {
		isWide: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		}
	},
	setup() {
		const isAdaptive = inject('adaptive') as boolean;
		return {
			isAdaptive
		}
	}
})
</script>

<template>
	<td class="table-column" :class="{'table-column--adaptive': isAdaptive}" :colspan="isWide ? '100%' : ''">
		<span v-if="label" class="table-column__label">{{ label }}</span>
		<slot></slot>
	</td>
</template>

<style scoped lang="sass">
.table-column
	padding: fluid(16, 24) fluid(20, 28) fluid(16, 24) 0

	vertical-align: top

	+until-tablet
		padding: fluid(12, 16) fluid(16, 20) fluid(12, 16) 0

	&:first-child
		padding-left: fluid(16, 24)

		+until-tablet
			padding-left: fluid(12, 16)

	&:last-child
		padding-right: fluid(16, 24)

		+until-tablet
			padding-right: fluid(12, 16)

	&--adaptive
		+until-tablet
			display: flex
			flex-direction: column
			padding: 0

			vertical-align: initial
			text-align: right

		&:first-child
			+until-tablet
				padding-left: 0

		&:last-child
			+until-tablet
				padding-right: 0

		& .table-column
			&__label
				+until-tablet
					display: block

	&__label
		display: none
		margin-bottom: rem(8)

		font-size: var(--fontSizeP3)
		line-height: var(--lineHeightP1)
		font-weight: 500


</style>
