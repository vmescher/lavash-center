<script lang="ts">
import {defineComponent, PropType} from 'vue';

type Tab =
	| {
	label: string;
	value: string | number;
	disabled?: boolean;
}
	| string;
type Tabs = Tab[];

export default defineComponent({
	name: 'BaseTabs',
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		tabs: {
			type: Array as PropType<Tabs>,
			required: true,
			default: () => [],
		},
		tag: {
			type: String as PropType<'button' | 'a'>,
			default: () => 'button',
		},
		colorScheme: {
			type: String as PropType<'default' | 'light'>,
			default: () => 'default',
		},
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			activeTab: this.modelValue,
		};
	},
	computed: {
		value: {
			get(): string | number {
				return this.modelValue ?? this.activeTab;
			},
			set(value: string | number) {
				this.activeTab = value;
				this.$emit('update:modelValue', value);
				this.$emit('change', value);
			},
		},
		getLabel() {
			return (tab: Tab) => (typeof tab === 'string' ? tab : tab.label);
		},
		isActive() {
			return (tab: Tab) =>
				typeof tab === 'string' ? this.value === tab : this.value === tab.value;
		},
	},
	mounted() {
		if (this.tabs.length !== 0 && !this.modelValue) {
			if (typeof this.tabs[0] === 'string') {
				[this.value] = this.tabs;
			} else {
				const firstActiveTab = this.tabs.find((tab) => typeof tab !== 'string' && !tab.disabled);
				if (firstActiveTab) {
					if (typeof firstActiveTab !== 'string') {
						this.value = firstActiveTab.value;
					}
				}
			}
		}
	},
	methods: {
		setTab(event: PointerEvent, tab: Tab): void {
			if (typeof tab !== 'string' && tab.disabled) {
				event.preventDefault();
				return;
			}
			this.value = typeof tab === 'string' ? tab : tab.value;

			if (event.target instanceof HTMLElement) {
				event.target.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				});
			}
		},
	},
});
</script>

<template>
	<div class="tabs">
		<ul class="tabs__list" :class="`tabs__list--${colorScheme}`">
			<li v-for="(tab, index) in tabs" :key="index" class="tabs__item">
				<component
					:is="tag"
					class="tab"
					:disabled="typeof tab !== 'string' && tab.disabled"
					:class="[
						`tab--${colorScheme}`,
						{ active: isActive(tab) },
						{ disabled: typeof tab !== 'string' && tab.disabled },
					]"
					@click="setTab($event, tab)">
					{{ getLabel(tab) }}
				</component>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="sass">
.tabs
	display: flex
	max-width: 100%

	&__list
		max-width: 100%
		width: max-content
		display: flex
		align-items: center
		gap: rem(15)

		overflow-x: auto

		&--light
			gap: 0

			border-radius: var(--radius-xl)
			background-color: var(--color-neutral-100)

.tab
	display: inline-flex
	align-items: center
	justify-content: center
	text-align: center
	gap: rem(16)
	padding: rem(12) rem(16) rem(10)

	font-size: var(--fontSizeP1)
	line-height: var(--lineHeightP1)
	font-weight: 700

	border: 2px solid transparent
	border-radius: var(--radius-xl)

	text-decoration: none
	white-space: nowrap
	cursor: pointer
	transition: color .3s ease, border-color .3s ease, background-color .3s ease

	&:focus
		outline: none

	&:focus-visible
		outline: 2px solid var(--color-primary-300)
		outline-offset: rem(-2)

	&:disabled,
	&.disabled
		pointer-events: none

		&:focus-visible
			outline: none

	&--default,
	&--light
		background-color: transparent
		color: var(--color-neutral-500)

		+hover
			color: var(--color-primary-500)

		&:active,
		&.active
			color: var(--color-neutral-100)
			background-color: var(--color-primary-500)

		&:disabled,
		&.disabled
			background-color: var(--color-neutral-200)
			color: var(--color-neutral-400)
</style>
