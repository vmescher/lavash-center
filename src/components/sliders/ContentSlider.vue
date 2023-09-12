<script lang="ts">
import {defineComponent} from 'vue';
import {Swiper} from 'swiper/vue';
import {Pagination, Navigation} from 'swiper/modules';
import {NavigationOptions, PaginationOptions} from 'swiper/types';

export default defineComponent({
	name: 'ContentSlider',
	components: {
		Swiper,
	},
	setup() {
		return {
			modules: [Pagination, Navigation],
		};
	},
	data() {
		return {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} as NavigationOptions,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			} as PaginationOptions,
		};
	},
});
</script>

<template>
	<swiper
		:modules="modules"
		:slides-per-view="1"
		:space-between="0"
		:navigation="navigation"
		:pagination="pagination"
		:speed="500"
		:loop="true">
		<template #wrapper-start>
			<slot></slot>
		</template>

		<template #container-end>
			<div class="swiper-buttons">
				<div class="swiper-button swiper-button-prev"></div>
				<div class="swiper-button swiper-button-next"></div>
			</div>

			<div class="swiper-pagination"></div>
		</template>
	</swiper>
</template>

<style scoped lang="sass"></style>
