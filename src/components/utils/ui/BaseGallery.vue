<script lang="ts">
import {defineComponent} from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default defineComponent({
	name: 'BaseGallery',
	props: {
		galleryId: {
			type: String,
			required: true,
			default: 'gallery',
		},
	},
	data() {
		return {
			lightbox: null as PhotoSwipeLightbox | null,
		};
	},
	mounted() {
		this.lightbox = new PhotoSwipeLightbox({
			gallery: `#${this.galleryId}`,
			children: 'a',
			pswpModule: () => import('photoswipe'),
		});
		this.lightbox.init();
	},
	unmounted() {
		this.lightbox?.destroy();
		this.lightbox = null;
	},
});
</script>

<template>
	<slot></slot>
</template>

<style scoped lang="sass"></style>
