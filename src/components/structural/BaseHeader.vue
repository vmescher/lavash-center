<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {RouteNames} from "@scripts/router/types";
import CartBlock from "@components/cart/CartBlock.vue";
import CoverDropdown from "@components/utils/ui/CoverDropdown.vue";
import ContactModal from "@components/modals/ContactModal.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: "BaseHeader",
	components: {ContactModal, CoverDropdown, CartBlock, IconSVG},
	mixins: [useModalsStore],
	setup() {
		return {
			RouteNames
		}
	}
})
</script>

<template>
	<header v-size-observe="'header'" class="header">
		<div class="header__wrapper wrapper">

			<div class="header__left">
				<router-link :to="{name: RouteNames.MAIN_PAGE}" class="header__logo">
					<img class="header__logo-image" src="/img/logo.svg" alt="Лаваш центр">
				</router-link>

				<nav class="header__nav">
					<router-link :to="{name: RouteNames.CONTACTS_PAGE}" class="header__link link">Контакты</router-link>
				</nav>
			</div>

			<div class="header__right">
				<div class="header__actions">
					<button class="btn header__action" @click.prevent="openModal('contact-us-modal')">
						<span class="btn__text">Связаться с нами</span>
						<IconSVG name="phone" class="btn__icon"/>
					</button>

					<CoverDropdown id="cart-dropdown">
						<button class="btn btn--color-secondary header__action">
							<span class="btn__text">Корзина</span>
							<IconSVG name="bag" class="btn__icon"/>
						</button>

						<template #dropdown>
							<CartBlock/>
						</template>
					</CoverDropdown>

				</div>

				<div class="header__actions">
					<router-link :to="{name: RouteNames.PROFILE_PAGE}" class="link header__action">
						личный кабинет
						<IconSVG name="user" class="link__icon"/>
					</router-link>
				</div>
			</div>

		</div>

		<ContactModal/>
	</header>
</template>

<style scoped lang="sass">
.header
	padding: rem(24) 0

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

		&-image
			display: block
			width: 100%
			height: 100%

			object-fit: contain

</style>
