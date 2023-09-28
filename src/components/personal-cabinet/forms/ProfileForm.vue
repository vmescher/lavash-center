<script lang="ts">
import {defineComponent, ref} from 'vue'
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {errorMessages} from "@scripts/consts/validation";
import useVuelidate from "@vuelidate/core";
import {useModalsStore} from "@scripts/hooks/stateHooks/useModalsStore";
import {useBaseStore} from "@scripts/hooks/stateHooks/useBaseStore";
import NotionModal from "@components/modals/NotionModal.vue";
import ChangePasswordModal from "@components/personal-cabinet/modals/ChangePasswordModal.vue";

export default defineComponent({
	name: "ProfileForm",
	components: {ChangePasswordModal, NotionModal, InputText, IconSVG},
	mixins: [useUsersStore, useModalsStore, useBaseStore],
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
			formEditable: false,
			formData: {
				name: '',
				lastName: '',
				phone: '',
				email: '',
				workCompany: '',
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
				lastName: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.minLength(2), minLength(2)),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				phone: {
					required: this.withMessage(this.errorMessages.required, required),
					minLength: this.withMessage(this.errorMessages.phone, minLength(18)),
				},
				email: {
					required: this.withMessage(this.errorMessages.required, required),
					email: this.withMessage(this.errorMessages.email, email),
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
				workCompany: {
					maxLength: this.withMessage(this.errorMessages.maxLength(50), maxLength(50)),
				},
			}
		}
	},
	created() {
		this.hydrateUserData();
	},
	methods: {
		hydrateUserData() {
			if (!this.getUserData) return;

			const {name, lastName, phone, email: userEmail, workCompany} = this.getUserData;

			Object.assign(this.formData, {
				name,
				lastName,
				phone,
				email: userEmail,
				workCompany,
			})
		},
		submitForm() {
			this.v$.formData.$validate().then((result) => {
				if (!result) return;

				this.requestUpdateUserData({
					...this.formData,
				}).then(() => {
					this.toggleFormEditable();
				}).catch((error) => {
					this.externalError = error;
					this.openModal('user-error-notion');
				})
			})
		},
		toggleFormEditable() {
			if (this.formEditable) {
				this.hydrateUserData();
				this.v$.formData.$reset();
			}

			this.formEditable = !this.formEditable;
		}
	}
})
</script>

<template>
	<form class="form" @submit.prevent="submitForm">
		<div class="form__top">
			<h3 class="form__title">Личные данные</h3>
		</div>
		<div class="form__inputs form__inputs--4">
			<div class="form__input">
				<InputText id="user-name" v-model="formData.name" :errors="v$.formData.name.$errors" label="Имя" placeholder="Введите имя" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText id="user-lastName" v-model="formData.lastName" :errors="v$.formData.lastName.$errors" label="Фамилия" placeholder="Введите фамилию" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText id="user-email" v-model="formData.email" :errors="v$.formData.email.$errors" label="E-mail" :disabled="formEditable" placeholder="Введите e-mail" type="email" :read-only="!formEditable"/>
			</div>
			<div class="form__input">
				<InputText id="user-phone" v-model="formData.phone" :errors="v$.formData.phone.$errors" label="Телефон" placeholder="Введите телефон" type="tel" mask-type="phoneMask" :read-only="!formEditable"/>
			</div>
			<div class="form__input form__input--2">
				<InputText id="user-workCompany" v-model="formData.workCompany" :errors="v$.formData.workCompany.$errors" label="Название организации" placeholder="Введите название вашей фирмы" :read-only="!formEditable">
					<template #underInput>
						<span class="form__underhint">Заполните поле, чтобы нам было проще вас узнать.</span>
					</template>
				</InputText>
			</div>
		</div>
		<div class="form__bottom">
			<div class="form__submit">
				<template v-if="!formEditable">
					<button class="btn btn--color-secondary" type="button" @click="toggleFormEditable">
						<span class="btn__text">Редактировать личные данные</span>
						<IconSVG name="edit" class="btn__icon"/>
					</button>
					<button class="btn" type="button" @click="openModal('change-password-modal')">
						<span class="btn__text">Изменить пароль</span>
					</button>
				</template>
				<template v-else>
					<button class="btn" type="button" @click="toggleFormEditable">
						<span class="btn__text">Не сохранять</span>
					</button>
					<button class="btn btn--color-secondary" type="submit" :disabled="(v$.formData.$error && v$.formData.$dirty) || isAppLoading">
						<span class="btn__text">Сохранить изменения</span>
					</button>
				</template>
			</div>
		</div>

		<NotionModal id="user-error-notion" title="Что-то пошло не так" :text="externalError"/>
		<ChangePasswordModal/>
	</form>
</template>

<style scoped lang="sass">

</style>
