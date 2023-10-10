<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {ProductInBasket} from "@scripts/api/basket/types";
import BaseTableRow from "@components/utils/templates/table/BaseTableRow.vue";
import BaseTableColumn from "@components/utils/templates/table/BaseTableColumn.vue";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import InputCounter from "@components/utils/form/InputCounter.vue";
import BaseTableColumnText from "@components/utils/templates/table/table-columns/BaseTableColumnText.vue";
import BaseTableColumnActions from "@components/utils/templates/table/table-columns/BaseTableColumnActions.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import ProductSelect from "@components/utils/selects/ProductSelect.vue";
import {imageLoadHandler} from "@scripts/mixins/imageLoadHandler";
import {useProductsStore} from "@scripts/hooks/stateHooks/useProductsStore";

export default defineComponent({
	name: "OrderCartConstructorItem",
	components: {
		ProductSelect,
		IconSVG,
		BaseTableColumnActions, BaseTableColumnText, InputCounter, BaseTableColumn, BaseTableRow},
	mixins: [getFormattedPrice, imageLoadHandler, useProductsStore],
	props: {
		productData: {
			type: Object as PropType<ProductInBasket>,
			required: true,
			default: () => ({})
		},
		editable: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['add', 'remove', 'changeQuantity'],
	data() {
		return {
			newProductId: null as number | null,
		}
	},
	watch: {
		newProductId(value: number | null) {
			if (!value) return;
			const productData = this.getProductById(value);
			this.$emit('add', {
				name: productData.name,
				id: productData.id,
				price: productData.price,
				quantity: 1,
				picture: productData.picture,
			});
		}
	},
	methods: {
		deleteFromBasket(): void {
			this.$emit('remove');
		},
		changeQuantity(value: number): void {
			if (!this.productData.id) return;
			this.$emit('changeQuantity', value);
		},
	}
})
</script>

<template>
	<BaseTableRow theme="secondary">
		<BaseTableColumn width="60%">
			<div class="cart-constructor__product">
				<ProductSelect v-if="!productData.id" v-model="newProductId" object label="Наименование товара" placeholder="Не выбрано"/>
				<div v-else class="cart-constructor-item">
					<div class="cart-constructor-item__picture">
						<img v-if="!imageLoadError && productData.picture" class="cart-constructor-item__image" :src="productData.picture" :alt="`Фото ${productData.name}`" @error="imageErrorHandler">
					</div>
					<div class="cart-constructor-item__body">
						<div class="cart-constructor-item__info">
							<p class="cart-constructor-item__name">{{ productData.name }}</p>
							<span class="cart-constructor-item__text">{{ productData.unit }}</span>
						</div>
					</div>
				</div>
			</div>
		</BaseTableColumn>

		<BaseTableColumn>{{ getFormattedPrice(productData.price) }}</BaseTableColumn>

		<BaseTableColumn>
			<div class="cart-constructor__quantity">
				<InputCounter v-if="editable" :model-value="productData.quantity" :disabled="!productData.id" theme="bright" size="small" @increment="changeQuantity" @decrement="changeQuantity" @change="changeQuantity"/>
			</div>
		</BaseTableColumn>

		<BaseTableColumnText type="bold" no-wrap>{{ getFormattedPrice(productData.price * productData.quantity) }}</BaseTableColumnText>

		<BaseTableColumnActions>
			<button class="link" @click="deleteFromBasket">
				Удалить
				<IconSVG name="trash" class="link__icon"/>
			</button>
		</BaseTableColumnActions>
	</BaseTableRow>
</template>

<style scoped lang="sass">
.cart-constructor
	&__quantity
		width: max-content

	&__product
		min-height: rem(128)
		max-width: rem(545)
		width: 100%

.cart-constructor-item
	position: relative

	display: flex
	gap: rem(24)

	&__picture
		size: rem(128)
		padding: rem(16)
		flex-shrink: 0

		background-color: var(--color-neutral-fourth)
		border-radius: var(--radius-picture)

	&__image
		width: 100%
		height: 100%

		object-fit: contain

	&__body
		position: relative

		flex: 1 1 auto
		display: flex
		flex-direction: column

	&__info
		max-width: rem(360)
		display: flex
		align-items: flex-start
		flex-direction: column
		gap: rem(10)

	&__name
		font-size: var(--fontSizeP2)
		font-weight: 500
		line-height: var(--lineHeightP1)

		+cutString(2)

	&__text
		font-size: var(--fontSizeP3)
		font-weight: 500
		line-height: var(--lineHeightP1)
		color: var(--color-neutral-secondary)

</style>
