<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {RouteNames} from "@scripts/router/types";

export type Tab = {
	label: string;
	value: string | number;
	disabled: boolean;
	tag: 'button' | 'a';
}

export type RouterTab = Omit<Tab, 'tag' | 'value'> & {
	to: RouteNames;
}

export default defineComponent({
	name: 'BaseTabs',
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		tabs: {
			type: Array as PropType<Tab[]>,
			default: () => [],
		},
		routerTabs: {
			type: Array as PropType<RouterTab[]>,
			default: () => [],
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
		isActive() {
			return (tab: Tab) => this.value === tab.value;
		},
	},
	mounted() {
		if (this.tabs.length !== 0 && !this.modelValue) {
			const firstActiveTab = this.tabs.find((tab) => !tab.disabled);
			if (firstActiveTab) {
				this.value = firstActiveTab.value;
			}
		}
	},
	methods: {
		setTab(event: PointerEvent, tab: Tab) {
			event.preventDefault();
			if (tab.disabled) return;

			this.value = tab.value;

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
		<ul class="tabs__list">
			<template v-if="tabs.length">
				<li v-for="tab in tabs" :key="tab.value" class="tabs__item">
					<component
							:is="tab.tag"
							class="tab"
							:disabled="tab.disabled"
							:class="[
						{ active: isActive(tab) },
						{ disabled: tab.disabled },
					]"
							@click="setTab($event, tab)">
						{{ tab.label }}
					</component>
				</li>
			</template>
			<template v-if="routerTabs.length">
				<li v-for="tab in routerTabs" :key="tab.to" class="tabs__item">
					<router-link
							:to="{name: tab.to}"
							active-class="active"
							class="tab"
							:class="[
								{ disabled: tab.disabled },
							]">
						{{ tab.label }}
					</router-link>
				</li>
			</template>
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
		gap: rem(8)

		overflow-x: auto

</style>
