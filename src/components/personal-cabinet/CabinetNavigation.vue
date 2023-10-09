<script lang="ts">
import {defineComponent} from 'vue'
import BaseTabs, {RouterTab} from "@components/utils/ui/BaseTabs.vue";
import {RouteNames} from "@scripts/router/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import ConfirmModal from "@components/modals/ConfirmModal.vue";

export default defineComponent({
	name: "CabinetNavigation",
	components: {ConfirmModal, SectionTitle, IconSVG, BaseTabs},
	mixins: [useUsersStore],
	setup() {
		return {
			RouteNames
		}
	},
	computed: {
		navTabs(): RouterTab[] {
			return [
				{
					label: 'Личные данные',
					to: RouteNames.PROFILE_PAGE,
					disabled: false,
				},
				{
					label: this.isAdmin ? 'Заказы' : 'Мои заказы',
					to: this.isAdmin ? RouteNames.ORDERS_PAGE : RouteNames.HISTORY_PAGE,
					disabled: false,
				},
			]
		}
	},
	methods: {
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
	<SectionTitle>
		<template #actions>
			<section class="cabinet-navigation">

				<nav class="cabinet-navigation__nav">
					<BaseTabs :router-tabs="navTabs"/>
				</nav>

				<div class="cabinet-navigation__actions">
					<button class="link" @click="logout">
						Выйти из профиля
						<IconSVG class="link__icon" name="exit"/>
					</button>
				</div>

				<ConfirmModal id="logout-confirm" ref="logoutConfirm" title="Вы уверены, что хотите выйти?" confirm-button="Да, выйти" cancel-button="Остаться"/>

			</section>
		</template>
	</SectionTitle>
</template>

<style scoped lang="sass">
.cabinet-navigation
	display: flex
	align-items: center
	justify-content: space-between
	gap: rem(32)

</style>
