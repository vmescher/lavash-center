<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";

export default defineComponent({
	name: "NewPasswordModal",
	components: {IconSVG, InputText, BaseModal}
})
</script>

<template>
	<BaseModal id="new-password-modal" v-slot="{close}">
		<section class="modal">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">Восстановление пароля</h3>

			<p class="modal__text">Придумайте новый пароль.</p>

			<div class="modal__divider"></div>

			<form class="modal__form form">
				<div class="form__inputs">
					<div class="form__input">
						<InputText id="recover-password-new-password" label="Придумайте новый пароль" placeholder="Введите новый пароль" password />
					</div>
					<div class="form__input">
						<InputText id="recover-password-repeat-password" label="Повторите новый пароль" placeholder="Введите новый пароль еще раз" password />
					</div>
				</div>
				<div class="form__bottom">
					<p class="form__policy form__policy--grey">
						Нажимая кнопку «Сохранить», Вы&nbsp;<a href="#">соглашаетесь</a> с&nbsp;условиями <a href="#">политики обработки персональных данных</a>.
					</p>
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary">
							<span class="btn__text">сохранить</span>
						</button>
					</div>
				</div>
			</form>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
