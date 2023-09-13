<script lang="ts">
import {defineComponent} from 'vue'
import BaseHeader from "@components/structural/BaseHeader.vue";
import BaseFooter from "@components/structural/BaseFooter.vue";

export default defineComponent({
	name: "MainLayout",
	components: {BaseFooter, BaseHeader}
})
</script>

<template>
	<div class="layout">
		<BaseHeader/>

		<router-view/>

		<BaseFooter/>
	</div>
</template>

<style scoped lang="sass">

</style>
