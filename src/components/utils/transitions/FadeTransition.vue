<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: 'FadeTransition',
});
</script>

<template>
	<transition name="fade">
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
