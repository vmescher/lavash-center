<script lang="ts">
import {defineComponent, inject, PropType} from 'vue'
import {BaseRoutes} from "@scripts/router/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";

export default defineComponent({
	name: "BackHeader",
	components: {IconSVG},
	props: {
		backTarget: {
			type: String as PropType<BaseRoutes>,
			default: '/'
		}
	},
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;

		return {
			viewportUntil
		}
	}
})
</script>

<template>
	<header v-size-observe="'header'" class="back-header">
		<div class="back-header__wrapper wrapper">
			<router-link :to="{name: backTarget}" class="link" :class="{'link--size-medium': viewportUntil('mobile-xl')}">
				<IconSVG name="arrow-left" class="link__icon"/>
				<span class="link__text"><slot>Назад</slot></span>
			</router-link>
		</div>
	</header>
</template>

<style scoped lang="sass">
.back-header
	padding: rem(48) 0 rem(24)

	+until-laptop
		padding: rem(32) 0 rem(16)

	+until-tablet
		padding: rem(24) 0 rem(16)

	&:not(:last-child)
		margin-bottom: rem(40)

		+until-laptop
			margin-bottom: rem(24)

		+while-mob-xl
			margin-bottom: rem(8)

	&__wrapper
		display: flex
		align-items: center
		justify-content: space-between
		gap: rem(24)

</style>
