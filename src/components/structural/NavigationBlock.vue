<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {RouteNames} from "@scripts/router/types";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import ConfirmModal from "@components/modals/ConfirmModal.vue";

export default defineComponent({
	name: "NavigationBlock",
	components: {ConfirmModal, IconSVG},
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
		logout() {
			const logoutConfirmModal = this.$refs.logoutConfirm as typeof ConfirmModal
			if (logoutConfirmModal) {
				logoutConfirmModal.show().then(() => {
					this.requestLogOut().then(() => {
						this.$router.push({name: RouteNames.MAIN_PAGE})
					})
				})
			}
		}
	}
})
</script>

<template>
	<article class="navigation">

		<nav class="navigation__items">
			<router-link class="btn btn--color-secondary" :to="{name: RouteNames.QUICK_ORDER_PAGE}" @click="hideDropdown">
				<span class="btn__text">Быстрый заказ</span>
			</router-link>
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
			<button v-if="isLoggedIn" class="link" @click="logout">
				Выйти из профиля
				<IconSVG class="link__icon" name="exit"/>
			</button>
		</nav>

		<ConfirmModal id="logout-confirm" ref="logoutConfirm" title="Вы уверены, что хотите выйти?" confirm-button="Да, выйти" cancel-button="Остаться"/>
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
