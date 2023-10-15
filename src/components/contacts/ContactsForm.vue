<script lang="ts">
import {defineComponent, ref} from 'vue'
import InputText from "@components/utils/form/InputText.vue";
import InputTextarea from "@components/utils/form/InputTextarea.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import {useFormsStore} from "@scripts/hooks/stateHooks/useFormsStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import NotionModal from "@components/modals/NotionModal.vue";

export default defineComponent({
	name: "ContactsForm",
	components: {NotionModal, InputTextarea, InputText},
	mixins: [useUsersStore, useModalsStore, useBaseStore, useFormsStore, useContentsStore],
	setup() {
		const externalError = ref('');
		const { withMessage } = helpers;

		return {
			errorMessages,
			withMessage,
			externalError,
			v$: useVuelidate(),
		};
	},
	data() {
		return {
			formData: {
				name: '',
				phone: '',
				question: '',
			}
		}
	},
	validations() {
		return {
			formData: {
				name: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				phone: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.phone, minLength(18)),
				},
				question: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(500), maxLength(500)),
				}
			}
		}
	},
	created() {
		this.hydrateUserData();
	},
	methods: {
		hydrateUserData() {
			if (!this.getUserData) {
				const userDataTrigger = this.$watch(
					'getUserData',
					() => {
						this.hydrateUserData();
						userDataTrigger();
					},
					{ deep: true }
				);
				return;
			}

			const {name, phone} = this.getUserData;

			Object.assign(this.formData, {
				name,
				phone,
			})
		},
		submitForm() {
			this.v$.formData.$validate().then((result: boolean) => {
				if (!result) return;

				this.requestSendFeedbackForm({
					...this.formData,
				}).then(() => {
					this.openModal('feedback-form-success-notion');
					this.v$.formData.$reset();
					this.formData = {
						name: '',
						phone: '',
						question: '',
					};
					this.hydrateUserData();
				}).catch((error) => {
					this.externalError = error;
					this.openModal('feedback-form-error-notion');
				})
			})
		},
	}
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
				<form class="contact-us__form form" @submit.prevent="submitForm">
					<div class="form__top">
						<p class="form__text">Вы можете оставить свои контактные данные и мы вам перезвоним. Также вы всегда можете позвонить нам сами по номеру
							<a href="tel:+79953353737">8 995 335 37 37</a>.
						</p>
					</div>
					<div class="form__inputs form__inputs--2">
						<div class="form__input">
							<InputText id="contact-form-name" v-model="formData.name" :errors="v$.formData.name.$errors" label="Как мы можем к вам обращаться?" placeholder="Введите имя и фамилию"/>
						</div>
						<div class="form__input">
							<InputText id="contact-form-phone" v-model="formData.phone" :errors="v$.formData.phone.$errors" label="Ваш телефон" placeholder="Введите номер"  type="tel" mask-type="phoneMask"/>
						</div>
						<div class="form__input form__input--2">
							<InputTextarea id="contact-form-comment" v-model="formData.question" :errors="v$.formData.question.$errors" label="Комментарий" placeholder="Любая дополнительная информация или волнующий вас вопрос."/>
						</div>
					</div>
					<div class="form__bottom">
						<p class="form__policy">
							Нажимая кнопку «Отправить заявку», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
						</p>
						<div class="form__submit form__submit--rtl">
							<button class="btn btn--color-tertiary" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
								<span class="btn__text">Отправить заявку</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<NotionModal id="feedback-form-success-notion" title="Ваше обращение отправлено" text="Мы свяжемся с вами в ближайшее время"/>
		<NotionModal id="feedback-form-error-notion" title="Что-то пошло не так" :text="externalError"/>

	</section>
</template>

<style scoped lang="sass">
.contact-us
	--di-error-color: var(--color-warning)
	--di-border-color-error: var(--color-warning)

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
