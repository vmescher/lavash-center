<script lang="ts">
import {defineComponent} from 'vue'
import SectionTitle from "@components/utils/templates/structural/SectionTitle.vue";
import ContactsSection from "@components/contacts/ContactsSection.vue";
import ContactsForm from "@components/contacts/ContactsForm.vue";

export default defineComponent({
	name: "ContactsView",
	components: {ContactsForm, ContactsSection, SectionTitle}
})
</script>

<template>
	<main class="page">
		<SectionTitle>Контакты</SectionTitle>
		<ContactsSection/>
		<ContactsForm/>
	</main>
</template>

<style scoped lang="sass">

</style>
