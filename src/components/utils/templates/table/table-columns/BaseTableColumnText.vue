<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";

export default defineComponent({
	name: "BaseTableColumnText",
	components: {BaseTableColumn},
	props: {
		isWide: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		type: {
			type: String as PropType<'' | 'grey' | 'bold'>,
			default: ''
		},
		size: {
			type: String as PropType<'small' | 'medium' | 'large'>,
			default: 'medium'
		},
		noWrap: {
			type: Boolean,
			default: false
		}
	}
})
</script>

<template>
	<BaseTableColumn :is-wide="isWide" :label="label">
		<p class="table-text" :class="[(type ? `table-text--${type}` : ''), { 'table-text--no-wrap' : noWrap}, (size ? `table-text--${size}` : '')]">
			<slot></slot>
		</p>
	</BaseTableColumn>

</template>

<style scoped lang="sass">
.table-text
	max-width: rem(350)

	font-size: var(--fontSizeP2)
	font-weight: 500
	line-height: var(--lineHeightP1)

	+until-tablet
		text-align: right

	&--grey
		color: var(--color-neutral-secondary)

	&--bold
		font-family: var(--font-secondary)
		font-size: var(--fontSizeP1)
		font-weight: 600
		line-height: var(--lineHeightP1)
		text-transform: uppercase

	&--large
		font-size: var(--fontSizeH5)
		line-height: var(--lineHeightH3)

	&--no-wrap
		white-space: nowrap
		text-overflow: ellipsis
		overflow: hidden

</style>
