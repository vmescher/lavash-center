<script lang="ts">
import {defineComponent, inject} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";

export default defineComponent({
	name: "ContactsSection",
	components: {IconSVG},
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;
		return {
			viewportUntil
		}
	}
})
</script>

<template>
<section class="contacts">
	<div class="contacts__wrapper wrapper">
		<address class="contacts__list">
			<a href="https://go.2gis.com/mwn7a" target="_blank" class="contacts__contact link link--secondary" :class="viewportUntil('mobile-xl') ? 'link--size-medium' : 'link--size-big'">
				<IconSVG name="pin" class="link__icon"/>
				г. Копейск, ул. Кемеровская, д. 3а
			</a>
			<a href="tel:+79953354747" class="contacts__contact link link--secondary" :class="viewportUntil('mobile-xl') ? 'link--size-medium' : 'link--size-big'">
				<IconSVG name="phone" class="link__icon"/>
				+7 (995) 335-47-47
			</a>
			<a href="tel:+79953353737" class="contacts__contact link link--secondary" :class="viewportUntil('mobile-xl') ? 'link--size-medium' : 'link--size-big'">
				<IconSVG name="phone" class="link__icon"/>
				+7 (995) 335-37-37
			</a>
			<a href="mailto:sako@gmail.com" class="contacts__contact link link--secondary" :class="viewportUntil('mobile-xl') ? 'link--size-medium' : 'link--size-big'">
				<IconSVG name="mail" class="link__icon"/>
				template@gmail.com
			</a>
		</address>
		<div class="contacts__map-wrapper">
			<iframe class="contacts__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A419f9f832a7efffa4c1109db7137aee576eac77bd27848b39699d56449214ef6&amp;source=constructor" width="828" height="600" frameborder="0"></iframe>
		</div>
	</div>
</section>
</template>

<style scoped lang="sass">
.contacts
	&:not(:last-child)
		margin-bottom: rem(120)

		+until-laptop
			margin-bottom: rem(80)

		+until-tablet
			margin-bottom: rem(64)

		+while-mob-xl
			margin-bottom: rem(48)

	&__wrapper
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(24)

		+until-tablet
			grid-gap: rem(32)
			grid-template-columns: 100%

	&__list,
	&__map-wrapper
		grid-column: span 6

		+until-tablet
			grid-column: 1 / -1

	&__list
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: rem(40)

		+until-tablet
			gap: rem(24)

		+while-mob-xl
			gap: rem(16)

	&__map-wrapper
		aspect-ratio: 69 / 50
		border-radius: var(--radius-block)
		background-color: var(--color-neutral-fourth)
		overflow: hidden
		transform: translate3d(0, 0, 1px)

		+while-mob-xl
			aspect-ratio: 5 / 7

	&__map
		display: block
		width: 100%
		height: 100%

</style>
