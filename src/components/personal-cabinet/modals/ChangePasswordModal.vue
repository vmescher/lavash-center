<script lang="ts">
import {defineComponent, reactive} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import InputText from "@components/utils/form/InputText.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {useContentsStore} from "@scripts/hooks/stateHooks/useContentsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import {helpers, maxLength, minLength, required, sameAs} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import NotionModal from "@components/modals/NotionModal.vue";

export default defineComponent({
	name: "ChangePasswordModal",
	components: {NotionModal, IconSVG, InputText, BaseModal},
	mixins: [useModalsStore, useUsersStore, useContentsStore, useBaseStore],
	setup() {
		const externalResults = reactive({});
		const { withMessage } = helpers;

		return {
			externalResults,
			withMessage,
			errorMessages,
			v$: useVuelidate({ $externalResults: externalResults }),
		};
	},
	data() {
		return {
			formData: {
				currentPassword: '',
				password: '',
				confirmPassword: ''
			}
		}
	},
	validations() {
		return {
			formData: {
				currentPassword: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
				},
				password: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
					minLength: this.withMessage(this.errorMessages.password(6), minLength(6))
				},
				confirmPassword: {
					required: this.withMessage(this.errorMessages.required, required),
					maxLength: this.withMessage(this.errorMessages.maxLength(250), maxLength(250)),
					sameAs: this.withMessage(this.errorMessages.passwordConfirm, sameAs(this.formData.password))
				}
			}
		}
	},
	methods: {
		submitForm() {
			this.v$.formData.$validate().then((result: boolean) => {
				if (!result) return;

				this.requestUpdatePassword({
					...this.formData,
				}).then(() => {
					this.openModal('change-password-success-notion');
					this.resetForm();
				}).catch((error) => {
					const externalError = {
						formData: {
							currentPassword: error,
						},
					};
					Object.assign(this.externalResults, externalError);
					const clearTrigger = this.$watch(
						'formData',
						() => {
							this.v$.$clearExternalResults();
							clearTrigger();
						},
						{ deep: true }
					);
				})
			})
		},
		resetForm() {
			this.v$.formData.$reset();
			this.formData = {
				currentPassword: '',
				password: '',
				confirmPassword: ''
			}
		}
	}
})
</script>

<template>
	<BaseModal id="change-password-modal" v-slot="{close}" @close="resetForm">
		<section class="modal">

			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">Изменение пароля</h3>

			<div class="modal__divider"></div>

			<form class="modal__form form" @submit.prevent="submitForm">
				<div class="form__inputs">
					<div class="form__input">
						<InputText id="change-password-current-password" v-model="formData.currentPassword" :errors="v$.formData.currentPassword.$errors" label="Текущий пароль" placeholder="Введите текущий пароль" password />
					</div>
					<div class="form__input">
						<InputText id="change-password-new-password" v-model="formData.password" :errors="v$.formData.password.$errors" label="Придумайте новый пароль" placeholder="Введите новый пароль" password />
					</div>
					<div class="form__input">
						<InputText id="change-password-repeat-password" v-model="formData.confirmPassword" :errors="v$.formData.confirmPassword.$errors" label="Повторите новый пароль" placeholder="Введите новый пароль еще раз" password />
					</div>
				</div>
				<div class="form__bottom">
					<div class="form__submit form__submit--full form__submit--rtl">
						<button class="btn" type="button" @click="close">
							<span class="btn__text">Не сохранять</span>
						</button>
						<button class="btn btn--color-secondary" type="submit" :disabled="(v$.formData.$error && v$.formData.$dirty) || isAppLoading">
							<span class="btn__text">Сохранить изменения</span>
						</button>
					</div>
					<p class="form__policy form__policy--grey">
						Нажимая кнопку «Сохранить изменения», Вы&nbsp;<a :href="getLegalDocs.processingPersonal" target="_blank">соглашаетесь</a> с&nbsp;условиями <a :href="getLegalDocs.privacyPolicy" target="_blank">политики обработки персональных данных</a>.
					</p>
				</div>
			</form>

			<NotionModal id="change-password-success-notion" title="Ваш пароль успешно изменен" text="Теперь вы можете использовать данный пароль для входа в свой профиль на сайте." @close="close"/>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
