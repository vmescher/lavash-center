<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "BaseTableRow",
	props: {
		theme: {
			type: String,
			default: 'default'
		}
	}
})
</script>

<template>
	<tr class="table-row" :class="[theme ? `table-row--theme-${theme}` : '']">
		<slot></slot>
	</tr>
</template>

<style scoped lang="sass">
.table-row
	position: relative

	&--theme
		&-default

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

		&-secondary
			&:first-child
				&:deep(td)
					padding-top: 0

			&:deep(.table-actions)
				justify-content: flex-end

			&:last-child
				&:deep(td)
					padding-bottom: 0

					&:first-child
						&::before
							display: none

			&:deep(td)
				padding-bottom: rem(24)

				vertical-align: middle

				&:last-child
					padding-right: 0

				&:first-child
					padding-left: 0

					&::before
						content: ''
						position: absolute
						top: 100%
						left: 0
						z-index: var(--z-index-below)

						display: block
						width: 100%
						height: 2px

						background-color: var(--color-neutral-fifth)
						border-radius: var(--radius-divider)

</style>
