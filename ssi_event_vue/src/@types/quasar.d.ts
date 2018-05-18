import Vue from "vue";

// all these and more should be inside the index.d.ts of Quasar

declare module quasar {
  export function openURL(url: string): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $q: any;
  }
}