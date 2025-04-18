// File: stores/declarations.ts
import { defineStore } from "pinia";
import type { Declaration } from "./data";
import { declarationsData } from "./data";

export const useDeclarationStore = defineStore("declarations", {
  state: () => ({
    declarations: [...declarationsData] as Declaration[],
  }),
  actions: {
    deleteDeclaration(id: number) {
      this.declarations = this.declarations.filter((declaration) => declaration.id !== id);
    },
  },
});
