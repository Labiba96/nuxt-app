<template>
  <div class="mb-6 border rounded p-4">
    <h2 class="font-semibold text-lg mb-4">{{ $t("declarations.searchDeclarationTitle") }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div>
        <label class="block text-sm font-medium mb-1">
          {{ $t("declarations.applicationReferenceNo") }}
        </label>
        <DxTextBox v-model="criteria.applicationRef" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">
          {{ $t("declarations.typeOfOfficialBusiness") }}
        </label>
        <DxSelectBox
          :items="typeOptions"
          v-model="criteria.type"
          :placeholder="$t('declarations.pleaseSelect')"
          :search-enabled="true"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">
          {{ $t("declarations.officialBusinessName") }}
        </label>
        <DxTextBox v-model="criteria.businessName" />
      </div>
      <div class="col-span-1 md:col-span-3 flex gap-4 justify-start mt-4">
        <DxButton text="Search" type="default" icon="search" @click="$emit('search')" />
        <DxButton text="Reset" type="normal" @click="$emit('reset')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import DxButton from "devextreme-vue/button";
import { defineProps } from "vue";

const props = defineProps<{
  criteria: {
    applicationRef: string;
    type: string;
    businessName: string;
  };
}>();

const typeOptions = ["Official Visit", "Training", "Meeting", "Others"];
</script>
