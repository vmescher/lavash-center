<script lang="ts">
import {defineComponent} from 'vue'
import BaseHeader from "@components/structural/BaseHeader.vue";
import BaseFooter from "@components/structural/BaseFooter.vue";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";
import ContactModal from "@components/modals/ContactModal.vue";
import AuthModal from "@components/auth/AuthModal.vue";
import RecoverPasswordModal from "@components/auth/RecoverPasswordModal.vue";
import NewPasswordModal from "@components/auth/NewPasswordModal.vue";

export default defineComponent({
	name: "SimpleLayout",
	components: {
		NewPasswordModal,
		RecoverPasswordModal, AuthModal, ContactModal, SlideInTransition, BaseFooter, BaseHeader}
})
</script>

<template>
	<div class="layout">
		<router-view v-slot="{Component}">
			<SlideInTransition mode="out-in">
				<component :is="Component"/>
			</SlideInTransition>
		</router-view>

		<BaseFooter/>
	</div>
</template>

<style scoped lang="sass">

</style>
