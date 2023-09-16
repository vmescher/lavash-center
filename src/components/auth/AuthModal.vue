<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import BaseTabs, {Tab} from "@components/utils/ui/BaseTabs.vue";
import LoginModal from "@components/auth/LoginModal.vue";
import RegisterModal from "@components/auth/RegisterModal.vue";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";

export default defineComponent({
	name: "AuthModal",
	components: {SlideInTransition, RegisterModal, LoginModal, BaseTabs, IconSVG, InputText, BaseModal},
	data() {
		return {
			currentView: 'LoginModal',
			tabsList: [
				{
					label: 'Вход',
					value: 'LoginModal',
					disabled: false,
					tag: 'button'
				},
				{
					label: 'Регистрация',
					value: 'RegisterModal',
					disabled: false,
					tag: 'button'
				}
			] as Tab[]
		}
	},
})
</script>

<template>
	<BaseModal id="auth-modal" v-slot="{close}">

		<SlideInTransition mode="out-in">
			<component :is="currentView" @close="close">
				<template #tabs>
					<BaseTabs v-model="currentView" :tabs="tabsList"/>
				</template>
			</component>
		</SlideInTransition>

	</BaseModal>
</template>

<style scoped lang="sass">

</style>
