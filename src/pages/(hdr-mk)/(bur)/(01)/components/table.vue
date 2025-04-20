<template>
  <DxDataGrid
    :data-source="declarations"
    key-expr="id"
    show-borders
    :paging="{ pageSize: 5 }"
    :pager="{
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 15, 20],
      showInfo: true,
    }"
  >
    <DxSelection mode="multiple" />

    <DxColumn data-field="id" :caption="$t('declarations.id')" width="50" />
    <DxColumn data-field="competencyOwner" :caption="$t('declarations.competencyOwner')" />
    <DxColumn data-field="identityCardNo" :caption="$t('declarations.identityCardNo')" />
    <DxColumn data-field="typeOfficialAffairs" :caption="$t('declarations.typeOfficialAffairs')" />
    <DxColumn
      data-field="numberOfficialAffairs"
      :caption="$t('declarations.numberOfficialAffairs')"
    />
    <DxColumn data-field="location" :caption="$t('declarations.location')" />
    <DxColumn data-field="startDate" :caption="$t('declarations.startDate')" data-type="date" />
    <DxColumn data-field="endDate" :caption="$t('declarations.endDate')" data-type="date" />
    <DxColumn data-field="statusRecord" :caption="$t('declarations.statusRecord')" />

    <DxColumn
      type="buttons"
      :caption="$t('declarations.action')"
      width="150"
      :buttons="[
        {
          hint: $t('declarations.viewDeclaration'),
          icon: 'eyeopen',
          onClick: (e) => emit('onView', e),
        },
        {
          hint: $t('declarations.cancelDeclaration'),
          icon: 'close',
          onClick: (e) => emit('onCancel', e),
        },
      ]"
    />
  </DxDataGrid>
</template>

<script setup lang="ts">
import { DxDataGrid, DxColumn, DxSelection } from "devextreme-vue/data-grid";
import type { Declaration } from "@/stores/data";

interface Props {
  declarations: Declaration[];
}
const props = defineProps<Props>();

// ✅ Type-based emits declaration
const emit = defineEmits<{
  (e: "onView", payload: any): void;
  (e: "onCancel", payload: any): void;
}>();

// defineProps({
//   declarations: {
//     type: Array,
//     required: true,
//   },
// });

// const emit = defineEmits(["onView", "onCancel"]);
</script>
