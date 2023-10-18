<script lang="ts">
import {defineComponent, inject} from 'vue'
import {RouteNames} from "@scripts/router/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";

export default defineComponent({
	name: "BaseFooter",
	components: {IconSVG},
	mixins: [useModalsStore],
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;

		return {
			RouteNames,
			viewportUntil
		}
	}
})
</script>

<template>
	<footer class="footer">
		<div class="footer__wrapper wrapper">
			<div class="footer__body">

				<div class="footer__top">
					<router-link :to="{name: RouteNames.MAIN_PAGE}" class="footer__logo">
						<img class="footer__logo-image" src="/img/logo.svg" alt="Лаваш центр">
					</router-link>

					<address class="footer__contacts">

						<a href="https://go.2gis.com/mwn7a" target="_blank" class="footer__contact link link--secondary" :class="{'link--size-medium': viewportUntil('mobile-xl')}">
							<IconSVG name="pin" class="link__icon"/>
							г. Копейск, ул. Кемеровская, д. 3а
						</a>
						<a href="tel:79953353737" class="footer__contact link link--secondary" :class="{'link--size-medium': viewportUntil('mobile-xl')}">
							<IconSVG name="phone" class="link__icon"/>
							+7 (995) 335-37-37
						</a>
						<a href="tel:+79953354747" class="footer__contact link link--secondary" :class="{'link--size-medium': viewportUntil('mobile-xl')}">
							<IconSVG name="phone" class="link__icon"/>
							+7 (995) 335-47-47
						</a>
						<a href="mailto:sako@gmail.com" class="footer__contact link link--secondary" :class="{'link--size-medium': viewportUntil('mobile-xl')}">
							<IconSVG name="mail" class="link__icon"/>
							template@gmail.com
						</a>
					</address>

					<div class="footer__actions">
						<button class="btn btn--color-secondary footer__action" @click.prevent="openModal('contact-us-modal')">
							<span class="btn__text">Связаться с нами</span>
							<IconSVG name="phone" class="btn__icon"/>
						</button>
					</div>

				</div>

				<div class="footer__bottom">
					<a href="#" target="_blank" class="footer__policy link link--secondary link--size-small">Политика конфиденциальности</a>

					<span class="footer__copy">ИП Оганисян Т.А.</span>
				</div>

			</div>
		</div>
	</footer>
</template>

<style scoped lang="sass">
.footer
	&__body
		width: 100%
		display: flex
		flex-direction: column

		aspect-ratio: 14 / 5

		background-color: var(--color-tertiary)
		border-radius: var(--radius-block)

	&__top
		position: relative
		isolation: isolate

		padding: rem(56) rem(56) calc(rem(48) + 10%)
		flex-grow: 1
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		gap: rem(24)
		align-items: flex-start

		+until-laptop
			padding: rem(48) rem(32) calc(rem(32) + 8%)

		+until-tablet
			padding: rem(48) rem(32) calc(rem(32) + 10%)
			gap: rem(32) rem(16)

		+while-mob-xl
			padding: rem(32) rem(16) calc(rem(24) + 16%)
			display: flex
			flex-direction: column
			align-items: center
			gap: rem(16)

		&::before
			content: ''
			position: absolute
			left: 0
			bottom: 9%
			z-index: var(--z-index-below)

			display: block
			width: 100%
			height: 20.5%

			background-color: var(--color-neutral-tertiary)

			mask-image: url("@img/base-pattern.svg")
			mask-position: center
			mask-repeat: no-repeat
			mask-size: cover

			+until-laptop
				bottom: 7%

			+while-mob-xl
				height: 12%
				bottom: 4%

	&__logo,
	&__contacts,
	&__actions
		grid-column: span 4

	&__logo
		height: rem(56)
		max-width: 75%

		+until-laptop
			height: rem(42)

		+until-tablet
			grid-column: span 6

		+while-mob-xl
			margin: 0 auto
			grid-column: 1 / -1

		&-image
			display: block
			height: 100%
			width: auto

			object-fit: contain

	&__contacts
		display: flex
		flex-direction: column
		gap: rem(32)

		+until-laptop
			gap: rem(24)

		+until-tablet
			display: grid
			grid-template-columns: repeat(2, minmax(0, 1fr))
			grid-column: 1 / -1

		+while-mob-xl
			grid-template-columns: minmax(0, 1fr)
			gap: rem(8)

	&__contact
		width: max-content

		+while-mob-xl
			width: auto
			margin: 0 auto

	&__actions
		display: flex
		align-items: center
		flex-wrap: wrap
		justify-content: flex-end
		gap: rem(8)

		+until-tablet
			grid-column: 7 / -1
			grid-row: 1

		+while-mob-xl
			padding-top: rem(8)
			grid-row: auto
			justify-content: center
			grid-column: 1 / -1

	&__bottom
		position: relative

		padding: rem(18) rem(56) rem(56)

		display: flex
		align-items: center
		justify-content: space-between
		flex-wrap: wrap
		gap: rem(16)

		+until-laptop
			padding: rem(16) rem(32) rem(48)

		+while-mob-xl
			padding: rem(16) rem(16) rem(28)
			justify-content: center

		&::before
			content: ''
			position: absolute
			top: 0
			left: rem(56)
			right: rem(56)

			height: 2px

			background-color: var(--color-primary)
			border-radius: var(--radius-divider)

			+until-laptop
				left: rem(32)
				right: rem(32)

			+while-mob-xl
				left: rem(16)
				right: rem(16)

	&__copy
		display: inline-flex
		align-items: center
		gap: rem(8)

		font-size: var(--fontSizeP3)
		font-weight: 500
		line-height: 1

		+while-mob-xl
			font-size: var(--fontSizeP4)

		&::before
			content: ''

			size: fluid(12, 16)

			mask-image: url("@img/icons/copy.svg")
			mask-size: 100%
			mask-repeat: no-repeat
			background-color: currentColor


</style>
