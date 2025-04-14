<template>
  <div>
    <div class="flex flex-wrap items-end gap-4 mb-4">
      <DxTextBox
        v-model="search.id"
        placeholder="Search by ID"
        styling-mode="outlined"
        class="w-52"
      />
      <DxTextBox
        v-model="search.employeeName"
        placeholder="Search by Employee Name"
        styling-mode="outlined"
        class="w-52"
      />
      <DxSelectBox
        v-model="search.nonCompliance"
        :items="nonComplianceOptions"
        placeholder="Type"
        class="w-52"
        styling-mode="outlined"
        :search-enabled="true"
        show-clear-button
      />
      <div class="dx-search">
        <DxButton text="Search" type="default" @click="applyFilter" width="150" />
        <DxButton text="Clear" type="danger" @click="clearFilter" width="150" />
      </div>
    </div>

    <div class="dx-button">
      <DxButton
        width="150"
        icon="exportxlsx"
        text="Export"
        type="success"
        styling-mode="contained"
        @click="exportToExcel"
      />
      <DxButton
        width="150"
        icon="print"
        text="Print"
        styling-mode="contained"
        @click="printTable"
      />
    </div>
    <DxDataGrid
      :dataSource="filtered"
      ref="gridRef"
      keyExpr="id"
      :showBorders="true"
      :searchPanel="{ visible: true, width: 240, placeholder: 'Search...' }"
      :paging="{ pageSize: 5 }"
      id="attendance-table"
    >
      <DxSelection mode="multiple" />

      <DxPaging :enabled="true" :page-size="5" />
      
      
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[5, 10, 15, 20]"
        :show-info="true"
        :show-navigation-buttons="true"
      />

      
      <DxColumn dataField="id" :caption="$t('attendance.id')" />
      <DxColumn dataField="employeeName" :caption="$t('attendance.name')" />

      <DxColumn dataField="getToWork" :caption="$t('attendance.getToWork')" dataType="datetime" />
      <DxColumn
        dataField="outOfOffice"
        :caption="$t('attendance.outOfOffice')"
        dataType="datetime"
      />
      <DxColumn
        dataField="reenterOffice"
        :caption="$t('attendance.reenterOffice')"
        dataType="datetime"
      />
      <DxColumn dataField="backToWork" :caption="$t('attendance.backToWork')" dataType="datetime" />
      <DxColumn dataField="presence" :caption="$t('attendance.presence')" />
      <DxColumn dataField="nonCompliance" :caption="$t('attendance.nonCompliance')" />

      <DxColumn type="buttons" width="50">
        <DxButton name="edit" />
      </DxColumn>
      <DxEditing
        mode="popup"
        :allowUpdating="true"
        :allowAdding="true"
        :popup="{ title: 'Competency Owner Attendance Information', showTitle: true, width: 700 }"
        @row-inserted="onAdd"
        @row-updated="onUpdate"
      >
        <DxForm>
          <DxItem data-field="id" editor-type="dxNumberBox" />
          <DxItem data-field="employeeName" editor-type="dxTextBox" />

          <DxItem
            data-field="getToWork"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="outOfOffice"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="reenterOffice"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="backToWork"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="presence"
            editor-type="dxSelectBox"
            :editor-options="{ items: ['Present', 'Late', 'Absent', 'Partial'] }"
          />
          <DxItem
            data-field="nonCompliance"
            editor-type="dxSelectBox"
            :editor-options="{
              items: [
                'None',
                'Late Arrival',
                'Early Leave',
                'Did Not Check Back',
                'Incomplete Attendance',
              ],
            }"
          />
          <DxItem data-field="reasonType" editor-type="dxTextBox" />
          <DxItem data-field="reason" editor-type="dxTextBox" />
          <DxItem
            data-field="newStartDate"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="newOfficeOpenDate"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="newOfficeReEntryDate"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <DxItem
            data-field="newReturnToWorkDate"
            editor-type="dxDateBox"
            :editor-options="{ type: 'datetime' }"
          />
          <!-- <DxItem data-field="notes" editor-type="dxTextArea" /> -->
          <DxItem :label="{ text: 'Supporting Documents' }">
            <input type="file" @change="handleFileUpload" class="border p-1 rounded w-full" />
          </DxItem>
        </DxForm>
      </DxEditing>
    </DxDataGrid>

    <div v-if="showAlert" class="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
      Attendance information was successfully updated. Notification of the notification will be sent
      to the Supervisor for approval process.
    </div>
  </div>
</template>

<script setup lang="ts">
import DxDataGrid, {
  DxColumn,
  DxPaging,
  DxEditing,
  DxSelection,
  DxForm,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";

import { useAttendanceStore } from "@/stores/attendance";
import type { AttendanceRecord } from "@/stores/attendance";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { exportDataGrid } from "devextreme/excel_exporter";
import ExcelJS from "exceljs";

const search = ref({
  id: "",
  employeeName: "",
  nonCompliance: "",
});

const nonComplianceOptions = [
  "None",
  "Late Arrival",
  "Early Leave",
  "Did Not Check Back",
  "Incomplete Attendance",
];

const filtered = ref<AttendanceRecord[]>([]);

const store = useAttendanceStore();
const { records } = storeToRefs(store);
const showAlert = ref(false);
const gridRef = ref();

onMounted(() => {
  store.initializeRecords();
  filtered.value = records.value;
});

const applyFilter = () => {
  filtered.value = records.value.filter((record) => {
    const matchId = !search.value.id || record.id.toString().includes(search.value.id.toString());

    const matchName =
      !search.value.employeeName ||
      record.employeeName.toLowerCase().includes(search.value.employeeName.toLowerCase());

    const matchNonCompliance =
      !search.value.nonCompliance || record.nonCompliance === search.value.nonCompliance;

    return matchId && matchName && matchNonCompliance;
  });
};

const clearFilter = () => {
  search.value = { id: "", employeeName: "", nonCompliance: "" };
  filtered.value = records.value;
};

const onAdd = (e: { data: AttendanceRecord }) => {
  // Avoid duplication if editing triggers add
  if (!e.data || (typeof e.data.id === "number" && records.value.some((r) => r.id === e.data.id)))
    return;
  store.addRecord(e.data);
  triggerAlert();
};

const onUpdate = (e: { data: AttendanceRecord }) => {
  store.updateRecord(e.data);
  triggerAlert();
};

const triggerAlert = () => {
  showAlert.value = true;
  setTimeout(() => (showAlert.value = false), 3000);
};

const exportToExcel = () => {
  const grid = gridRef.value?.instance;
  if (!grid) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  exportDataGrid({
    component: grid,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "Attendance.xlsx"
      );
    });
  });
};

const printTable = () => {
  const gridElement = document.getElementById("attendance-table");
  if (!gridElement) return;

  const printContents = gridElement.outerHTML;
  const printWindow = window.open("", "", "height=600,width=800");

  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Attendance Table</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
};

const handleFileUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    console.log("File selected:", file.name);
  }
};

function saveAs(arg0: Blob, arg1: string) {
  throw new Error("Function not implemented.");
}
</script>

<style scoped>
.dx-search {
  width: 100%;
  border: none;
}

.dx-button {
  flex-direction: row-reverse;
  width: 100%;
  border: none;
  margin: 10px;
}

@media print {
  body * {
    visibility: hidden;
  }
  #attendance-table,
  #attendance-table * {
    visibility: visible;
  }
  #attendance-table {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
