<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {ErrorObject} from '@vuelidate/core';

export default defineComponent({
	name: 'InputTemplate',
	props: {
		label: {
			type: String,
			default: () => '',
		},
		tag: {
			type: String as PropType<'label' | 'span'>,
			default: () => 'label',
		},
		id: {
			type: String,
			default: '',
		},
		errors: {
			type: Array as PropType<string[] | ErrorObject[]>,
			default: () => [],
		},
	},
});
</script>

<template>
	<div class="default-input">
		<component :is="tag" v-if="label" :for="id" class="default-input__label">
			<slot name="label" :label-value="label">
				<span class="default-input__label-text">{{ label }}</span>
			</slot>
		</component>
		<div class="default-input__input">
			<slot></slot>
			<slot name="action"></slot>
		</div>
		<ul v-if="errors.length" class="default-input__errors">
			<li class="default-input__error">
				{{ typeof errors[0] === 'string' ? errors[0] : errors[0].$message }}
			</li>
		</ul>
		<div v-if="$slots.underInput && !errors.length" class="default-input__bottom">
			<slot name="underInput"></slot>
		</div>
	</div>
</template>

<style scoped lang="sass">
.default-input
	display: flex
	flex-direction: column

	&__label
		margin-bottom: rem(8)

		font-size: var(--fontSizeP3)
		line-height: var(--lineHeightP1)
		font-weight: 500

	&__input
		position: relative

		min-width: rem(250)
		display: flex
		align-items: center
		gap: rem(12)

	&__errors
		margin-top: rem(8)

	&__error
		font-size: var(--fontSizeP3)
		line-height: var(--lineHeightP1)
		font-weight: 500
		color: var(--color-negative)

	&__bottom
		margin-top: rem(8)
</style>
