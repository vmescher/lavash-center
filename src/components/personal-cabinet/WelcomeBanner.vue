<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "WelcomeBanner",
})
</script>

<template>
	<section class="welcome-banner">
		<div class="welcome-banner__wrapper wrapper">
			<div class="welcome-banner__body">
				<div class="welcome-banner__content">
					<h2 class="welcome-banner__title">
						Добро пожаловать,<br/> Владислав
					</h2>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.welcome-banner
	&:not(:last-child)
		margin-bottom: rem(64)

		+while-mob-xl
			margin-bottom: rem(32)

	&__body
		position: relative
		isolation: isolate

		width: 100%
		padding: rem(56)
		display: flex
		flex-direction: column

		aspect-ratio: 14 / 5

		background-color: var(--color-tertiary)
		//background-image: url("@img/base-pattern.svg")
		//background-repeat: repeat-x
		//background-position: 0 calc(100% - rem(80))
		//background-size: 100% auto
		border-radius: var(--radius-block)

		overflow: hidden

		+until-laptop
			padding: rem(48) rem(24)

			aspect-ratio: 14 / 6

		+until-tablet
			padding: rem(48) rem(16)

		+while-mob-xl
			padding: rem(32) rem(16)
			aspect-ratio: 5 / 4

		&::before
			content: ''
			position: absolute
			left: 0
			bottom: 14%
			z-index: var(--z-index-below)

			display: block
			width: 100%
			height: 17.5%

			background-color: var(--color-neutral-tertiary)

			mask-image: url("@img/base-pattern.svg")
			mask-position: center
			mask-repeat: no-repeat
			mask-size: cover

			+while-mob-xl
				bottom: 15%

	&__content
		flex-grow: 1
		display: flex
		flex-direction: column
		gap: rem(24)
		align-items: flex-start

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH1)
		font-weight: 500
		line-height: var(--lineHeightH1)
		text-transform: uppercase

		+until-laptop
			font-size: var(--fontSizeH2)
			line-height: var(--lineHeightH2)

		+while-mob-xl
			font-size: var(--fontSizeH3)
			line-height: var(--lineHeightH2)

		+while-mob
			font-size: var(--fontSizeH4)
			line-height: var(--lineHeightH2)

</style>
