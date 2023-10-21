<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";

export type TableImage = {
	src: string | null;
	alt?: string;
}

export default defineComponent({
	name: "BaseTableColumnImages",
	components: {BaseTableColumn},
	props: {
		images: {
			type: Array as PropType<TableImage[]>,
			default: () => []
		}
	},
	data() {
		return {
			otherAmount: this.images.length - 3
		}
	},
	computed: {
		shouldBeHidden() {
			return (index: number) => {
				if (this.images.length < 4) {
					return false;
				}

				return index > 2;
			}
		},
	},
	methods: {
		hideImage(event: Event) {
			const image = event.target as HTMLImageElement;
			const parent = image.parentNode as HTMLDivElement;
			if (parent) parent.classList.add('table-images__item--empty');
		}
	}

})
</script>

<template>
	<BaseTableColumn>
		<div class="table-images">
			<template v-for="(image, index) in images" :key="index">
				<div v-if="!shouldBeHidden(index)" class="table-images__item" :class="{'table-images__item--empty' : !image.src}">
					<img :src="image.src || ''" :alt="image.alt" class="table-images__image" @error="hideImage">
				</div>
			</template>
			<div v-if="images.length > 4" class="table-images__item table-images__item--all" >
				+{{ otherAmount }}
			</div>
		</div>
	</BaseTableColumn>
</template>

<style scoped lang="sass">
.table-images
	display: flex
	align-items: center
	gap: rem(8)

	&__item
		display: flex
		justify-content: center
		align-items: center
		padding: rem(12)
		size: rem(80)

		background-color: var(--color-neutral-fourth)
		border-radius: var(--radius-divider)

		+until-tablet
			size: rem(48)
			padding: rem(4)

		&--all
			font-family: var(--font-secondary)
			font-size: var(--fontSizeP1)
			font-weight: 600
			line-height: var(--lineHeightP1)
			text-transform: uppercase

			background-color: var(--color-neutral-fifth)

		&--empty
			& .table-images
				&__image
					display: none

	&__image
		size: 100%

		object-fit: contain

</style>
