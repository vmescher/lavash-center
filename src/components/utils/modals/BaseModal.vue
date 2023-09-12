<script lang="ts">
import {defineComponent} from 'vue';
import {useModalsStore} from '@scripts/hooks/stateHooks/useModalsStore';

export default defineComponent({
	name: 'ModalTemplate',
	mixins: [useModalsStore],
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	computed: {
		isOpened() {
			return this.isModalOpened(this.id);
		},
	},
	mounted() {
		try {
			this.registerModal(this.id);
		} catch (error) {
			console.error(error);
		}

		this.checkSupport();
	},
	methods: {
		showModal() {
			this.openModal(this.id);
		},
		hideModal() {
			this.closeModal(this.id);
		},
		checkSupport() {
			if (window.HTMLDialogElement) {
				return;
			}

			import('dialog-polyfill').then(({default: polyfill}) => {
				polyfill.registerDialog(this.$refs.modal as unknown as HTMLDialogElement);
			});
		},
	},
});
</script>

<template>
	<transition name="modal" :duration="450" appear>
		<dialog
			v-if="isOpened"
			ref="modal"
			class="modal-window"
			:open="isOpened"
			@keydown.esc="hideModal">
			<div class="modal-window__bg"></div>

			<div class="modal-window__body wrapper" @click.self="hideModal">
				<slot :close="hideModal"></slot>
			</div>
		</dialog>
	</transition>
</template>

<style scoped lang="sass">
.modal-window
	position: fixed
	top: 0
	left: 0
	z-index: 1000

	width: 100%
	height: 100%

	border: none
	background: transparent

	&__body
		position: relative
		z-index: 1

		display: flex
		align-items: center
		flex-direction: column
		width: 100%
		height: 100%

		overflow-x: hidden
		overflow-y: auto

	&__bg
		position: absolute
		inset: 0
		z-index: -1

		width: 100%
		height: 100%

		background: rgba(0, 0, 0, 0.5)
		pointer-events: none

.modal-enter-active
	& .modal-window
		&__bg
			transition: opacity .3s ease

		&__body
			transition: transform .3s ease .15s, opacity .3s ease .15s

.modal-leave-active
	& .modal-window
		&__bg
			transition: opacity .3s ease .15s

		&__body
			transition: transform .3s ease, opacity .3s ease

.modal-enter-from, .modal-leave-to
	& .modal-window
		&__bg
			opacity: 0

		&__body
			transform: translateY(25%)
			opacity: 0
</style>
