<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import InputCheckbox from "@components/utils/form/InputCheckbox.vue";

export default defineComponent({
	name: "ProfileForm",
	components: {InputCheckbox, InputText, IconSVG},
	data() {
		return {
			formEditable: false
		}
	}
})
</script>

<template>
	<form class="form">
		<div class="form__top">
			<h3 class="form__title">Личные данные</h3>
		</div>
		<div class="form__inputs form__input--4">
			<div class="form__input">
				<InputText label="Имя" placeholder="Введите имя" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText label="Фамилия" placeholder="Введите фамилию" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText label="E-mail" placeholder="Введите e-mail" type="email" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText label="Телефон" placeholder="Введите телефон" type="tel" mask-type="phoneMask" :read-only="!formEditable"/>
			</div>
			<div class="form__input form__input--2">
				<InputText label="Название организации" placeholder="Введите название вашей фирмы" :read-only="!formEditable">
					<template #underInput>
						<span class="form__underhint">Заполните поле, чтобы нам было проще вас узнать.</span>
					</template>
				</InputText>
			</div>
			<div class="form__input form__input--4">
				<InputCheckbox text="Высылать мне напоминание на телефон, чтобы я не забывал оформить заказ."/>
			</div>
		</div>
		<div class="form__bottom">
			<div class="form__submit">
				<template v-if="!formEditable">
					<button class="btn btn--color-secondary" @click="formEditable = true">
						<span class="btn__text">Редактировать личные данные</span>
						<IconSVG name="edit" class="btn__icon"/>
					</button>
					<button class="btn">
						<span class="btn__text">Изменить пароль</span>
					</button>
				</template>
				<template v-else>
					<button class="btn" @click="formEditable = false">
						<span class="btn__text">Не сохранять</span>
					</button>
					<button class="btn btn--color-secondary">
						<span class="btn__text">Сохранить изменения</span>
					</button>
				</template>
			</div>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
