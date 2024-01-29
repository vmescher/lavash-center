<script lang="ts">
import {defineComponent, PropType} from 'vue'
import BaseModal from "@components/utils/modals/BaseModal.vue";
import IconSVG from "@components/utils/templates/ui/IconSVG.vue";
import InputText from "@components/utils/form/InputText.vue";
import InputDate from "@components/utils/form/InputDate.vue";
import {Order} from "@scripts/api/orders/types";
import {getFormattedPrice} from "@scripts/mixins/getFormattedPrice";
import PdfConstructor from "@components/utils/ui/PdfConstructor.vue";

export default defineComponent({
	name: "DownloadCheckModal",
	components: {PdfConstructor, InputDate, InputText, IconSVG, BaseModal},
	mixins: [getFormattedPrice],
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
				debt: '',
			}
		}
	},
	computed: {
		getFormattedDate() {
			if (!this.formData.date) return '-';

			return this.formData.date.toLocaleDateString('ru-RU', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		}
	},
	mounted() {
		this.hydrateData()
	},
	methods: {
		hydrateData() {
			this.formData.customer = this.orderData.client;
		},
		savePdf() {
			(this.$refs.pdfConstructor as typeof PdfConstructor).savePdf(this.formData.customer.replace(/\s/gi, ''));
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

			<form class="modal__form form" @submit.prevent="savePdf">
				<div class="form__inputs">
					<div class="form__input">
						<InputText id="download-check-customer" v-model="formData.customer" label="Кому" placeholder="Введите данные плательщика" />
					</div>
					<div class="form__input">
						<InputText id="download-check-seller" v-model="formData.seller" label="От кого" placeholder="Введите данные получателя" />
					</div>
					<div class="form__input">
						<InputDate id="download-check-date" v-model="formData.date" label="Дата" placeholder="ДД.ММ.ГГГГ"/>
					</div>
					<div class="form__input">
						<InputText id="download-check-debt" v-model="formData.debt" label="Задолженность, руб." placeholder="0.00 ₽" mask-type="priceMask" type="numeric"/>
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

			<PdfConstructor ref="pdfConstructor">
				<div class="check-pdf">
					<div class="check-pdf__top">
						<span class="check-pdf__date">{{ getFormattedDate }}</span>
					</div>

					<h4 class="check-pdf__title">
						НАКЛАДНАЯ № <span class="check-pdf__title-number">Б/Н</span>
					</h4>

					<div class="check-pdf__row">
						<span class="check-pdf__row-label">Кому</span>
						<p class="check-pdf__row-value">{{ formData.customer }}</p>
					</div>

					<div class="check-pdf__row">
						<span class="check-pdf__row-label">От кого</span>
						<p class="check-pdf__row-value">{{ formData.seller }}</p>
					</div>

					<table class="check-pdf__table">
						<thead>
						<tr>
							<th class="check-pdf__table-head">№ п/п</th>
							<th class="check-pdf__table-head">Наименование товара</th>
							<th class="check-pdf__table-head">Кол-во</th>
							<th class="check-pdf__table-head">Цена, руб., коп.</th>
							<th class="check-pdf__table-head">Сумма, руб., коп.</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(item, index) in orderData.items" :key="item.id">
							<td class="check-pdf__table-cell">{{ index + 1 }}</td>
							<td class="check-pdf__table-cell">{{ item.name }}</td>
							<td class="check-pdf__table-cell">{{ item.quantity }}</td>
							<td class="check-pdf__table-cell">{{ getFormattedPrice(item.price, 2) }}</td>
							<td class="check-pdf__table-cell">{{ getFormattedPrice(item.price * item.quantity, 2) }}</td>
						</tr>
						<tr v-if="formData.debt">
							<td class="check-pdf__table-cell">{{ orderData.items.length + 1 }}</td>
							<td colspan="3" class="check-pdf__table-cell check-pdf__table-cell--bold">Долг</td>
							<td class="check-pdf__table-cell">{{ getFormattedPrice(Number(formData.debt), 2) }}</td>
						</tr>
						<tr>
							<td colspan="4" class="check-pdf__table-cell check-pdf__table-cell--bold">Итого</td>
							<td class="check-pdf__table-cell">{{ getFormattedPrice(orderData.sum + Number(formData.debt), 2) }}</td>
						</tr>
						</tbody>
					</table>

					<div class="check-pdf__bottom">
						<span class="check-pdf__bottom-stamp">МП</span>

						<div class="check-pdf__bottom-signatures">
							<div class="check-pdf__signature">
								<span class="check-pdf__signature-label">Сдал</span>
								<span class="check-pdf__signature-space"></span>
							</div>
							<div class="check-pdf__signature">
								<span class="check-pdf__signature-label">Принял</span>
								<span class="check-pdf__signature-space"></span>
							</div>
						</div>

					</div>

				</div>
			</PdfConstructor>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">
.check-pdf
	width: 100%

	font-family: Calibry, Arial, Helvetica, sans-serif
	font-size: 12px

	&__top
		display: flex
		justify-content: flex-end

		&:not(:last-child)
			margin-bottom: 28pt

	&__date
		font-size: 14pt
		line-height: 1.2

	&__title
		display: block

		font-size: 16pt
		line-height: 1.2
		font-weight: 700
		text-align: center

		&:not(:last-child)
			margin-bottom: 24pt

		&-number
			display: inline-block
			min-width: 100pt

			border-bottom: 1px solid var(--color-black)

	&__row
		display: flex
		align-items: center

		&:not(:last-child)
			margin-bottom: 24pt

		&-label,
		&-value
			font-size: 14pt
			line-height: 1.2

		&-label
			flex: 0 0 64pt

		&-value
			flex: 1 1 auto
			border-bottom: 1px solid var(--color-black)

	&__table
		width: 100%
		table-layout: auto

		border: 1px solid var(--color-black)
		border-collapse: collapse
		border-spacing: 0

		&-head,
		&-cell
			padding: 4pt

			font-size: 14pt
			line-height: 1.2

			text-align: center

			border: 1px solid var(--color-black)

			&--bold
				font-weight: 700

		&-head
			font-weight: 700

	&__bottom
		display: flex
		align-items: center
		justify-content: space-around

		&:not(:first-child)
			margin-top: 48pt

		&-stamp
			font-size: 14pt
			line-height: 1.2
			font-weight: 700

		&-signatures
			display: flex
			align-items: center

			& .check-pdf__signature
				&:not(:last-child)
					margin-right: 32pt

	&__signature
		display: flex

		&-label
			margin-right: 12pt

			font-size: 14pt
			line-height: 1.2
			font-weight: 700

		&-space
			display: inline-block
			min-width: 100pt

			border-bottom: 1px solid var(--color-black)

</style>
