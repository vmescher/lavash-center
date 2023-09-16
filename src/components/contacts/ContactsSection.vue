<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "ContactsSection",
	components: {IconSVG}
})
</script>

<template>
<section class="contacts">
	<div class="contacts__wrapper wrapper">
		<address class="contacts__list">
			<a href="https://go.2gis.com/mwn7a" target="_blank" class="contacts__contact link link--secondary link--size-big">
				<IconSVG name="pin" class="link__icon"/>
				г. Копейск, ул. Кемеровская, д. 3а
			</a>
			<a href="tel:+7 (999) 999-99-99" class="contacts__contact link link--secondary link--size-big">
				<IconSVG name="phone" class="link__icon"/>
				+7 (999) 999-99-99
			</a>
			<a href="mailto:sako@gmail.com" class="contacts__contact link link--secondary link--size-big">
				<IconSVG name="mail" class="link__icon"/>
				sako@gmai.com
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

	&__wrapper
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(24)

	&__list,
	&__map-wrapper
		grid-column: span 6

	&__list
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: rem(40)

	&__map-wrapper
		aspect-ratio: 69 / 50
		border-radius: var(--radius-block)
		background-color: var(--color-neutral-fourth)
		overflow: hidden
		transform: translate3d(0, 0, 1px)

	&__map
		display: block
		width: 100%
		height: 100%

</style>
