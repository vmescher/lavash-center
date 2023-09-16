<script lang="ts">
import {defineComponent} from 'vue'
import InputDate from "@components/utils/form/InputDate.vue";
import InputSelect from "@components/utils/form/InputSelect.vue";
import Multiselect from "@vueform/multiselect";
import BaseNotion from "@components/utils/ui/BaseNotion.vue";

export default defineComponent({
	name: "OrderForm",
	components: {BaseNotion, InputSelect, InputDate, Multiselect},

})
</script>

<template>
	<div class="order__block">
		<h4 class="order__title">Когда вам будет удобно забрать заказ?</h4>

		<div class="order__form form">
			<div class="form__inputs form__inputs--4">
				<div class="form__input">
					<InputDate label="Дата" placeholder="ДД.ММ.ГГГГ"/>
				</div>
				<div class="form__input">
					<InputSelect label="Время">
						<Multiselect class="input-select" placeholder="Выберите время" :options="[12, 13, 14, 15]"/>
					</InputSelect>
				</div>
			</div>
		</div>

		<BaseNotion class="order__notion">
			Обратите внимание, что оплата заказа производится при получении.

			<template #text>
				Обратите внимание, что оплата заказа производится наличными или картой курьеру или при получении по адресу
				г. Челябинск, ул. Шашлычная, д. 24.
			</template>
		</BaseNotion>

		<div class="order__bottom">
			<div class="order__total">
				<span class="order__total-title">Итого</span>
				<span class="order__total-value">12 000 ₽</span>
			</div>

			<button class="order__button btn btn--color-secondary">Оформить заказ</button>

		</div>

	</div>
</template>

<style scoped lang="sass">

</style>
