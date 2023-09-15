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

	&__body
		width: 100%
		padding: rem(56)
		display: flex
		flex-direction: column

		aspect-ratio: 14 / 5

		background-color: var(--color-tertiary)
		background-image: url("@img/base-pattern.svg")
		background-repeat: repeat-x
		background-position: 0 calc(100% - rem(80))
		background-size: 100% auto
		border-radius: var(--radius-block)

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

</style>
