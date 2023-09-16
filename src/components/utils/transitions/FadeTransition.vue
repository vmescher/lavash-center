<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
	name: 'FadeTransition',
	props: {
		mode: {
			type: String as PropType<'in-out' | 'out-in' | ''>,
			default: '',
		},
	},
});
</script>

<template>
	<transition name="fade" :mode="mode">
		<slot></slot>
	</transition>
</template>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
	transition: opacity .5s ease

.fade-enter-from,
.fade-leave-to
	opacity: 0
</style>
