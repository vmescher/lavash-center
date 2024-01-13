<script lang="ts">
import {defineComponent, inject} from 'vue'

export default defineComponent({
	name: "BaseTableRow",
	props: {
		theme: {
			type: String,
			default: 'default'
		}
	},
	setup() {
		const isAdaptive = inject('adaptive') as boolean;
		return {
			isAdaptive
		}
	}
})
</script>

<template>
	<tr class="table-row" :class="[theme ? `table-row--theme-${theme}` : '', {'table-row--adaptive' : isAdaptive}]">
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
				background-color: var(--color-neutral-tertiary)
				border-top: 2px solid transparent
				border-bottom: 2px solid transparent
				transition: border-color .3s ease

				&:first-child
					border-left: 2px solid transparent
					border-radius: var(--radius-picture) 0 0 var(--radius-picture)

				&:last-child
					border-right: 2px solid transparent
					border-radius: 0 var(--radius-picture) var(--radius-picture) 0

				&:only-child
					border-radius: var(--radius-picture)

			+hover
				&:deep(td)
					border-color: var(--color-tertiary)

		&-secondary

			&:not(:last-child)
				+until-tablet
					&::after
						content: ''
						position: absolute
						bottom: 0
						left: 0
						z-index: var(--z-index-below)

						display: block
						width: 100%
						height: 2px

						background-color: var(--color-neutral-fifth)

			&:first-child
				&:deep(td)
					padding-top: 0

			&:deep(.table-actions)
				justify-content: flex-end

			&:last-child
				&:deep(td)
					padding-bottom: 0

					&::before
						display: none

			&:deep(td)
				position: relative
				padding-bottom: fluid(16, 24)

				vertical-align: middle

				+until-tablet
					padding: 0

				&::before
					content: ''
					position: absolute
					bottom: 0
					left: 0
					z-index: var(--z-index-below)

					display: block
					width: 100%
					height: 2px

					background-color: var(--color-neutral-fifth)

					+until-tablet
						display: none

				&:last-child
					padding-right: 0

					&:before
						border-radius: var(--radius-divider) 0 0 var(--radius-divider)

				&:first-child
					padding-left: 0

					&:before
						border-radius: 0 var(--radius-divider) var(--radius-divider) 0

				&:only-child
					&:before
						border-radius: var(--radius-divider)

	&--adaptive
		&.table-row
			&--theme
				&-secondary
					+until-tablet
						display: flex
						align-items: flex-start
						justify-content: space-between
						flex-wrap: wrap
						width: 100%
						gap: rem(16) rem(32)
						padding-bottom: rem(16)
						padding-top: rem(16)

					+while-mob-xl
						gap: rem(16) rem(24)

					&:first-child
						+until-tablet
							&::before
								content: ''
								position: absolute
								top: 0
								left: 0
								z-index: var(--z-index-below)

								display: block
								width: 100%
								height: 2px

								background-color: var(--color-neutral-fifth)
								border-radius: var(--radius-divider)

					&:last-child
						+until-tablet
							padding-bottom: 0

					&:deep(td)
						+until-tablet
							padding: 0

</style>
