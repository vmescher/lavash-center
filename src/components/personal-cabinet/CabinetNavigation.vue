<script lang="ts">
import {defineComponent} from 'vue'
import BaseTabs, {RouterTab} from "@components/utils/ui/BaseTabs.vue";
import {RouteNames} from "@scripts/router/types";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";

export default defineComponent({
	name: "CabinetNavigation",
	components: {SectionTitle, IconSVG, BaseTabs},
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
					label: 'Мои заказы',
					to: RouteNames.HISTORY_PAGE,
					disabled: false,
				},
				{
					label: 'Заказы',
					to: RouteNames.ORDERS_PAGE,
					disabled: false,
				}
			]
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
					<button class="link">
						Выйти из профиля
						<IconSVG class="link__icon" name="exit"/>
					</button>
				</div>

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
