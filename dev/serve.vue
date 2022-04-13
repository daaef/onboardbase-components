<script>
import { defineComponent } from 'vue';
import CustomDropdown from "../src/lib-components/custom-dropdown.vue"
// Uncomment import and local "components" registration if library is not registered globally.
// import { OnboardbaseComponentsSample } from '@/entry.esm';

export default defineComponent({
  components: { CustomDropdown },
  name: 'ServeDev',
  // components: {
  //  OnboardbaseComponentsSample,
  // },
  setup() {
		const text = "Create a new Organization"
		const list = [{"__typename":"UserTeamModel","id":"cf23edb7-20f2-459e-a631-fe66b4248ff0","userTeamRole":{"__typename":"RoleModel","name":"Owner"},"team":{"__typename":"TeamModel","id":"5cbab843-2fc6-4573-a9cc-1e98a556eb5f","name":"Martian tech","slug":"martian-tech","logos":null,"shareCode":"4ea20265e4280d82","createdDate":"2022-03-08T14:47:10.085Z","projects":{"__typename":"UserProjectResponse","totalCount":8},"users":{"__typename":"EmployeesResponse","totalCount":3,"list":[{"__typename":"UserTeamModel","id":"cf23edb7-20f2-459e-a631-fe66b4248ff0","firstLogin":null,"accessKeyID":"Eu5VSUYOT6Fnr1ZbkM7i","userTeamRole":{"__typename":"RoleModel","name":"Owner"},"user":{"__typename":"UserModel","id":"cbd94769-f043-4ff9-9f50-1163f85960ae","name":"Afekhide gbadamosi","email":"realafe21@gmail.com","isConfirmed":true,"profilePhoto":null,"createdDate":"2022-03-08T14:47:10.085Z","title":null}},{"__typename":"UserTeamModel","id":"c6cceb6e-a41c-4458-8f0a-31901902af31","firstLogin":null,"accessKeyID":"FIlLESNDqKyLNzHw1BkE","userTeamRole":{"__typename":"RoleModel","name":"Admin"},"user":{"__typename":"UserModel","id":"4d1a25be-ffbb-4317-b7f2-adb32703a001","name":"Aef Badmus","email":"badmusa21@gmail.com","isConfirmed":true,"profilePhoto":null,"createdDate":"2022-03-24T13:05:56.246Z","title":null}},{"__typename":"UserTeamModel","id":"d24e913c-fac2-4cc9-b8e5-15e1ba3fabe1","firstLogin":null,"accessKeyID":"OuAGQsGw5l67ln4Jzwae","userTeamRole":{"__typename":"RoleModel","name":"Employee"},"user":{"__typename":"UserModel","id":"e4c15844-9acc-4a94-b43f-4a654b878d76","name":"Aef","email":"aefbadmus@gmail.com","isConfirmed":true,"profilePhoto":null,"createdDate":"2022-03-24T17:53:26.887Z","title":null}}]},"units":{"__typename":"UnitResponse","totalCount":1}},"selected":true}]
		
		return { list, text };
	}
});
</script>

<template>
  <div id="app">
		<CustomDropdown
			bg-styles="cursor-pointer font-medium"
			:list="list"
			:add-more-text="text"
			:admin="true"
			:teams="true"
		/>
  </div>
</template>
