<script lang="ts">
import {defineComponent} from 'vue'
import RadioTabs, {RadioTab} from "@components/utils/form/RadioTabs.vue";
import {useOrdersStore} from "@scripts/hooks/stateHooks/useOrdersStore";

export default defineComponent({
	name: "OrderDelivery",
	components: {RadioTabs},
	mixins: [useOrdersStore],
	props: {
		modelValue: {
			type: Number,
			default: null,
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			currentValue: null as number | null,
		}
	},
	computed: {
		tabsList(): RadioTab[] {
			return this.getDeliveryTypes.map((item) => ({
				title: item.name,
				description: item.description,
				note: item.cost,
				value: item.id,
				disabled: item.xmlId === 'courier' ? !this.isDeliveryFree : false,
			}));
		},
		value: {
			get(): number | null {
				return this.modelValue ?? this.currentValue;
			},
			set(value: number | null) {
				this.currentValue = value;
				this.$emit('update:modelValue', value);
			}
		}
	},
	created() {
		if (!this.getDeliveryTypes.length) this.requestDeliveryTypes();
	}
})
</script>

<template>
	<div class="order__block">
		<h4 class="order__title">Выберите способ получения</h4>

		<RadioTabs v-model="value" :tabs="tabsList"/>
	</div>
</template>

<style scoped lang="sass">

</style>
