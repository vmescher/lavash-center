<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "MainBanner",
	components: {IconSVG}
})
</script>

<template>
	<section class="main-banner">
		<div class="main-banner__wrapper wrapper">
			<div class="main-banner__body">
				<div class="main-banner__bg">
					<img class="main-banner__image" src="/img/main/bg-image.png" alt="Фон с лавашами">
				</div>

				<div class="main-banner__content">
					<h2 class="main-banner__title">
						Мы готовим самые лучшие <br/>лаваши во вселенной!
					</h2>

					<p class="main-banner__text">На протяжении 12 лет предоставляем лаваши <br>более чем 200 заведениям города.</p>

					<div class="main-banner__actions">
						<a href="#products" class="main-banner__action btn btn--color-secondary">Смотреть товары</a>
					</div>
				</div>

				<a href="#products" class="main-banner__anchor btn btn--rounded">
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

	&__body
		position: relative
		z-index: 0

		width: 100%
		max-height: calc(var(--window-height) - var(--header-height) - rem(24))
		padding: rem(80) rem(56)
		display: flex
		flex-direction: column

		aspect-ratio: 336 / 167

		background-color: var(--color-tertiary)
		background-image: url("@img/base-pattern.svg")
		background-repeat: repeat-x
		background-position: 0 calc(100% - rem(120))
		background-size: 100% auto
		border-radius: var(--radius-block)

		overflow: hidden
		transform: translate3d(0, 0, 1px)

	&__content
		flex-grow: 1
		display: flex
		flex-direction: column
		align-items: center
		gap: rem(40)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH1)
		font-weight: 500
		line-height: var(--lineHeightH1)
		text-transform: uppercase
		text-align: center

	&__text
		font-size: var(--fontSizeP1)
		font-weight: 500
		line-height: var(--lineHeightP1)
		text-align: center

	&__actions
		padding-top: rem(16)
		display: flex
		align-items: center
		gap: rem(8)

	&__bg
		position: absolute
		top: 0
		left: 0
		z-index: -1

		width: 100%
		height: 100%

	&__image
		display: block
		width: 100%
		height: 100%

		object-fit: cover

	&__anchor
		position: absolute
		bottom: rem(32)
		left: 50%

		transform: translateX(-50%)

		animation: anchor-arrow 1s ease-in-out infinite alternate


		+hover
			animation-play-state: paused


@keyframes anchor-arrow
	0%
		transform: translateY(rem(-4))
	100%
		transform: translateY(rem(4))

</style>
