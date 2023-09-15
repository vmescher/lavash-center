<script lang="ts">
import {defineComponent} from 'vue'
import WelcomeBanner from "@components/personal-cabinet/WelcomeBanner.vue";
import CabinetNavigation from "@components/personal-cabinet/CabinetNavigation.vue";
import SlideInTransition from "@components/utils/transitions/SlideInTransition.vue";

export default defineComponent({
	name: "CabinetView",
	components: {SlideInTransition, CabinetNavigation, WelcomeBanner},
})
</script>

<template>
	<main class="page">
		<WelcomeBanner/>
		<CabinetNavigation/>

		<router-view v-slot="{Component}">
			<SlideInTransition mode="out-in">
				<component :is="Component"/>
			</SlideInTransition>
		</router-view>
	</main>
</template>

<style scoped lang="sass">

</style>
