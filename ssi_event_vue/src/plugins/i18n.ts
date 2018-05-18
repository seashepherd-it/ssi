import messages from "src/i18n";
import VueI18n from "vue-i18n";
import { VueConstructor } from "vue";

interface LoadParams {
  app: any; // no app typings for now
  Vue: VueConstructor;
}

export default ({ app, Vue }: LoadParams) => {
  Vue.use(VueI18n);

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    messages
  });
};
