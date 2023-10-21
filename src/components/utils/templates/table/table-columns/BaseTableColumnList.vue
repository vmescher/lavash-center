<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";

export default defineComponent({
	name: "BaseTableColumnList",
	components: {BaseTableColumn},
	props: {
		isWide: {
			type: Boolean,
			default: false
		},
		type: {
			type: String as PropType<'' | 'grey'>,
			default: ''
		}
	}
})
</script>

<template>
	<BaseTableColumn :is-wide="isWide">
		<ul class="table-list" :class="type ? `table-list--${type}` : ''">
			<slot></slot>
		</ul>
	</BaseTableColumn>

</template>

<style lang="sass">
.table-list
	font-size: var(--fontSizeP2)
	font-weight: 500
	line-height: var(--lineHeightP1)

	+until-tablet
		font-size: var(--fontSizeP3)

	&--grey
		color: var(--color-neutral-secondary)

	&__item
		display: flex
		justify-content: flex-start
		align-items: center
		gap: rem(8)

		&:not(:last-child)
			margin-bottom: rem(8)

		& > *
			&:first-child
				max-width: rem(140)
				white-space: nowrap
				text-overflow: ellipsis
				overflow: hidden

			&:not(:first-child)
				white-space: nowrap

				&::before
					content: 'x'

					margin-right: rem(8)


</style>
