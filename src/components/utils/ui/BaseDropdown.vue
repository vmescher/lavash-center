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
		top: calc(100% + rem(12))
		left: 0
		z-index: var(--z-index-dropdown)

		max-width: rem(280)

	&__content
		padding: rem(26)

		background: var(--color-neutral-100)
		border-radius: var(--radius-l)
		border: var(--dropdown-border-width) var(--dropdown-border-style) var(--dropdown-border-color)

		+until-tablet
			padding: rem(16)

	&__icon
		transition: transform .3s ease

	&__nav
		display: flex
		flex-direction: column
		gap: rem(12)

	&__divider
		display: block
		width: 100%
		height: 2px

		background-color: var(--color-neutral-200)

	&.active
		& .dropdown
			&__icon
				transform: rotate(180deg)

	&--bordered
		--dropdown-border-color: var(--color-primary-500)

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
