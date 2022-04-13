<template>
  <div class="relative">
    <span @mouseleave="preSelect = null" class="inline-block rounded-md">
      <button
        :class="
          bgStyles ||
            'cursor-pointer relative w-full text-left text-sm rounded-md font-medium focus:outline-none pl-3 pr-10 py-2 bg-white sm:leading-5 flex items-center border border-gray-200'
        "
      >
        <slot name="selected-container">
          <component v-if="selected?.icon" :is="selected?.icon" />
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
            />
            <path
              d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
            />
            <path
              d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
            />
          </svg>
          <span class="block truncate">
            {{ selected?.name }}
          </span>
        </slot>
        <slot name="dropdownIcon">
          <component v-if="dropdownIcon" :is="dropdownIcon" />
          <div v-else-if="dropdownIcon === {}"></div>
          <span
            v-else
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none transform origin-center transition-transform duration-200"
            :class="options === true && 'rotate-180'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </slot>
      </button>
      <!-- <span class="block truncate">
				<span class="">2</span> <span class="text-gray-500">requests</span>
			</span> -->
      <select
        @focusin="showOptions"
        @focusout="hideOptions"
        class="w-full absolute top-0 left-0 opacity-0 h-full cursor-pointer"
      ></select>
    </span>
    <div
      v-if="options"
      class="w-64 text-sm z-30 absolute top-full mt-2 overflow-auto rounded-md shadow-lg bg-white border border-gray-200"
      :class="align === 'right' ? 'right-0' : 'left-0'"
      @mouseleave="preSelect = null"
    >
      <ul class="divide-y divide-gray-100">
        <div
          v-if="addMoreText && admin"
          @mouseenter="choose('addNew')"
          class="w-full"
        >
          <button class="block w-full py-3 px-4 focus:outline-none">
            <span
              class="text-xs text-gray-700 font-medium flex items-center w-full"
              role="menuitem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ addMoreText }}</span>
            </span>
          </button>
        </div>

        <div class="">
          <div class="overflow-auto">
            <li
              v-for="each in list"
              :key="each.name"
              @mouseenter="
                choose(
                  each.selected
                    ? null
                    : teams
                    ? { name: each.team.name, id: each.team.id }
                    : each.status !== 'coming soon' || !each.status
                    ? each.name
                    : null
                )
              "
              class="w-full block border-b border-gray-100 hover:bg-gray-100 focus:outline-none"
            >
              <button
                v-if="teams"
                class="flex py-2 px-4 items-center justify-between text-left w-full focus:outline-none hover:bg-gray-50"
              >
                <div class="flex items-center justify-between gap-5 w-full">
                  <div class="flex">
                    <div class="flex-shrink-0 mr-3">
                      <img
                        v-if="each.team.logos"
                        class="h-8 w-8 rounded-md object-cover"
                        :src="each.team.logos"
                        alt=""
                      />
                      <span
                        v-else
                        class="avatar inline-flex items-center justify-center h-8 w-8 rounded-md bg-ob-purple-color border border-gray-200 hover:border-gray-100 transition ease-in-out duration-150"
                      >
                        <span
                          class="text-xs font-medium leading-none text-white uppercase"
                          >{{
                            each.team.name && userInitials(each.team.name)
                          }}</span
                        >
                      </span>
                    </div>
                    <div class="">
                      <div
                        class="text-sm font-medium leading-5 capitalize truncate"
                      >
                        {{ each.team.name && each.team.name }}
                      </div>
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-50 text-ob-purple-color"
                      >
                        {{ each.userTeamRole?.name || `N/A` }}
                      </span>
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <div v-if="each.selected" class="self-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-ob-purple-color"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <!-- <span class="uppercase text-so-small text-ob-purple-color ml-2">Beta</span> -->
              </button>

              <button
                v-else
                class="flex py-2 px-4 items-center justify-between text-left w-full focus:outline-none hover:bg-gray-50"
								:class="
                    each.status === 'coming soon'
                      ? 'opacity-25 pointer-events-none'
                      : ''
                  "
              >
                <div
                  class="flex items-center"
                >
                  <component v-if="each.icon" :is="each.icon" />
                  <div class="text-sm font-medium leading-5 truncate">
                    <span>{{ each.name }}</span>
										<span
											v-if="each.status"
											class="uppercase text-so-small text-ob-purple-color inline-block ml-1"
											>{{ each.status === "ready" ? "" : each.status }}</span
										>
                  </div>
                </div>
                <div class="flex justify-end">
                  <div v-if="each.selected" class="self-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-ob-purple-color"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from "@vue/runtime-core";

export default defineComponent({
  name: "Custom dropdown",
  props: {
    list: {Array},
    addMoreText: String,
    align: String,
    admin: Boolean,
    dropdownIcon: Object,
    bgStyles: String,
    teams: Boolean
  },
  emits: ["select-option"],
  setup(props, { emit }) {
    const state = reactive({
      options: false,
      selectedOption: null,
      preSelect: null,
      selected: computed(() => props.list.find(each => each?.selected === true))
    });
		const userInitials = name => {
			if (name) {
				let names = name.trim().split(" ");
				if (names.length > 1) return names[0][0] + names[1][0];
				if (!names[0]) return "";
				return names[0][0];
			}
		};
    const showOptions = e => {
      state.options = true;
      e.target.style.zIndex = "-1";
    };

    const hideOptions = e => {
      state.options = false;
      e.target.style.zIndex = "0";

      if (state.preSelect !== null) emit("select-option", state.preSelect);
      state.preSelect === null;
    };
    const choose = val => {
      state.preSelect = val;
    };

    return { ...toRefs(state), showOptions, hideOptions, choose, userInitials };
  }
});
</script>

<style lang="css">
.bg-ob-purple-color {
  background-color: #6772E5FF;
}
</style>
