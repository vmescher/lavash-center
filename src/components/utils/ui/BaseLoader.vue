<script lang="ts">
import {defineComponent, PropType} from 'vue';

type LoaderColorScheme = 'default' | 'dark';

export default defineComponent({
	name: 'BaseLoader',
	props: {
		colorScheme: {
			type: String as PropType<LoaderColorScheme>,
			default: () => 'default',
		},
	},
});
</script>

<template>
	<div class="loader" :class="`loader--${colorScheme}`"></div>
</template>

<style scoped lang="sass">
.loader
	position: fixed
	top: 0
	left: 0
	z-index: 999

	display: flex
	align-items: center
	justify-content: center
	width: 100%
	height: 100%

	&::before
		content: ""

		position: absolute
		left: 0
		top: 0

		width: 100%
		height: 100%

		background: var(--color-transparent-50)

	&::after
		content: ''

		size: fluid(48, 124)

		border-radius: 50%
		border-width: 4px
		border-style: solid

		animation: spin360 .7s linear infinite

		+media('max', 'laptop')
			border-width: 2px

	&--default
		&::after
			border-color: var(--color-secondary) var(--color-secondary) #FAF6EE

	&--dark
		&::after
			border-color: var(--color-neutral-100) var(--color-neutral-100) var(--color-primary-400)
</style>
