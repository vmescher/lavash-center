<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import InputDate from "@components/utils/form/InputDate.vue";
import {Order} from "@scripts/api/orders/types";

export default defineComponent({
	name: "DownloadCheckModal",
	components: {InputDate, InputText, IconSVG, BaseModal},
	props: {
		orderData: {
			type: Object as PropType<Order>,
			required: true,
			default: () => ({})
		}
	},
	data() {
		return {
			formData: {
				customer: '',
				seller: 'ИП "Оганисян Т.А."',
				date: new Date(),
				debt: '0,00 ₽',
			}
		}
	},
	mounted() {
		this.hydrateData()
	},
	methods: {
		hydrateData() {
			this.formData.customer = this.orderData.client;
		}
	}
})
</script>

<template>
	<BaseModal id="download-check-modal" v-slot="{close}">
		<section class="modal">
			<button class="modal__close link link--size-large link--color-tertiary" data-dialog-close aria-label="закрыть" @click="close">
				<IconSVG name="close" class="link__icon"/>
			</button>

			<h3 class="modal__title">
				Скачать накладную
			</h3>

			<form class="modal__form form">
				<div class="form__inputs">
					<div class="form__input">
						<InputText v-model="formData.customer" id="download-check-customer" label="Кому" placeholder="Введите данные плательщика" />
					</div>
					<div class="form__input">
						<InputText v-model="formData.seller" id="download-check-seller" label="От кого" placeholder="Введите данные получателя" />
					</div>
					<div class="form__input">
						<InputDate v-model="formData.date" id="download-check-date" label="Дата" placeholder="ДД.ММ.ГГГГ"/>
					</div>
					<div class="form__input">
						<InputText v-model="formData.debt" id="download-check-debt" label="Задолженность, руб." placeholder="0.00 ₽" mask-type="priceMask" type="numeric"/>
					</div>
				</div>
				<div class="form__bottom">
					<div class="form__submit form__submit--rtl">
						<button class="btn btn--color-secondary" type="submit">
							<span class="btn__text">Скачать</span>
							<IconSVG name="download" class="btn__icon"/>
						</button>
					</div>
				</div>
			</form>

			<section id="check-pdf" class="pdf">
				<table class="check-pdf">
					<tbody>
						<tr>
							<td colspan="100%">
								{{ new Date().toLocaleDateString() }}
							</td>
						</tr>
						<tr>
							<td colspan="100%"></td>
						</tr>
						<tr>
							<td colspan="100%">
								Накладная <span>б/н</span>
							</td>
						</tr>
						<tr>
							<td>Кому</td>
							<td colspan="100%">{{ formData.customer }}</td>
						</tr>
						<tr>
							<td colspan="100%"></td>
						</tr>
						<tr>
							<td>От кого</td>
							<td colspan="100%">{{ formData.seller }}</td>
						</tr>
						<tr>
							<td colspan="100%">
								<table>
									<thead>
									<tr>
										<th>№ П/П</th>
										<th>Наименование товара</th>
										<th>Кол-во</th>
										<th>Цена, руб., коп.</th>
										<th>Сумма, руб., коп.</th>
									</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Лаваш</td>
											<td>20</td>
											<td>20 руб</td>
											<td>400 руб</td>
										</tr>
										<tr>
											<td colspan="100%">Долг</td>
											<td>200 руб</td>
										</tr>
										<tr>
											<td colspan="100%">Итого</td>
											<td>600 руб.</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td colspan="100%"></td>
						</tr>
						<tr>
							<td>МП</td>
							<td>Сдал</td>
							<td>Принял</td>
						</tr>
					</tbody>
				</table>

			</section>
		</section>
	</BaseModal>
</template>

<style scoped lang="sass">
.pdf
	position: fixed
	top: 0
	left: 0

	width: 100%
	height: 100%

	font-family: Calibry, Arial, Helvetica, sans-serif
	font-size: 11pt

	background-color: var(--color-neutral-tertiary)


</style>
