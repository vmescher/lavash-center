<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "HistorySection"
})
</script>

<template>
	<section class="history">
		<div class="history__wrapper wrapper">
			<div class="history__top">
				<h3 class="history__title">
					<slot name="title"></slot>
				</h3>
				<div class="history__actions">
					<slot name="actions"></slot>
				</div>
			</div>
			<div v-if="$slots.filter" class="history__filter">
				<slot name="filter"></slot>
			</div>
			<div class="history__table">
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.history
	&__top
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		&:not(:last-child)
			margin-bottom: rem(48)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH3)
		font-weight: 500
		line-height: var(--lineHeightH2)
		text-transform: uppercase

	&__actions
		display: flex
		align-items: center
		gap: rem(8)

	&__filter
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

		&:not(:last-child)
			margin-bottom: rem(40)

</style>
