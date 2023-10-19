<script lang="ts">
import {defineComponent} from 'vue'
import ProfileForm from "@components/personal-cabinet/forms/ProfileForm.vue";
import AddressesForm from "@components/personal-cabinet/forms/AddressesForm.vue";
import {useUsersStore} from "@scripts/hooks/stateHooks/useUsersStore";

export default defineComponent({
	name: "ProfileView",
	components: {AddressesForm, ProfileForm},
	mixins: [useUsersStore]
})
</script>

<template>
	<section class="profile">
		<div class="profile__wrapper wrapper">
			<div class="profile__section">
				<ProfileForm/>
			</div>

			<div v-if="!isAdmin" class="profile__section">
				<AddressesForm/>
			</div>
		</div>
	</section>
</template>

<style scoped lang="sass">
.profile
	&__wrapper
		display: grid
		grid-template-columns: repeat(12, minmax(0, 1fr))
		grid-gap: rem(80) rem(24)

		+until-laptop
			grid-gap: rem(40) rem(24)

		+while-mob-xl
			grid-gap: rem(32) rem(8)

	&__section
		grid-column: span 8

		+until-pc
			grid-column: span 10

		+until-laptop
			grid-column: 1 / -1
</style>
