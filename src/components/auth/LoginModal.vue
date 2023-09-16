<script lang="ts">
import {defineComponent} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";

export default defineComponent({
	name: "LoginModal",
	components: {IconSVG, InputText},
	mixins: [useModalsStore],
	emits: ['close'],
})
</script>

<template>
	<section class="modal">

		<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="$emit('close')">
			<IconSVG name="close" class="link__icon"/>
		</button>

		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<slot name="tabs"></slot>

		<div class="modal__divider"></div>

		<form class="modal__form form">
			<div class="form__inputs">
				<div class="form__input">
					<InputText id="auth-login" label="E-mail" type="email" placeholder="Введите почту"/>
				</div>
				<div class="form__input">
					<InputText id="auth-password" label="Пароль" placeholder="Введите пароль" password>
						<template #underInput>
							<span class="form__underhint">Забыли пароль? <a href="#" class="link link--secondary link--size-small link--color-fourth" @click="openModal('recover-password-modal')">Восстановить</a></span>
						</template>
					</InputText>
				</div>
			</div>
			<div class="form__bottom">
				<p class="form__policy form__policy--grey">
					Нажимая кнопку «Войти», Вы&nbsp;<a href="#">соглашаетесь</a> с&nbsp;условиями <a href="#">политики обработки персональных данных</a>.
				</p>
				<div class="form__submit form__submit--rtl">
					<button class="btn btn--color-secondary">
						<span class="btn__text">Войти</span>
					</button>
				</div>
			</div>
		</form>

	</section>
</template>

<style scoped lang="sass">

</style>
