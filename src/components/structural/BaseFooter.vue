<script lang="ts">
import {defineComponent} from 'vue'
import {RouteNames} from "@scripts/router/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: "BaseFooter",
	components: {IconSVG},
	mixins: [useModalsStore],
	setup() {
		return {
			RouteNames
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

						<a href="https://go.2gis.com/mwn7a" target="_blank" class="footer__contact link link--secondary">
							<IconSVG name="pin" class="link__icon"/>
							г. Копейск, ул. Кемеровская, д. 3а
						</a>
						<a href="tel:+7 (999) 999-99-99" class="footer__contact link link--secondary">
							<IconSVG name="phone" class="link__icon"/>
							+7 (999) 999-99-99
						</a>
						<a href="mailto:sako@gmail.com" class="footer__contact link link--secondary">
							<IconSVG name="mail" class="link__icon"/>
							sako@gmai.com
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

					<span class="footer__copy">ИП Сако</span>
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
		padding: rem(56) rem(56) rem(48)
		flex-grow: 1
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		gap: rem(24)
		align-items: flex-start

		background-image: url("@img/base-pattern.svg")
		background-repeat: repeat-x
		background-position: 0 calc(100% - rem(48))
		background-size: 100% auto

	&__logo,
	&__contacts,
	&__actions
		grid-column: span 4

	&__logo
		max-height: rem(56)
		max-width: 75%

		&-image
			display: block
			height: auto
			width: 100%

			object-fit: contain

	&__contacts
		display: flex
		flex-direction: column
		gap: rem(32)

	&__contact
		width: max-content

	&__actions
		display: flex
		align-items: center
		justify-content: flex-end
		gap: rem(8)

	&__bottom
		position: relative

		padding: rem(18) rem(56) rem(56)

		display: flex
		align-items: center
		justify-content: space-between
		gap: rem(32)

		&::before
			content: ''
			position: absolute
			top: 0
			left: rem(56)
			right: rem(56)

			height: 2px

			background-color: var(--color-primary)
			border-radius: var(--radius-divider)

	&__copy
		display: inline-flex
		align-items: center
		gap: rem(8)

		font-size: rem(14)
		font-weight: 500
		line-height: 1

		&::before
			content: ''

			size: rem(16)

			mask-image: url("@img/icons/copy.svg")
			mask-size: 100%
			mask-repeat: no-repeat
			background-color: currentColor


</style>
