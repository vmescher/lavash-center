<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "BaseTableRow"
})
</script>

<template>
	<tr class="table-row">
		<slot></slot>
	</tr>
</template>

<style scoped lang="sass">
.table-row
	position: relative

	cursor: pointer

	&:deep(td)
		&:first-child
			&::before
				content: ''
				position: absolute
				top: 0
				left: 0
				z-index: var(--z-index-below)

				display: block
				width: 100%
				height: 100%

				background-color: var(--color-neutral-tertiary)
				border-radius: var(--radius-picture)
				border: 2px solid transparent

				transition: border-color .3s ease

	+hover
		&:deep(td)
			&:first-child
				&::before
					border-color: var(--color-tertiary)

</style>
