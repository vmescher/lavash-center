<script lang="ts">
import {defineComponent, ref} from 'vue'
import BaseModal from '@components/utils/modals/BaseModal.vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import InputTextarea from "@components/utils/form/InputTextarea.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {useFormsStore} from "@scripts/hooks/stateHooks/useFormsStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import NotionModal from "@components/modals/NotionModal.vue";

export default defineComponent({
	name: "ContactModal",
	components: {
		NotionModal,
		InputTextarea, InputText,
		IconSVG,
		BaseModal
	},
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
					this.openModal('feedback-modal-success-notion');
					this.v$.formData.$reset();
					this.formData = {
						name: '',
						phone: '',
						question: '',
					};
					this.hydrateUserData();
				}).catch((error) => {
					this.externalError = error;
					this.openModal('feedback-modal-error-notion');
				})
			})
		},
	}
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

			<form class="modal__form form" @submit.prevent="submitForm">
				<div class="form__inputs form__inputs--2">
					<div class="form__input">
						<InputText id="contact-us-name" v-model="formData.name" :errors="v$.formData.name.$errors" label="Как мы можем к вам обращаться?" placeholder="Введите имя и фамилию"/>
					</div>
					<div class="form__input">
						<InputText id="contact-us-email" v-model="formData.phone" :errors="v$.formData.phone.$errors" label="Ваш телефон" placeholder="Введите номер" type="tel" mask-type="phoneMask"/>
					</div>
					<div class="form__input form__input--2">
						<InputTextarea id="contact-us-comment" v-model="formData.question" :errors="v$.formData.question.$errors" label="Комментарий" placeholder="Любая дополнительная информация или волнующий вас вопрос."/>
					</div>
				</div>
				<div class="form__bottom">
					<p class="form__policy form__policy--grey">
						Нажимая кнопку «Отправить заявку», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
					</p>
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary" :disabled="(v$.$error && v$.$dirty) || isAppLoading">
							<span class="btn__text">Отправить заявку</span>
						</button>
					</div>
				</div>
			</form>

			<NotionModal id="feedback-modal-success-notion" title="Ваше обращение отправлено" text="Мы свяжемся с вами в ближайшее время" @close="close"/>
			<NotionModal id="feedback-modal-error-notion" title="Что-то пошло не так" :text="externalError"/>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
