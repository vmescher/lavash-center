<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
	name: 'BaseDropdown',
	props: {
		showOnClick: {
			type: Boolean,
			default: false,
		},
		rtl: {
			type: Boolean,
			default: false,
		},
		colorScheme: {
			type: String as PropType<'default' | 'bordered'>,
			default: () => 'default',
		},
	},
	data() {
		return {
			dropdownWillHide: false,
			dropdownHideTimeout: null as number | null,
			dropdownShown: false,
		};
	},
	computed: {
		showEvents() {
			if (this.showOnClick) {
				return 'click';
			}

			return 'mouseenter';
		},
		hideEvents() {
			if (this.showOnClick) {
				return '';
			}
			return 'mouseleave';
		},
	},
	methods: {
		showDropdown() {
			if (this.dropdownShown) {
				this.dropdownWillHide = false;
				return;
			}

			this.dropdownShown = true;
		},
		startHidingDropdown() {
			this.dropdownWillHide = true;

			if (this.dropdownHideTimeout) {
				clearTimeout(this.dropdownHideTimeout);
			}

			this.dropdownHideTimeout = setTimeout(() => {
				if (this.dropdownWillHide) {
					this.hideDropdown();
				}
			}, 500);
		},
		hideDropdown() {
			this.dropdownWillHide = false;
			this.dropdownShown = false;
		},
	},
});
</script>

<template>
	<div
		v-click-outside="hideDropdown"
		class="dropdown"
		:class="[{ active: dropdownShown }, `dropdown--${colorScheme}`, { 'dropdown--rtl': rtl }]"
		@[showEvents]="showDropdown"
		@[hideEvents]="startHidingDropdown">
		<div ref="trigger" class="dropdown__trigger">
			<slot :dropdown-shown="dropdownShown"></slot>
		</div>
		<transition name="dropdown">
			<div v-show="dropdownShown" ref="dropdown" class="dropdown__body">
				<div class="dropdown__content">
					<slot name="dropdown"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="sass">
.dropdown
	--dropdown-border-width: 2px
	--dropdown-border-style: solid
	--dropdown-border-color: transparent

	position: relative

	&__body
		position: absolute
		top: calc(100% + rem(8))
		left: 0
		z-index: var(--z-index-dropdown)

		padding: rem(16) 0
		max-width: rem(280)

		background: var(--color-neutral-tertiary)
		border-radius: var(--radius-picture)
		border: var(--dropdown-border-width) var(--dropdown-border-style) var(--dropdown-border-color)
		box-shadow: var(--shadow-primary-down)

	&__content
		padding: 0 rem(24)
		max-height: rem(320)

		overflow-y: auto
		+Vscroll

	&__icon
		transition: transform .3s ease

	&.active
		& .dropdown
			&__icon
				transform: rotate(180deg)

	&--bordered
		--dropdown-border-color: var(--color-neutral-secondary)

	&--rtl
		& .dropdown
			&__body
				left: unset
				right: 0


.dropdown-enter-active,
.dropdown-leave-active
	transition: opacity .3s ease, transform .3s ease

.dropdown-enter-from,
.dropdown-leave-to
	transform: translateY(-8px)
	opacity: 0
</style>
