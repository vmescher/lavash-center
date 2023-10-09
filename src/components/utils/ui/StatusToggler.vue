<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseDropdown from "@components/utils/ui/BaseDropdown.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export type Status = {
	id: number;
	name: string;
	xmlId: string;
}

export default defineComponent({
	name: "StatusToggler",
	components: {IconSVG, BaseDropdown},
	props: {
		modelValue: {
			type: Number,
			required: true,
			default: 1
		},
		statuses: {
			type: Array as PropType<Status[]>,
			default: () => []
		},
		isEditable: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue'],
	computed: {
		activeStatus(): Status {
			return this.statuses.find(status => status.id === this.value) || {
				id: 1,
				name: 'Новый',
				xmlId: 'new'
			} as Status;
		},
		value: {
			get(): number {
				return this.modelValue;
			},
			set(value: number) {
				this.$emit('update:modelValue', value);
			}
		}
	}
})
</script>

<template>
	<div class="status-toggler">
		<BaseDropdown v-if="isEditable">
			<button class="status-toggler__button" :class="`status-toggler__button--color-${activeStatus.xmlId}`">
				{{ activeStatus.name }}
				<IconSVG name="chevron-down" class="status-toggler__button-icon dropdown__icon"/>
			</button>

			<template #dropdown>
				<ul class="status-toggler__list">
					<li v-for="status in statuses" :key="status.id" class="status-toggler__item">
						<button class="status-toggler__button status-toggler__button--simple" :class="`status-toggler__button--color-${status.xmlId}`" @click="value = status.id">
							{{ status.name }}
						</button>
					</li>
				</ul>
			</template>
		</BaseDropdown>
		<button v-else class="status-toggler__button" :class="`status-toggler__button--color-${activeStatus.xmlId}`" disabled>
			{{ activeStatus.name }}
		</button>
	</div>
</template>

<style scoped lang="sass">
.status-toggler
	--status-toggler-px: #{rem(20)}
	--status-toggler-py: #{rem(10)}
	--status-toggler-gap: #{rem(8)}

	--status-toggler-font-family: var(--font-secondary)
	--status-toggler-font-size: var(--fontSizeP2)
	--status-toggler-line-height: var(--lineHeightP1)
	--status-toggler-font-weight: 600
	--status-toggler-text-transform: uppercase

	--status-toggler-color: var(--color-primary)
	--status-toggler-bg: var(--color-neutral-fifth)

	--status-toggler-radius: var(--radius-btn)

	--status-toggler-icon-size: #{rem(16)}

	&__button
		display: flex
		align-items: center
		justify-content: center
		gap: var(--status-toggler-gap)
		padding: var(--status-toggler-py) var(--status-toggler-px)
		min-height: calc(var(--status-toggler-font-size) * var(--status-toggler-line-height) + var(--status-toggler-py) * 2)

		font-family: var(--status-toggler-font-family)
		font-size: var(--status-toggler-font-size)
		line-height: 1
		font-weight: var(--status-toggler-font-weight)
		color: var(--status-toggler-color)
		text-transform: var(--status-toggler-text-transform)
		text-align: center
		text-decoration: none

		background-color: var(--status-toggler-bg)
		border-radius: var(--status-toggler-radius)
		white-space: nowrap

		cursor: pointer
		transition: color .3s ease, border-color .3s ease, background-color .3s ease, opacity .3s ease

		&:focus
			outline: none

		&:focus-visible
			outline: 2px solid var(--color-tertiary)
			outline-offset: 2px

		&:disabled
			pointer-events: none

		+hover
			opacity: .8

		&-icon
			display: block
			size: var(--status-toggler-icon-size)
			flex: none

			color: currentColor

		&--simple
			padding: 0
			min-height: calc(var(--status-toggler-font-size) * var(--status-toggler-line-height))

			background-color: transparent
			color: var(--status-toggler-bg)
			border-radius: 0

			+hover
				opacity: .8

		&--color
			&-new,
			&-not-paid
				--status-toggler-color: var(--color-neutral-tertiary)
				--status-toggler-bg: var(--color-secondary)

			&-in-processing
				--status-toggler-color: var(--color-neutral-tertiary)
				--status-toggler-bg: #E70

			&-on-delivery
				--status-toggler-color: var(--color-primary)
				--status-toggler-bg: var(--color-tertiary)

			&-ready,
			&-paid
				--status-toggler-color: var(--color-neutral-tertiary)
				--status-toggler-bg: var(--color-positive)

			&-done
				--status-toggler-color: var(--color-primary)
				--status-toggler-bg: var(--color-neutral-fifth)

			&-cancelled
				--status-toggler-color: var(--color-neutral-tertiary)
				--status-toggler-bg: var(--color-neutral-secondary)

	&__list
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: rem(12)


</style>
