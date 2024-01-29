<script lang="ts">
import {defineComponent} from 'vue'
import html2pdf from 'html2pdf.js'

export default defineComponent({
	name: "PdfConstructor",
	methods: {
		savePdf(name = 'document') {
			const pdfOptions = {
				margin: 24,
				filename: `${name || 'document'}.pdf`,
				html2canvas: {
					scale: 2
				},
				jsPDF: {
					orientation: 'portrait',
					unit: 'pt',
					format: [595.28, 841.89],
					compressPDF: true
				}
			}
			const element = this.$refs.pdf as HTMLElement;
			html2pdf().from(element).set(pdfOptions).save();
		}
	}
})
</script>

<template>
	<section class="pdf">
		<div ref="pdf" class="pdf__body">
			<slot></slot>
		</div>
	</section>
</template>

<style scoped lang="sass">
.pdf
	position: fixed
	top: 0
	left: 0

	width: 100%
	height: 100%

	visibility: hidden
	overflow: auto
	pointer-events: none

	&__body
		width: 546pt
		height: 792pt

		background-color: var(--color-white)

</style>
