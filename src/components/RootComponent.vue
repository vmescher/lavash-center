<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import BaseLoader from "@components/utils/ui/BaseLoader.vue";
import {BaseLayouts} from "@scripts/router/types";

export default defineComponent({
	name: 'RootComponent',
	components: {
		BaseLoader,
		MainLayout: defineAsyncComponent({
			loadingComponent: BaseLoader,
			loader: () => import('@components/layouts/MainLayout.vue'),
		}),
	},
	computed: {
		layout(): BaseLayouts {
			if (this.$route.meta.layout) {
				return this.$route.meta.layout;
			}
			return 'MainLayout';
		},
	},
});
</script>

<template>
	<component :is="layout" >
		<router-view />
	</component>
</template>

<style scoped lang="sass"></style>
