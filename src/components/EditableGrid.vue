<template>
  <div>
    <DxDataGrid
      :data-source="store.employees"
      :key-expr="'ID'"
      show-borders
      @init-new-row="onInitNewRow"
      @row-inserted="onRowInserted"
      @row-updated="onRowUpdated"
      @row-removed="onRowRemoved"
      @editing-start="onEditingStart"
    >
      <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :display-mode="displayMode"
        :show-page-size-selector="showPageSizeSelector"
        :show-info="showInfo"
        :show-navigation-buttons="showNavButtons"
      />
      <DxEditing mode="popup" :allow-adding="true" :allow-updating="true" :allow-deleting="true">
        <DxPopup
          :title="popupTitle"
          :show-title="true"
          :width="600"
          :height="400"
          css-class="custom-popup-title"
        />
      </DxEditing>
      <DxColumn data-field="FirstName" />
      <DxColumn data-field="LastName" />
      <DxColumn data-field="Position" />
      <DxColumn data-field="BirthDate" data-type="date" />
      <DxColumn data-field="HireDate" data-type="date" />
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { DxDataGrid, DxColumn, DxEditing, DxSearchPanel,   DxPager,
  DxPaging, } from "devextreme-vue/data-grid";
import { useEmployeeStore } from "@/stores/useEmployeeStore";
import { ref } from "vue";
import { DxPopup } from "devextreme-vue/data-grid";

const popupTitle = ref("Employee Form");

const pageSizes: (number | PagerPageSize)[] = [5, 10, 'all'];
const showPageSizeSelector = ref(true);
const showInfo = ref(true);
const showNavButtons = ref(true);

const store = useEmployeeStore();

function onEditingStart(e: any) {
  popupTitle.value = e.data?.ID ? "Edit Employee" : "Add Employee";
}

onMounted(() => {
  store.loadEmployees();
});

function onInitNewRow(e: any) {
  e.data.ID = Date.now(); // generate unique ID
  popupTitle.value = "Add Employee";
}

function onRowInserted(e: any) {
  store.addEmployee(e.data);
}

function onRowUpdated(e: any) {
  store.updateEmployee(e.data);
}

function onRowRemoved(e: any) {
  store.deleteEmployee(e.data.ID);
}
</script>
<style scoped>
.custom-popup-title .dx-popup-title {
  white-space: normal !important;
  word-break: break-word;
  font-size: 18px;
}
</style>
