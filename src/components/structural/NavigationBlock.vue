<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {RouteNames} from "@scripts/router/types";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import CartModal from "@components/cart/CartModal.vue";

export default defineComponent({
	name: "NavigationBlock",
	components: {CartModal, IconSVG},
	mixins: [useUsersStore, useModalsStore],
	setup() {
		return {
			RouteNames
		}
	},
	methods: {
		hideDropdown() {
			this.closeModal('nav-dropdown');
		},
	}
})
</script>

<template>
	<article class="navigation">

		<nav class="navigation__items">
			<router-link class="btn btn--color-secondary" :to="{name: RouteNames.QUICK_ORDER_PAGE}" @click="hideDropdown">
				<span class="btn__text">Быстрый заказ</span>
			</router-link>
			<button class="link" @click="openModal('cart-modal')">
				<span class="link__text">Корзина</span>
				<IconSVG name="bag" class="link__icon"/>
			</button>
			<router-link v-if="isLoggedIn" :to="{name: RouteNames.PROFILE_PAGE}" class="link" @click="hideDropdown">
				личный кабинет
				<IconSVG name="user" class="link__icon"/>
			</router-link>
			<button v-else class="link" @click="openModal('auth-modal')">
				личный кабинет
				<IconSVG name="user" class="link__icon"/>
			</button>
			<router-link :to="{name: RouteNames.CONTACTS_PAGE}" class="link" @click="hideDropdown">
				Контакты
			</router-link>
		</nav>

		<CartModal/>

	</article>
</template>

<style scoped lang="sass">
.navigation
	align-self: flex-end
	height: auto
	width: 100%
	max-width: rem(375)
	border-radius: var(--radius-block-secondary)
	background-color: var(--color-neutral-tertiary)

	overflow: hidden
	transform: translate3d(0, 0, 1px)

	&__items
		padding: rem(24) rem(16)
		display: flex
		flex-direction: column
		gap: rem(24)

		overflow-y: auto
		+Vscroll

</style>
