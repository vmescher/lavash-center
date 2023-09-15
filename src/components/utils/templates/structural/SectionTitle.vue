<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "SectionTitle",
})
</script>

<template>
	<section class="section-title">
		<div class="section-title__wrapper wrapper">
			<div class="section-title__body">
				<h2 v-if="$slots.default" class="section-title__title">
					<slot/>
				</h2>
				<div v-if="$slots.actions" class="section-title__actions">
					<slot name="actions"></slot>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.section-title
	&:not(:last-child)
		margin-bottom: rem(56)

	&__body
		position: relative

		display: grid
		grid-template-columns: 100%
		grid-gap: rem(16)
		padding-bottom: rem(24)

		&::before
			content: ''

			position: absolute
			bottom: 0
			left: 0
			right: 0

			height: 2px
			width: 100%

			border-radius: var(--radius-divider)
			background-color: var(--color-primary)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH1)
		font-weight: 500
		line-height: var(--lineHeightH1)
		text-transform: uppercase
</style>
