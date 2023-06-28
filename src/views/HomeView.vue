<template>
    <AppHeader/>

  <!-- Start block -->
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased mt-14">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button type="button" id="createTableBtn" @click="createTable"
                                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                            </svg>
                            Add
                        </button>
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <div id="actionsDropdown"
                                 class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="actionsDropdownButton">
                                    <li>
                                        <a href="#"
                                           class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass
                                            Edit</a>
                                    </li>
                                </ul>
                                <div class="py-1">
                                    <a href="#"
                                       class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                                        all</a>
                                </div>
                            </div>
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                                    class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                     class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                          clip-rule="evenodd"/>
                                </svg>
                                <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                </svg>
                            </button>
                            <div id="filterDropdown"
                                 class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
                                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li class="flex items-center" v-for="ownerType in ownerTypes" :key="ownerType">
                                        <input id="apple" type="checkbox" value=""
                                               class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                        <label for="apple"
                                               class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">{{ownerType}}
                                            (56)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="px-4 py-4 cursor-pointer hover:text-primary-600 hover:bg-primary-50 hover:bg-primary-100 hover:text-primary-700" @click = "sortingByName()">Name</th>
                            <th scope="col" class="px-4 py-3 cursor-pointer hover:text-primary-600 hover:bg-primary-50 hover:bg-primary-100 hover:text-primary-700" @click = "sortingByOwnedBy()">Owned by</th>
                            <th scope="col" class="cursor-pointer px-4 py-3 hover:text-primary-600 hover:bg-primary-50 hover:bg-primary-100 hover:text-primary-700" @click = "sortingByDate()">Last opened</th>

                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="sheet in sheets" :key="sheet.name" class="border-b dark:border-gray-700">
                            <RouterLink :to="{ name: 'sheet-page', params: { id: sheet.id } }">
                             <th scope="row"
                                 class="px-4 py-3 max-w-[23rem] truncate">
                                 {{sheet.name}}
                             </th>
                            </RouterLink>
                            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                {{sheet.ownedBy}}
                            </td>
                            <td class="px-4 py-3">{{ sheet.lastOpened }}</td>
                            <td class="px-4 py-3 flex items-center justify-end">
                                <button @click="openDotList(sheet)" v-if="!sheet.menuVisible"
                                        class="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button">
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    </svg>
                                </button>
                                <div v-if="sheet.menuVisible"
                                     class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul class="py-1 text-sm" :aria-labelledby="`row-${sheet.id}`">
                                        <li>
                                            <button type="button"
                                                    @click="deleteFunction(sheet)"
                                                    class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                                <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                                                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"/>
                                                </svg>
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                     aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">{{currentPage}}-{{ELEMENTS_PER_PAGE}}</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">{{ ELEMENTS_COUNT }}</span>
                </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <a href="#"
                               @click="setPage(currentPage - 1)"
                               :class="previousPageClasses">
                                <span class="sr-only">Previous</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-current="page"
                               @click="setPage(currentPage)"
                               class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{{currentPage}}</a>
                        </li>
                        <li>
                            <a href="#"
                               @click="setPage(currentPage + 1)"
                               class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{currentPage + 1}}</a>
                        </li>
                        <li>
                            <a href="#"
                               @click="setPage(currentPage + 2)"
                               class="flex items-center justify-center text-sm py-2  px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{currentPage + 2}}</a>
                        </li>
                        <li>
                            <a href="#"
                               class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span v-if="currentPage === totalPages - 4">{{totalPages - 1}}</span>
                                <span v-else>...</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               @click="setPage(ELEMENTS_COUNT/ELEMENTS_PER_PAGE)"
                               class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ELEMENTS_COUNT/ELEMENTS_PER_PAGE}}</a>
                        </li>
                        <li>
                            <a href="#"
                               class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
    <DeleteModal
        v-if="isModalVisible"
        :id-for-delete="idForDelete"
        :name-for-delete="nameForDelete"
        @removeSheet="removeSheet"
        @cancel="hideDeleteModal"
    />
  <!-- End block -->

  <!-- Footer -->
    <AppFooter/>
  <!--//Footer-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {initFlowbite} from "flowbite";
