<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import CartBlock from "@components/cart/CartBlock.vue";

export default defineComponent({
	name: "CartModal",
	components: {CartBlock, IconSVG, BaseModal}
})
</script>

<template>
	<BaseModal id="cart-modal" v-slot="{close}">
		<section class="modal modal--cart">
			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<CartBlock class="modal__body"/>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
