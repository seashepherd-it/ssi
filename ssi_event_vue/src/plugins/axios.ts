import axios from "axios";
import { VueConstructor } from "vue";

export default ({ Vue }: { Vue: VueConstructor}) => {
  Vue.prototype.$axios = axios;
};