import { faker } from '@faker-js/faker';
import { format } from 'timeago.js';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import tableData from "@/data";
import { useRouter } from "vue-router";
import DeleteModal from "@/components/Modal/DeleteModal.vue";

const router = useRouter();

onMounted(() => {
    initFlowbite();
})

const ELEMENTS_COUNT = 500;
const ELEMENTS_PER_PAGE = 10;

const currentPage = ref(1);

interface Sheet {
  id: number;
  name: string;
  ownedBy: string;
  lastOpened: string;
  menuVisible: boolean;
}
const allSheets = ref<Sheet[]>([]);
for (let i = 0; i < ELEMENTS_COUNT; i++) {
    allSheets.value.push({
        id: tableData.value[i].id,
        name: tableData.value[i].name,
        ownedBy: tableData.value[i].ownedBy,
        lastOpened: tableData.value[i].lastOpened,
        menuVisible: false,
    })
}

const sheets = computed(() => allSheets.value.slice((currentPage.value - 1) * ELEMENTS_PER_PAGE, ELEMENTS_PER_PAGE * currentPage.value));
const totalPages = ELEMENTS_COUNT / ELEMENTS_PER_PAGE;
const DEFAULT_PAGINATION_CLASSES = "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
const previousPageClasses = computed(() => currentPage.value === 1
    ? `opacity-40 pointer-events-none ${DEFAULT_PAGINATION_CLASSES}`
    : `hover:bg-gray-100 hover:text-gray-700 ${DEFAULT_PAGINATION_CLASSES}`);

function setPage(page: number) {
    console.log('page', page);
    currentPage.value = page;
}

const ownerTypes = [
    'owned by me',
    'owned by me1',
    'owned by me2',
]
const createTable = () =>{
    tableData.value.push({
        id: tableData.value.length,
        name: `Untitled`,
        ownedBy: faker.person.fullName(),
        lastOpened: format(faker.date.past()),
        sheets: [
            {
                name: 'Sheet1',
                cellContent: [['hello']]
            }
        ],
    })
    allSheets.value.push({
        id: tableData.value[tableData.value.length-1].id,
        name: tableData.value[tableData.value.length-1].name,
        ownedBy:tableData.value[tableData.value.length-1].ownedBy,
        lastOpened: tableData.value[tableData.value.length-1].lastOpened,
      menuVisible: false
    })
    router.push(`/sheet-page/${tableData.value.length-1}`)
}

const isModalVisible = ref(false);
const idForDelete = ref();
const nameForDelete = ref();

function deleteFunction(sheet: Sheet) {
  sheet.menuVisible = false;
    isModalVisible.value = true;
    idForDelete.value = sheet.id;
    nameForDelete.value = sheet.name;
}

function removeSheet() {
    isModalVisible.value = false;
    allSheets.value = allSheets.value.filter(sh => sh.id !== idForDelete.value)
}

function hideDeleteModal() {
  isModalVisible.value = false;
}

let sortedOnce = false;
function openDotList(sheet: Sheet) {
  sheet.menuVisible = true;

}
function sortingByOwnedBy() {
sortedOnce = !sortedOnce;
  if (sortedOnce) {
    allSheets.value.sort((a, b) => b.ownedBy.localeCompare(a.ownedBy));
  } else{
    allSheets.value.sort((a, b) => a.ownedBy.localeCompare(b.ownedBy));
  }
}
function sortingByDate(){
  sortedOnce = !sortedOnce;
  if (sortedOnce) {
    allSheets.value.sort((a, b) => b.lastOpened.localeCompare(a.lastOpened));
  } else{
    allSheets.value.sort((a, b) => a.lastOpened.localeCompare(b.lastOpened));
  }
}

function sortingByName(){
  sortedOnce = !sortedOnce;
  if (sortedOnce) {
    allSheets.value.sort((a, b) => b.name.localeCompare(a.name));
  } else{
    allSheets.value.sort((a, b) => a.name.localeCompare(b.name));
  }
}
</script>
