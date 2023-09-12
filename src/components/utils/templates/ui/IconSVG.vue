<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
	name: 'IconSVG',
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	setup() {
		const {BASE_URL} = import.meta.env;
		return {BASE_URL};
	},
});
</script>

<template>
	<svg aria-hidden="true">
		<use :xlink:href="`${BASE_URL}img/icons.svg#svg-${name}`"></use>
	</svg>
</template>

<style scoped lang="sass"></style>
