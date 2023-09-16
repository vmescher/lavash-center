<script lang="ts">
import {defineComponent} from 'vue'
import RadioTabs, {RadioTab} from "@components/utils/form/RadioTabs.vue";

export default defineComponent({
	name: "OrderDelivery",
	components: {RadioTabs},
	data() {
		return {
			tab: 'pickup',
			tabsList: [
				{
					title: 'Самовывоз',
					description: 'Самовывоз осуществляется по адресу г. Челябинск, ул. Шашлычная, д. 24',
					note: 'Бесплатно',
					value: 'pickup',
					disabled: false
				},
				{
					title: 'Доставка',
					description: 'Оформление курьерской доставки возможно при заказе от 10 товаров. Доставка осуществляется только по городам Челябинск и Копейск.',
					note: 'Бесплатно',
					value: 'delivery',
					disabled: true
				}
			] as RadioTab
		}
	}
})
</script>

<template>
	<div class="order__block">
		<h4 class="order__title">Выберите способ получения</h4>

		<RadioTabs :tabs="tabsList" v-model="tab"/>
	</div>
</template>

<style scoped lang="sass">

</style>
