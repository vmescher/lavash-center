<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableHeadColumn from "@components/utils/templates/table/BaseTableHeadColumn.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";

export default defineComponent({
	name: "BaseTable",
	components: {BaseTableColumnText, BaseTableHeadColumn, BaseTableRow},
	props: {
		tableHead: {
			type: Array as PropType<string[]>,
			default: () => []
		},
	},
})
</script>

<template>
	<div class="table">
		<div class="table__wrapper">
			<table class="table__table">
				<thead v-if="tableHead.length" class="table__head">
					<tr>
						<BaseTableHeadColumn v-for="item in tableHead" :key="item" >{{ item }}</BaseTableHeadColumn>
					</tr>
				</thead>

				<tbody class="table__body">

					<slot></slot>

					<BaseTableRow v-if="!$slots.default && $slots.emptyText">
						<BaseTableColumnText is-wide>
							<slot name="emptyText"></slot>
						</BaseTableColumnText>
					</BaseTableRow>
				</tbody>
			</table>
		</div>

		<div v-if="$slots.pagination" class="table__bottom">
			<div class="table__pagination">
				<slot name="pagination"></slot>
			</div>
		</div>

		<slot name="popups"></slot>
	</div>

</template>

<style scoped lang="sass">
.table
	display: grid
	grid-template-columns: 100%
	grid-gap: rem(48)

	&__wrapper
		width: 100%

	&__table
		width: 100%
		table-layout: auto
		border-spacing: 0 rem(8)
		margin: rem(-8) 0

	&__head
		position: relative

		&::after
			content: ""
			position: absolute
			bottom: rem(18)
			left: 0

			height: 2px
			width: 100%

			border-radius: var(--radius-divider)
			background-color: var(--color-primary)

	&__bottom
		display: flex
		flex-direction: column
		align-items: center
		gap: rem(24)

</style>
