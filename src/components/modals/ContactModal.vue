<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from '@components/utils/modals/BaseModal.vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "ContactModal",
	components: {
		IconSVG,
		BaseModal
	},
})
</script>

<template>
	<BaseModal id="contact-us-modal" v-slot="{close}">
		<section class="modal modal--base">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">Связаться с нами</h3>

		</section>

	</BaseModal>
</template>

<style scoped lang="sass">

</style>
