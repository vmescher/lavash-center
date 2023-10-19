<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "BaseNotion"
})
</script>

<template>
<article class="notion">
	<h5 class="notion__title">
		<slot></slot>
	</h5>
	<p class="notion__text">
		<slot name="text"></slot>
	</p>
</article>
</template>

<style scoped lang="sass">
.notion
	position: relative

	padding: rem(32)

	background-color: var(--color-neutral-fourth)
	border-radius: var(--radius-block-secondary)

	+until-tablet
		padding: rem(24)

	+while-mob-xl
		padding: rem(24) rem(16)

	&::before
		content: ''
		position: absolute
		right: rem(32)
		bottom: rem(32)

		width: rem(88)
		height: rem(80)

		background-color: var(--color-neutral-primary)
		mask-image: url("@img/once-pattern.svg")
		mask-position: center
		mask-size: contain
		mask-repeat: no-repeat

		+while-mob-xl
			right: rem(24)
			bottom: rem(24)

			width: rem(48)
			height: rem(48)

		+while-mob
			right: rem(16)
			bottom: rem(16)

	&__title
		font-size: var(--fontSizePBig)
		line-height: var(--lineHeightP1)
		font-weight: 600

		+while-mob-xl
			font-size: var(--fontSizeP1)

		+while-mob
			font-size: var(--fontSizeP2)

		&:not(:last-child)
			margin-bottom: rem(20)

			+while-mob-xl
				margin-bottom: rem(16)

			+while-mob
				margin-bottom: rem(12)

	&__text
		max-width: 52.5%

		font-size: var(--fontSizeP1)
		line-height: var(--lineHeightP1)
		font-weight: 500

		+while-mob-xl
			max-width: 80%

			font-size: var(--fontSizeP2)

		+while-mob
			font-size: var(--fontSizeP3)
</style>
