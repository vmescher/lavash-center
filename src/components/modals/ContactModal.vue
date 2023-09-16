<script lang="ts">
import {defineComponent} from 'vue'
import BaseModal from '@components/utils/modals/BaseModal.vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import InputTextarea from "@components/utils/form/InputTextarea.vue";

export default defineComponent({
	name: "ContactModal",
	components: {
		InputTextarea, InputText,
		IconSVG,
		BaseModal
	},
})
</script>

<template>
	<BaseModal id="contact-us-modal" v-slot="{close}">
		<section class="modal modal--wide">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">Связаться с нами</h3>

			<p class="modal__text">Вы можете оставить свои контактные данные и мы вам перезвоним. Также вы всегда можете позвонить нам сами по номеру <a href="tel:89000000000">8 900 000 00 00.</a></p>

			<div class="modal__divider"></div>

			<form class="modal__form form">
				<div class="form__inputs form__inputs--2">
					<div class="form__input">
						<InputText id="contact-us-name" label="Как мы можем к вам обращаться?" placeholder="Введите имя и фамилию"/>
					</div>
					<div class="form__input">
						<InputText id="contact-us-email" label="Ваш телефон" placeholder="Введите номер"/>
					</div>
					<div class="form__input form__input--2">
						<InputTextarea id="contact-us-comment" label="Комментарий" placeholder="Любая дополнительная информация или волнующий вас вопрос."/>
					</div>
				</div>
				<div class="form__bottom">
					<p class="form__policy form__policy--grey">
						Нажимая кнопку «Отправить заявку», Вы&nbsp;<a href="#">соглашаетесь</a> с&nbsp;условиями <a href="#">политики обработки персональных данных</a>.
					</p>
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary">
							<span class="btn__text">Отправить заявку</span>
						</button>
					</div>
				</div>
			</form>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
