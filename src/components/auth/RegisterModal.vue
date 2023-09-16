<script lang="ts">
import {defineComponent} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";

export default defineComponent({
	name: "RegisterModal",
	components: {
		InputText,
		IconSVG,
	},
	emits: ['close'],
})
</script>

<template>
	<section class="modal modal--wide">

		<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="$emit('close')">
			<IconSVG name="close" class="link__icon"/>
		</button>

		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<slot name="tabs"></slot>

		<div class="modal__divider"></div>

		<form class="modal__form form">
			<div class="form__inputs form__inputs--2">
				<div class="form__input">
					<InputText id="register-name"  label="Имя" placeholder="Введите имя"/>
				</div>
				<div class="form__input">
					<InputText id="register-lastname" label="Фамилия" placeholder="Введите фамилию"/>
				</div>
				<div class="form__input">
					<InputText id="register-email" label="E-mail" type="email" placeholder="Введите почту"/>
				</div>
				<div class="form__input">
					<InputText id="register-phone" label="Телефон" type="tel" mask-type="phoneMask" placeholder="Введите номер телефона"/>
				</div>
				<div class="form__input">
					<InputText id="register-password" label="Придумайте пароль" placeholder="Введите пароль" password />
				</div>
				<div class="form__input">
					<InputText id="register-repeat-password" label="Повторите пароль" placeholder="Введите пароль еще раз" password />
				</div>
			</div>
			<div class="form__bottom">
				<p class="form__policy form__policy--grey">
					Нажимая кнопку «Зарегистрироваться», Вы&nbsp;<a href="#">соглашаетесь</a> с&nbsp;условиями <a href="#">политики обработки персональных данных</a>.
				</p>
				<div class="form__submit form__submit--rtl">
					<button class="btn btn--color-secondary">
						<span class="btn__text">Зарегистрироваться</span>
					</button>
				</div>
			</div>
		</form>

	</section>
</template>

<style scoped lang="sass">

</style>
