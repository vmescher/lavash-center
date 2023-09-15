<script lang="ts">
import {defineComponent} from 'vue'
import InputText from "@components/utils/form/InputText.vue";

export default defineComponent({
	name: "AddressesForm",
	components: {InputText},
})
</script>

<template>
	<form class="form">
		<div class="form__top">
			<h3 class="form__title">Адрес доставки</h3>
		</div>
		<div class="form__inputs form__inputs--2">
			<div class="form__input">
				<InputText label="Название организации" placeholder="Введите ваш адрес">
					<template #underInput>
						<span class="form__underhint">Заполните поле, чтобы мы знали куда доставлять ваш заказ.</span>
					</template>
				</InputText>
			</div>
		</div>
		<div class="form__submit">
			<button class="btn btn--color-secondary" disabled>
				<span class="btn__text">сохранить изменения</span>
			</button>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
