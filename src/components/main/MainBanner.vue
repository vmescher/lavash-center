<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "MainBanner",
	components: {IconSVG},
	methods: {
		scrollToCatalog() {
			const catalog = document.getElementById('products')
			if (catalog) {
				catalog.scrollIntoView({behavior: 'smooth'})
			}
		}
	}
})
</script>

<template>
	<section class="main-banner">
		<div class="main-banner__wrapper wrapper">
			<div class="main-banner__body">
				<div class="main-banner__bg">
					<img class="main-banner__image" src="/img/main/bg-image.webp" alt="Фон с лавашами">
				</div>

				<div class="main-banner__content">
					<h1 class="main-banner__title">
						Мы готовим лаваш с любовью <br> к деталям и традициям
					</h1>

					<p class="main-banner__text">На протяжении 11&nbsp;лет предоставляем свежие лаваши <br>более чем 150&nbsp;заведениям города.</p>

					<div class="main-banner__actions">
						<a href="#products" class="main-banner__action btn btn--color-secondary" @click.prevent="scrollToCatalog">Смотреть товары</a>
					</div>
				</div>

				<a href="#products" class="main-banner__anchor btn btn--rounded" @click.prevent="scrollToCatalog">
					<IconSVG class="main-banner__anchor-arrow btn__icon" name="arrow-down"/>
				</a>

			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.main-banner
	&:not(:last-child)
		margin-bottom: rem(120)

		+until-laptop
			margin-bottom: rem(80)

		+until-tablet
			margin-bottom: rem(64)

		+while-mob-xl
			margin-bottom: rem(48)

	&__body
		position: relative
		z-index: 0

		width: 100%
		min-height: rem(580)
		max-height: calc(var(--window-height) - var(--header-height) - rem(24))
		padding: rem(80) rem(56)
		display: flex
		flex-direction: column

		aspect-ratio: 336 / 167

		background-color: var(--color-tertiary)
		border-radius: var(--radius-block)

		overflow: hidden

		+until-laptop
			padding: rem(48) rem(24)

			aspect-ratio: 16 / 9

		+until-tablet
			min-height: rem(380)
			padding: rem(48) rem(16)

		+while-mob-xl
			min-height: unset
			max-height: unset
			//height: clamp(rem(480), calc(var(--window-height) - var(--header-height) - rem(16)), rem(580))
			aspect-ratio: 5 / 7

		+while-mob
			padding: rem(32) rem(16)

		&::before
			content: ''
			position: absolute
			left: 0
			bottom: 14%
			z-index: var(--z-index-below)

			display: block
			width: 100%
			height: 12.5%

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
		align-items: center
		gap: fluid(32, 40)

		+until-laptop
			gap: fluid(16, 24)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH1)
		font-weight: 500
		line-height: var(--lineHeightH1)
		text-transform: uppercase
		text-align: center

		+until-laptop
			font-size: var(--fontSizeH2)
			line-height: var(--lineHeightH2)

		+while-mob-xl
			font-size: var(--fontSizeH3)
			line-height: var(--lineHeightH2)

		+while-mob
			font-size: var(--fontSizeH4)
			line-height: var(--lineHeightH2)

		& br
			+while-mob-xl
				display: none

	&__text
		font-size: var(--fontSizeP1)
		font-weight: 500
		line-height: var(--lineHeightP1)
		text-align: center

		+while-mob-xl
			max-width: rem(250)

			font-size: var(--fontSizeP2)
			line-height: var(--lineHeightP2)

		& br
			+while-mob-xl
				display: none

	&__actions
		padding-top: rem(16)
		display: flex
		align-items: center
		gap: rem(8)

		+while-mob-xl
			padding-top: rem(8)

	&__bg
		position: absolute
		top: 0
		left: 0
		z-index: -1

		width: 100%
		height: 100%

		+while-mob-xl
			display: none

	&__image
		display: block
		width: 100%
		height: 100%

		object-fit: cover
		object-position: bottom center

	&__anchor
		position: absolute
		bottom: rem(32)
		left: 50%

		transform: translateX(-50%)

		animation: anchor-arrow 1s ease-in-out infinite alternate

		+hover
			animation-play-state: paused

		+while-mob-xl
			bottom: rem(24)


@keyframes anchor-arrow
	0%
		transform: translate(-50%, rem(-4))
	100%
		transform: translate(-50%, rem(4))

</style>
