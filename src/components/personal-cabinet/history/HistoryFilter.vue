<script lang="ts">
import {defineComponent} from 'vue'
import InputSearch from "@components/utils/form/InputSearch.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";
import debounce from "@scripts/utils/debounce";
import HistoryFilterModal from "@components/personal-cabinet/modals/HistoryFilterModal.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: "HistoryFilter",
	components: {HistoryFilterModal, IconSVG, InputSearch},
	mixins: [useOrdersStore, useModalsStore],
	data() {
		return {
			changeFilterHandler: debounce<() => void>(this.loadFilteredOrders as () => void, 500),
		}
	},
	computed: {
		queryFilter: {
			get(): string | null {
				return this.getOrdersFilterKey('query') as string | null;
			},
			set(value: string) {
				this.setOrdersFilter('query', value || null);
				this.changeFilterHandler();
			}
		},
		getActiveFiltersAmount() {
			return Object.entries(this.getOrdersFilter).filter(([key, value]) => key !== 'query' && value !== null).length;
		}
	},
	methods: {
		loadFilteredOrders() {
			this.requestManagerOrders({ offset: 0, limit: this.getOrdersPagination.limit, filter: { ...this.getOrdersFilter } });
			this.$router.push({query: {page: 1}});
		}
	}
})
</script>

<template>
	<div class="filter">
		<div class="filter__item">
			<InputSearch v-model="queryFilter" label="Поиск" placeholder="Начните ввод"/>
		</div>

		<button class="btn filter__more" @click.prevent="openModal('history-filter-modal')">
			<span class="btn__text">Фильтры <span v-if="getActiveFiltersAmount" class="filter__count">{{ getActiveFiltersAmount }}</span></span>
			<IconSVG name="filter" class="btn__icon"/>
		</button>

		<HistoryFilterModal @apply="loadFilteredOrders" @clear="loadFilteredOrders"/>
	</div>
</template>

<style scoped lang="sass">
.filter
	width: 100%
	display: flex
	align-items: flex-end
	justify-content: space-between
	gap: rem(24)

	&__more
		+hover
			& .filter__count
				color: var(--color-secondary)
				background-color: var(--color-neutral-tertiary)

	&__count
		display: inline-flex
		align-items: center
		justify-content: center
		size: rem(24)

		font-family: var(--font-secondary)
		font-size: var(--fontSizeP1)
		font-weight: 600
		line-height: 1
		text-transform: uppercase

		color: var(--color-neutral-tertiary)
		background-color: var(--color-secondary)
		border-radius: 50%

		transition: background-color .3s ease, color .3s ease

</style>
