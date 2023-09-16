<script lang="ts">
import {defineComponent} from 'vue'
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "ModalConfirm",
	components: {IconSVG, BaseModal},
	mixins: [useModalsStore],
	props: {
		id: {
			type: String,
			required: true,
			default: 'modal-confirm'
		},
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		confirmButton: {
			type: String,
			default: ''
		},
		cancelButton: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			isOpened: false,
			resolvePromise: undefined as unknown as (value: unknown) => void | undefined,
			rejectPromise: undefined  as unknown as (value: unknown) => void | undefined,
		}
	},
	methods: {
		show() {
			this.openModal(this.id)
			return new Promise((resolve, reject) => {
				this.resolvePromise = resolve
				this.rejectPromise = reject
			})
		},
		_confirm() {
			this.resolvePromise(true)
			this.closeModal(this.id)
		},
		_cancel(cb?: () => void) {
			this.rejectPromise(false)
			if (cb) cb();
		}
	}
})
</script>

<template>
	<BaseModal :id="id" v-slot="{close}" @close="_cancel" >
		<section class="modal">
			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="_cancel(close)">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 v-if="title" class="modal__title" v-html="title"></h3>

			<p v-if="text" class="popup__text" v-html="text"></p>

			<div class="modal__bottom">
				<div class="modal__buttons">
					<button class="btn" @click.prevent="_confirm">
						<span class="btn__text">{{ confirmButton }}</span>
					</button>
					<button class="btn btn--color-secondary" @click.prevent="_cancel(close)">
						<span class="btn__text">{{ cancelButton }}</span>
					</button>
				</div>
			</div>

		</section>
	</BaseModal>
</template>

<style scoped></style>
