<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import BaseLoader from "@components/utils/ui/BaseLoader.vue";
import {BaseLayouts} from "@scripts/router/types";
import FadeTransition from "@components/utils/transitions/FadeTransition.vue";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";

export default defineComponent({
	name: 'RootComponent',
	components: {
		FadeTransition,
		BaseLoader,
		MainLayout: defineAsyncComponent({
			loadingComponent: BaseLoader,
			loader: () => import('@components/layouts/MainLayout.vue'),
		}),
		SimpleLayout: defineAsyncComponent({
			loadingComponent: BaseLoader,
			loader: () => import('@components/layouts/SimpleLayout.vue'),
		}),
	},
	mixins: [useBaseStore, useContentsStore],
	computed: {
		layout(): BaseLayouts {
			if (this.$route.meta.layout) {
				return this.$route.meta.layout;
			}
			return 'MainLayout' as BaseLayouts;
		},
	},
	created() {
		this.requestLegalDocs();
	}
});
</script>

<template>
	<FadeTransition mode="out-in">
		<component :is="layout" >
			<router-view />
		</component>
	</FadeTransition>

	<BaseLoader v-if="isAppLoading"/>

	<div id="modals-container" class="modals-container"></div>
</template>

<style scoped lang="sass"></style>
