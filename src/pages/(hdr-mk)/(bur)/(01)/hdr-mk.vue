<template>
  <div class="p-4">
    <!-- Search Panel -->
    <SearchPanel :criteria="searchCriteria" @search="applySearch" @reset="resetSearch" />

    <!-- Print and Export Buttons -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-semibold text-xl">List of Declarations of Official Business</h2>
      <div class="flex gap-2">
        <DxButton text="Print" icon="print" @click="handlePrint" />
        <DxButton text="Export" icon="export" @click="handleExport" />
      </div>
    </div>

    <!-- Declaration Table -->
    <div id="print-section">
      <DeclarationTable
        :declarations="filteredDeclarations"
        @onView="handleView"
        @onCancel="handleCancel"
      />
    </div>

    <!-- End Form Popup -->
    <DxPopup
      v-model:visible="cancelPopup"
      title="Official Business Declaration Information"
      width="700"
    >
      <template #title>
        <div class="flex justify-between items-center">
          <span>Official Business Declaration Information</span>
          <a href="#" @click.prevent="showEndFields" class="text-blue-500 text-sm underline"
            >End of Declaration Official Affairs</a
          >
        </div>
      </template>

      <div class="p-6 space-y-4">
        <DxForm :form-data="form" label-mode="top">
          <DxSimpleItem data-field="applicationRef" label="Application Reference No." />
          <DxSimpleItem data-field="agencyDivision" label="Agency/ Division" />
          <DxSimpleItem data-field="branch" label="Branch/Unit" />
          <DxSimpleItem data-field="competencyOwner" label="Name of Competency Owner" />
          <DxSimpleItem data-field="identityCardNo" label="Identity Card No." />
          <DxSimpleItem data-field="positionGrade" label="Position & Grade" />
          <DxSimpleItem
            data-field="updateTime"
            label="Update Date & Time"
            editor-type="dxDateBox"
          />
          <DxSimpleItem data-field="startDate" label="Start Date & Time" editor-type="dxDateBox" />
          <DxSimpleItem data-field="businessType" label="Type of Official Business" />
          <DxSimpleItem data-field="businessName" label="Official Business Name" />
          <DxSimpleItem
            data-field="info"
            label="Information"
            editor-type="dxTextArea"
            :editor-options="{ height: 80 }"
          />
          <DxSimpleItem data-field="location" label="Official Business Location" />
          <DxSimpleItem label="Supporting Documents">
            <a class="text-blue-500 underline" href="#">abcdefg.pdf</a>
          </DxSimpleItem>
          <DxSimpleItem data-field="status" label="Record Status" />
          <DxSimpleItem
            data-field="expireDate"
            label="Expiration Date & Time"
            editor-type="dxDateBox"
            :visible="showExtraFields"
          />
          <DxSimpleItem
            data-field="notes"
            label="Notes"
            :editor-options="{ height: 60 }"
            :visible="showExtraFields"
          />
        </DxForm>

        <div class="text-center flex justify-end gap-2">
          <template v-if="showExtraFields">
            <DxButton
              text="Save"
              type="success"
              styling-mode="contained"
              @click="confirmPopup = true"
            />
            <DxButton
              text="Cancel"
              type="danger"
              styling-mode="outlined"
              @click="cancelPopup = false"
            />
          </template>
          <DxButton
            text="Return"
            icon="undo"
            type="normal"
            styling-mode="outlined"
            @click="cancelPopup = false"
          />
        </div>
      </div>
    </DxPopup>

    <!-- Confirmation Popup -->
    <DxPopup
      v-model:visible="confirmPopup"
      title="End of Declaration of Official Business"
      width="400"
    >
      <div class="p-4 text-center">
        <div class="text-2xl mb-4 text-red-600">❓</div>
        <p>Are you sure you want to end the declaration of official business?</p>
        <div class="mt-4 flex justify-center gap-4">
          <DxButton text="OK" type="default" @click="handleConfirmSave" />
          <DxButton text="No" styling-mode="outlined" @click="confirmPopup = false" />
        </div>
      </div>
    </DxPopup>

    <!-- Confirmation Popup Cancel -->
    <DxPopup
      v-model:visible="confirmPopupAl"
      title="End of Declaration of Official Business"
      width="400"
    >
      <div class="p-4 text-center">
        <div class="text-2xl mb-4 text-red-600">❓</div>
        <p>Are you sure you want to end the declaration of official business?</p>
        <div class="mt-4 flex justify-center gap-4">
          <DxButton text="OK" type="default" @click="handleConfirmAl" />
          <DxButton text="No" styling-mode="outlined" @click="confirmPopupAl = false" />
        </div>
      </div>
    </DxPopup>

    <!-- Cancel Form Popup -->
    <DxPopup
      v-model:visible="cancelPopupAl"
      title="Official Business Declaration Information"
      width="700"
    >
      <div class="p-6 space-y-4">
        <DxForm :form-data="form1" label-mode="top">
          <DxSimpleItem data-field="competencyOwner" label="Name of Competency Owner" />
          <DxSimpleItem data-field="identityCardNo" label="Identity Card No." />
          <DxSimpleItem data-field="applicationRef" label="Application Reference No." />
          <DxSimpleItem data-field="businessType" label="Type of Official Business" />
          <DxSimpleItem data-field="businessName" label="Official Business Name" />
          <DxSimpleItem data-field="location" label="Official Business Location" />
          <DxSimpleItem
            data-field="updateTime"
            label="Update Date & Time"
            editor-type="dxDateBox"
          />
          <DxSimpleItem data-field="startDate" label="Start Date & Time" editor-type="dxDateBox" />
          <DxSimpleItem
            data-field="expireDate"
            label="Expiration Date & Time"
            editor-type="dxDateBox"
          />
          <DxSimpleItem data-field="notes" label="Notes" :editor-options="{ height: 60 }" />
          <DxSimpleItem data-field="status" label="Record Status" />
        </DxForm>

        <DxButton
          text="Save"
          type="success"
          styling-mode="contained"
          @click="handleConfirmSaveAl"
        />
        <DxButton
          text="Cancel"
          type="danger"
          styling-mode="outlined"
          @click="cancelPopupAl = false"
        />

        <DxButton
          text="Return"
          icon="undo"
          type="normal"
          styling-mode="outlined"
          @click="cancelPopupAl = false"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script setup lang="ts">
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue/button";
import DxForm, { DxSimpleItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";
import { ref, reactive } from "vue";
import { useDeclarationStore } from "@/stores/hdr-mk";
import { computed } from "vue";
import SearchPanel from "./components/search-panel.vue";
import DeclarationTable from "./components/table.vue";
import { useTableUtilities } from "@/composables/useTableUtilities";

const { printTable, exportTable } = useTableUtilities();

const handlePrint = () => {
  printTable("print-section");
};

const handleExport = () => {
  const headers = [
    "ID",
    "Competency Owner",
    "IC No.",
    "Type",
    "Number",
    "Location",
    "Start Date",
    "End Date",
    "Status",
  ];

  const data = filteredDeclarations.value.map((row) => [
    row.id,
    row.competencyOwner,
    row.identityCardNo,
    row.typeOfficialAffairs,
    row.numberOfficialAffairs,
    row.location,
    row.startDate,
    row.endDate,
    row.statusRecord,
  ]);

  exportTable(data, headers, "declarations.csv");
};

const store = useDeclarationStore();
const declarations = computed(() => store.declarations);
const cancelPopup = ref(false);
const confirmPopup = ref(false);
const selectedRow = ref<any>(null);
const showExtraFields = ref(false);

const confirmPopupAl = ref(false);
const cancelPopupAl = ref(false);

const searchCriteria = reactive({
  applicationRef: "",
  type: "",
  businessName: "",
});

const filteredDeclarations = computed(() => {
  return declarations.value.filter((item) => {
    const matchRef =
      !searchCriteria.applicationRef ||
      item.numberOfficialAffairs
        ?.toLowerCase()
        .includes(searchCriteria.applicationRef.toLowerCase());
    const matchType = !searchCriteria.type || item.typeOfficialAffairs === searchCriteria.type;
    const matchName =
      !searchCriteria.businessName ||
      item.numberOfficialAffairs?.toLowerCase().includes(searchCriteria.businessName.toLowerCase());
    return matchRef && matchType && matchName;
  });
});

const resetSearch = () => {
  searchCriteria.applicationRef = "";
  searchCriteria.type = "";
  searchCriteria.businessName = "";
};

const form = reactive({
  applicationRef: "",
  agencyDivision: "",
  branch: "",
  competencyOwner: "",
  identityCardNo: "",
  positionGrade: "",
  updateTime: "",
  startDate: "",
  expireDate: "",
  businessType: "",
  businessName: "",
  info: "",
  location: "",
  notes: "",
  status: "",
});

const form1 = reactive({
  applicationRef: "",
  agencyDivision: "",
  branch: "",
  competencyOwner: "",
  identityCardNo: "",
  positionGrade: "",
  updateTime: "",
  startDate: "",
  expireDate: "",
  businessType: "",
  businessName: "",
  info: "",
  location: "",
  notes: "",
  status: "",
});

const handleView = (e: any) => {
  selectedRow.value = e.row.data;
  Object.assign(form, {
    applicationRef: "XXXXXXXXXX",
    agencyDivision: "Agency/ Division",
    branch: "Branch/Unit",
    competencyOwner: e.row.data.competencyOwner,
    identityCardNo: e.row.data.identityCardNo,
    positionGrade: "XXXXXX XXXXXXX, F45",
    updateTime: e.row.data.startDate,
    startDate: e.row.data.startDate,
    expireDate: e.row.data.endDate,
    businessType: e.row.data.typeOfficialAffairs,
    businessName: e.row.data.numberOfficialAffairs,
    info: "Sample info about this declaration...",
    location: e.row.data.location,
    notes: "",
    status: e.row.data.statusRecord,
  });
  showExtraFields.value = false;
  cancelPopup.value = true;
};

const showEndFields = () => {
  showExtraFields.value = true;
  form.status = "End";
};

const handleConfirmSave = () => {
  if (selectedRow.value?.id) {
    store.deleteDeclaration(selectedRow.value.id);
    notify({
      message: "Declaration ended successfully. Notifications will be sent.",
      type: "info",
      displayTime: 3000,
      position: {
        my: "top right",
        at: "top right",
      },
    });
  }
  selectedRow.value = null;
  confirmPopup.value = false;
  cancelPopup.value = false;
};

const handleCancel = (e: any) => {
  selectedRow.value = e.row.data;

  confirmPopupAl.value = true;
};

const handleConfirmAl = (e: any) => {
  confirmPopupAl.value = false;
  cancelPopupAl.value = true;
  if (selectedRow.value?.id) {
    Object.assign(form1, {
      competencyOwner: selectedRow.value.competencyOwner,
      identityCardNo: selectedRow.value.identityCardNo,
      applicationRef: "XXXXXXXXXX",
      businessType: selectedRow.value.typeOfficialAffairs,
      businessName: selectedRow.value.numberOfficialAffairs,
      location: selectedRow.value.location,
      updateTime: selectedRow.value.startDate,
      startDate: selectedRow.value.startDate,
      expireDate: selectedRow.value.endDate,
      notes: "Don't want to continue",
      status: "Cancelled",
    });
  }
};

const handleConfirmSaveAl = () => {
  if (selectedRow.value?.id) {
    store.deleteDeclaration(selectedRow.value.id);
    notify({
      message: "Declaration ended successfully. Notifications will be sent.",
      type: "info",
      displayTime: 3000,
      position: {
        my: "top right",
        at: "top right",
      },
    });
  }
  cancelPopupAl.value = false;
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
