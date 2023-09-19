<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useModalsStore } from '@scripts/hooks/stateHooks/useModalsStore';

export default defineComponent({
	name: 'BaseModal',
	mixins: [useModalsStore],
	props: {
		id: {
			type: String,
			required: true,
		},
		appearStyle: {
			type: String as PropType<'scale' | 'slide'>,
			default: 'slide',
		},
		autoOpen: {
			type: Boolean,
			default: false,
		}
	},
	emits: ['close', 'open'],
	computed: {
		isOpened() {
			return this.isModalOpened(this.id);
		},
	},
	watch: {
		isOpened(isOpened) {
			if (isOpened) {
				this.$emit('open');
			}
		},
	},
	mounted() {

		try {
			this.registerModal(this.id);
		} catch (error) {
			console.error(error);
		}

		this.checkSupport();

		if(this.autoOpen) this.showModal()
	},
	unmounted() {
		try {
			this.unregisterModal(this.id);
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		showModal() {
			this.openModal(this.id);
		},
		hideModal() {
			this.closeModal(this.id);
			this.$emit('close');
		},
		checkSupport() {
			if (window.HTMLDialogElement) {
				return;
			}

			import('dialog-polyfill').then(({ default: polyfill }) => {
				polyfill.registerDialog(this.$refs.modal as unknown as HTMLDialogElement);
			});
		},
	},
});
</script>

<template>
	<teleport to="#modals-container">
		<transition :name="`modal-${appearStyle}`" :duration="450" appear>
			<dialog
					v-if="isOpened"
					ref="modal"
					class="modal-window"
					:open="isOpened"
					@keydown.esc="hideModal">
				<div class="modal-window__bg"></div>

				<div class="modal-window__body wrapper" @click.self="hideModal">
					<slot :close="hideModal" :open="showModal"></slot>
				</div>
			</dialog>
		</transition>
	</teleport>
</template>

<style scoped lang="sass">
.modal-window
	position: fixed
	top: 0
	left: 0
	z-index: var(--z-index-modal)
	transform: translate3d(0, 0, 1px)

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
		padding: rem(56)

		overflow-y: auto
		will-change: transform
		+hide-scroll

		+until-tablet
			padding: rem(12)

	&__bg
		position: absolute
		top: 0
		left: 0
		z-index: -1

		width: 100%
		height: 100%

		background: rgba(var(--color-primary-rgb), .4)
		pointer-events: none

.modal-scale-enter-active,
.modal-slide-enter-active
	& .modal-window
		&__bg
			transition: opacity .3s ease

		&__body
			transition: transform .3s ease .15s, opacity .3s ease .15s

.modal-scale-leave-active,
.modal-slide-leave-active
	& .modal-window
		&__bg
			transition: opacity .3s ease .15s

		&__body
			transition: transform .3s ease, opacity .3s ease

.modal-scale-enter-from,
.modal-scale-leave-to
	& .modal-window
		&__bg
			opacity: 0

		&__body
			transform: scale(.85)
			opacity: 0

.modal-slide-enter-from,
.modal-slide-leave-to
	& .modal-window
		&__bg
			opacity: 0

		&__body
			transform: translateY(-25%)
			opacity: 0

</style>
