<script lang="ts">
import {defineComponent, PropType, provide} from 'vue'
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
		withActions: {
			type: Boolean,
			default: false
		},
		overflowed: {
			type: Boolean,
			default: false
		},
		adaptive: {
			type: Boolean,
			default: true
		}
	},
	setup(props) {
		provide('adaptive', props.adaptive)
	}
})
</script>

<template>
	<div class="table" :class="[{'table--overflowed' : overflowed}, {'table--adaptive' : adaptive}]">
		<div class="table__wrapper">
			<table class="table__table">
				<thead v-if="tableHead.length" class="table__head">
					<tr>
						<BaseTableHeadColumn v-for="item in tableHead" :key="item" >{{ item }}</BaseTableHeadColumn>
						<BaseTableHeadColumn v-if="withActions"></BaseTableHeadColumn>
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

	+until-tablet
		grid-gap: rem(24)

	&--overflowed

		& .table
			&__wrapper
				width: calc(100% + rem(120))
				margin: 0 rem(-60)
				padding: 0 rem(60)
				overflow-x: auto
				overflow-y: hidden

				+hide-scroll

				+until-laptop
					width: calc(100% + rem(16))
					margin: 0 rem(-8)
					padding: 0 rem(8)

	&--adaptive
		& .table
			&__table
				+until-tablet
					display: block
					margin: 0

			&__head
				+until-tablet
					display: none

			&__body
				+until-tablet
					display: block

	&__wrapper
		width: 100%

	&__table
		width: 100%
		table-layout: auto
		border-spacing: 0 rem(8)
		margin: rem(-8) 0

	&__bottom
		display: flex
		flex-direction: column
		align-items: center
		gap: rem(24)

</style>
