<script lang="ts">
import {defineComponent} from 'vue'
import MainBanner from "@components/main/MainBanner.vue";
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";
import MainCatalog from "@components/catalog/MainCatalog.vue";

export default defineComponent({
	name: "MainView",
	components: {MainCatalog, SectionTitle, MainBanner},
})
</script>

<template>
	<main class="page">
		<MainBanner/>
		<SectionTitle id="products">Наша продукция</SectionTitle>
		<MainCatalog />
	</main>
</template>

<style scoped lang="sass">

</style>
