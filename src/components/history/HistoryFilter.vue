<script lang="ts">
import {defineComponent} from 'vue'
import InputSearch from "@components/utils/form/InputSearch.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "HistoryFilter",
	components: {IconSVG, InputSearch}
})
</script>

<template>
<div class="filter">
	<div class="filter__item">
		<InputSearch label="Поиск" placeholder="Начните ввод"/>
	</div>

	<button class="btn filter__more">
		<span class="btn__text">Фильтры <span class="filter__count">2</span></span>
		<IconSVG name="filter" class="btn__icon"/>
	</button>
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
