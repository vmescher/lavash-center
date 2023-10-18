<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {RouteNames} from "@scripts/router/types";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: "NavigationBlock",
	components: {IconSVG},
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
			<router-link class="btn btn--color-secondary" :to="{name: RouteNames.QUICK_ORDER_PAGE}" @click="hideDropdown">
				<span class="btn__text">Быстрый заказ</span>
			</router-link>
		</nav>

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
		padding: rem(32) rem(16) rem(24)
		display: flex
		flex-direction: column
		gap: rem(24)

		overflow-y: auto
		+Vscroll

</style>
