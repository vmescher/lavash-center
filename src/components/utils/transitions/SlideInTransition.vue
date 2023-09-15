<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
	name: "SlideInTransition",
	props: {
		mode: {
			type: String as PropType<'in-out' | 'out-in'>,
			default: 'out-in',
		},
		appear: {
			type: Boolean,
			default: false,
		},
	}
})
</script>

<template>
	<transition name="slide-in" :mode="mode" :appear="appear">
		<slot></slot>
	</transition>
</template>

<style scoped lang="sass">
.slide-in-enter-active,
.slide-in-leave-active
	transition: all .5s ease

.slide-in-enter-from,
.slide-in-leave-to
	transform: translateX(25px)
	opacity: 0

.slide-in-enter-to,
.slide-in-leave-from
	transform: translateX(0)
	opacity: 1

</style>
