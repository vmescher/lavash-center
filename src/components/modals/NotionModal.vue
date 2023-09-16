<script lang="ts">
import {defineComponent} from 'vue'
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "NotionModal",
	components: {IconSVG, BaseModal},
	mixins: [useModalsStore],
	props: {
		id: {
			type: String,
			required: true,
			default: 'modal-notion'
		},
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		closeButton: {
			type: String,
			default: ''
		},
	},
	emits: ['close'],
})
</script>

<template>
	<BaseModal :id="id" v-slot="{close}" @close="$emit('close')">
		<section class="modal">
			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 v-if="title" class="modal__title" v-html="title"></h3>

			<p v-if="text" class="popup__text" v-html="text"></p>

			<div class="modal__bottom">
				<div class="modal__buttons">
					<button class="btn btn--color-secondary" @click.prevent="close">
						<span class="btn__text">{{ closeButton }}</span>
					</button>
				</div>
			</div>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
