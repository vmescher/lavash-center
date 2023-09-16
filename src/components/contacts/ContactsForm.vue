<script lang="ts">
import {defineComponent} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import InputTextarea from "@components/utils/form/InputTextarea.vue";

export default defineComponent({
	name: "ContactsForm",
	components: {InputTextarea, InputText}
})
</script>

<template>
	<section class="contact-us">
		<div class="contact-us__wrapper wrapper">
			<div class="contact-us__body">
				<div class="contact-us__bg">
					<img class="contact-us__bg-image" src="/img/contacts/form-bg.png" alt="Фон с лавашем">
				</div>
				<div class="contact-us__left">
					<h2 class="contact-us__title">Связаться с нами</h2>
				</div>
				<form class="contact-us__form form">
					<div class="form__top">
						<p class="form__text">Вы можете оставить свои контактные данные и мы вам перезвоним. Также вы всегда можете позвонить нам сами по номеру
							<a href="tel:+79000000000">8 900 000 00 00.</a>
						</p>
					</div>
					<div class="form__inputs form__inputs--2">
						<div class="form__input">
							<InputText id="contact-form-name" label="Как мы можем к вам обращаться?" placeholder="Введите имя и фамилию"/>
						</div>
						<div class="form__input">
							<InputText id="contact-form-email" label="Ваш телефон" placeholder="Введите номер"/>
						</div>
						<div class="form__input form__input--2">
							<InputTextarea id="contact-form-comment" label="Комментарий" placeholder="Любая дополнительная информация или волнующий вас вопрос."/>
						</div>
					</div>
					<div class="form__bottom">
						<p class="form__policy">
							Нажимая кнопку «Отправить заявку», Вы&nbsp;<a href="#">соглашаетесь</a> с&nbsp;условиями <a href="#">политики обработки персональных данных</a>.
						</p>
						<div class="form__submit form__submit--rtl">
							<button class="btn btn--color-tertiary">
								<span class="btn__text">Отправить заявку</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.contact-us
	&__body
		position: relative

		width: 100%
		padding: rem(64)
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(24)

		aspect-ratio: 3 / 1

		color: var(--color-neutral-tertiary)
		background-color: var(--color-secondary)
		border-radius: var(--radius-block)
		transform: translate3d(0, 0, 1px)

	&__bg
		position: absolute
		left: 0
		bottom: 0

		width: 49%
		height: 71%

		&-image
			display: block
			width: 100%
			height: 100%

			object-fit: contain
			object-position: bottom left

	&__left,
	&__form
		grid-column: span 6

	&__left
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: rem(24)

	&__title
		font-family: var(--font-secondary)
		font-size: var(--fontSizeH2)
		font-weight: 500
		line-height: var(--lineHeightH2)
		text-transform: uppercase

</style>
