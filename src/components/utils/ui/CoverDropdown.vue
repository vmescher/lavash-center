<script lang="ts">
import {defineComponent} from 'vue';
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: 'CoverDropdown',
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
	},
	unmounted() {
		try {
			this.unregisterModal(this.id);
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		showDropdown() {
			this.openModal(this.id);
		},
		hideDropdown() {
			this.closeModal(this.id);
		},
		toggleDropdown() {
			if (this.isOpened) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
		},
	},
});
</script>

<template>
	<div
		class="cover-dropdown"
		:class="[{ active: isOpened }]"
		>

		<transition name="cover-dropdown" :duration="450" appear>
			<div v-if="isOpened" class="cover-dropdown__blackout" @click="hideDropdown"></div>
		</transition>

		<div ref="trigger" class="cover-dropdown__trigger" @click="toggleDropdown">
			<slot :dropdown-shown="isOpened"></slot>
		</div>

		<transition name="cover-dropdown" :duration="450" appear>
			<div v-if="isOpened" ref="dropdown" class="cover-dropdown__body">
				<div class="cover-dropdown__content">
					<slot name="dropdown"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="sass">
.cover-dropdown
	position: relative

	&__body
		position: absolute
		top: calc(100% + rem(24))
		right: 0
		z-index: var(--z-index-modal)

		height: var(--window-height)
		max-height: calc(var(--window-height) - var(--header-height) - rem(64))
		max-width: rem(605)
		width: 100vw

	&__content
		height: 100%
		width: 100%
		display: flex
		flex-direction: column

		& > *:only-child
			height: 100%

	&__blackout
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: var(--z-index-modal)

		background-color: rgba(var(--color-primary-rgb), .4)


.cover-dropdown-enter-active
	transition: transform .3s ease .15s, opacity .3s ease .15s

.cover-dropdown-leave-active
	transition: transform .3s ease, opacity .3s ease

.cover-dropdown-enter-from, .cover-dropdown-leave-to
	&.cover-dropdown
		&__blackout
			opacity: 0

		&__body
			transform: translateY(25px)
			opacity: 0
</style>
