<script lang="ts">
import {defineComponent, inject} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {RouteNames} from "@scripts/router/types";
import CartBlock from "@components/cart/CartBlock.vue";
import CoverDropdown from "@components/utils/ui/CoverDropdown.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {ViewportNames} from "@scripts/hooks/useViewportHandler/types";
import NavigationBlock from "@components/structural/NavigationBlock.vue";
import {useBasketStore} from "@scripts/hooks/stateHooks/useBasketStore";

export default defineComponent({
	name: "BaseHeader",
	components: {NavigationBlock, CoverDropdown, CartBlock, IconSVG},
	mixins: [useModalsStore, useUsersStore, useBasketStore],
	setup() {
		const viewportUntil = inject('viewportUntil') as (viewportName: ViewportNames) => boolean;

		return {
			RouteNames,
			viewportUntil
		}
	},
	data() {
		return {
			scrollPosition: 0,
		}
	},
	computed: {
		isScrolled() {
			return this.scrollPosition > 10;
		}
	},
	beforeMount() {
		this.getScrollY()
		window.addEventListener('scroll', this.getScrollY.bind(this))
	},
	unmounted() {
		window.removeEventListener('scroll', this.getScrollY)
	},
	methods: {
		getScrollY() {
			this.scrollPosition = window.scrollY;
		}
	}
})
</script>

<template>
	<header v-size-observe="'header'" class="header" :class="{'header--sticky' : isScrolled}">
		<div class="header__wrapper wrapper">

			<div class="header__left">
				<router-link :to="{name: RouteNames.MAIN_PAGE}" class="header__logo">
					<img class="header__logo-image" src="/img/logo.svg" alt="Лаваш центр">
				</router-link>

				<nav v-if="!viewportUntil('tablet')" class="header__nav">
					<router-link :to="{name: RouteNames.CONTACTS_PAGE}" class="header__link link">Контакты</router-link>
				</nav>
			</div>

			<div class="header__right">

				<div class="header__actions">
					<router-link v-if="!viewportUntil('tablet')" class="btn header__action" :to="{name: RouteNames.QUICK_ORDER_PAGE}">
						<span class="btn__text">Быстрый заказ</span>
					</router-link>

					<CoverDropdown id="cart-dropdown" >
						<button class="btn btn--color-secondary header__action" :data-count="getBasket.length" :class="{'btn--rounded': viewportUntil('mobile-xl')}">
							<span v-if="!viewportUntil('mobile-xl')" class="btn__text">Корзина</span>
							<IconSVG name="bag" class="btn__icon"/>
						</button>

						<template #dropdown>
							<CartBlock/>
						</template>
					</CoverDropdown>

					<CoverDropdown v-if="viewportUntil('tablet')" id="nav-dropdown">
						<button class="btn header__action" :class="[{'btn--rounded': viewportUntil('mobile-xl')}, {'btn--color-tertiary' : isScrolled}]">
							<span v-if="!viewportUntil('mobile-xl')" class="btn__text">Меню</span>
							<IconSVG name="menu" class="btn__icon"/>
						</button>


						<template #dropdown>
							<NavigationBlock/>
						</template>
					</CoverDropdown>

					<template v-else>
						<router-link v-if="isLoggedIn" :to="{name: RouteNames.PROFILE_PAGE}" class="link header__action">
							личный кабинет
							<IconSVG name="user" class="link__icon"/>
						</router-link>
						<button v-else class="link header__action" @click="openModal('auth-modal')">
							личный кабинет
							<IconSVG name="user" class="link__icon"/>
						</button>
					</template>
				</div>
			</div>

		</div>
	</header>
</template>

<style scoped lang="sass">
.header
	padding: rem(24) 0

	transition: background-color .3s ease

	+until-tablet
		position: sticky
		top: 0
		z-index: var(--z-index-header)

		padding: rem(12) 0 rem(16)

	&--sticky
		+until-tablet
			border-radius: 0 0 var(--radius-picture) var(--radius-picture)
			background-color: var(--color-neutral-tertiary)
			box-shadow: var(--shadow-primary-down)

	&__wrapper
		display: flex
		justify-content: space-between
		align-items: center
		gap: rem(24)

	&__left
		display: flex
		align-items: center
		gap: rem(40)

	&__right
		display: flex
		align-items: center
		gap: rem(32)

	&__nav
		display: flex
		align-items: center
		gap: rem(24)

	&__actions
		display: flex
		align-items: center
		gap: rem(8)

	&__logo
		height: rem(40)
		max-width: rem(270)

		+while-mob-xl
			height: rem(32)
			max-width: rem(200)

		+while-mob
			height: rem(28)
			max-width: rem(180)

		&-image
			display: block
			width: 100%
			height: 100%

			object-fit: contain

</style>
