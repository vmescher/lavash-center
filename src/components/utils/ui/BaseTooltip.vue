<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {createPopper, Instance} from '@popperjs/core';

export default defineComponent({
	name: 'BaseTooltip',
	props: {
		placement: {
			type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
			default: 'top',
		},
		offset: {
			type: Array as unknown as PropType<[number, number]>,
			default: () => [0, 12],
		},
		flip: {
			type: Boolean,
			default: true,
		},
		showOnClick: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		return {
			createPopper,
		};
	},
	data() {
		return {
			popperWillHide: false,
			popperHideTimeout: null as number | null,
			popperShown: false,
			popper: null as Instance | null,
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
	mounted() {
		this.initPopper();
	},
	methods: {
		initPopper() {
			this.popper = this.createPopper(
				this.$refs.trigger as Element,
				this.$refs.tooltip as HTMLElement,
				{
					placement: this.placement,
					modifiers: [
						{
							name: 'preventOverflow',
							options: {
								padding: 8,
							},
						},
						{
							name: 'offset',
							options: {
								offset: this.offset,
							},
						},
						{
							name: 'flip',
							enabled: this.flip,
							options: {
								padding: 8,
							},
						},
					],
				}
			);
		},
		showPopper() {
			if (this.popperShown) {
				this.popperWillHide = false;
				return;
			}

			this.popperShown = true;

			this.popper?.setOptions((options) => ({
				...options,
				modifiers: [
					...(options.modifiers as unknown[]),
					{
						name: 'eventListeners',
						enabled: true,
					},
				],
			}));

			this.popper?.update();
		},
		startHidingPopover() {
			this.popperWillHide = true;

			if (this.popperHideTimeout) {
				clearTimeout(this.popperHideTimeout);
			}

			this.popperHideTimeout = setTimeout(() => {
				if (this.popperWillHide) {
					this.hidePopper();
				}
			}, 500);
		},
		hidePopper() {
			this.popperWillHide = false;
			this.popperShown = false;

			this.popper?.setOptions((options) => ({
				...options,
				modifiers: [
					...(options.modifiers as unknown[]),
					{
						name: 'eventListeners',
						enabled: true,
					},
				],
			}));
		},
	},
});
</script>

<template>
	<div
		v-click-outside="hidePopper"
		class="tooltip"
		@[showEvents]="showPopper"
		@[hideEvents]="startHidingPopover">
		<div ref="trigger" class="tooltip__trigger" aria-describedby="tooltip">
			<slot></slot>
		</div>
		<div v-show="popperShown" ref="tooltip" class="tooltip__content" role="tooltip">
			<div class="tooltip__arrow" data-popper-arrow></div>
			<slot name="tooltip"></slot>
		</div>
	</div>
</template>

<style scoped lang="sass">
.tooltip
	&__content
		max-width: rem(280)
		padding: rem(16) rem(24)

		font-size: var(--fontSizeP2)
		line-height: var(--lineHeightP1)

		background: var(--color-neutral-100)
		border-radius: var(--radius-l)

		&[data-popper-placement^='top'] > .tooltip__arrow
			bottom: rem(-8)

		&[data-popper-placement^='bottom'] > .tooltip__arrow
			top: rem(-8)

		&[data-popper-placement^='left'] > .tooltip__arrow
			right: rem(-8)

		&[data-popper-placement^='right'] > .tooltip__arrow
			left: rem(-8)


	&__arrow
		position: absolute

		size: rem(24)

		background: inherit

		visibility: hidden

		&::before
			content: ''
			position: absolute

			size: rem(24)

			background: inherit

			visibility: visible
			transform: rotate(45deg)
</style>
