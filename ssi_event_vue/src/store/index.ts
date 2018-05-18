import Vue from "vue";
import Vuex, { Store } from "vuex";
import example from "./module-example";
import { RootState } from "./state";
import ExampleModule from "./module-example";
import { ExampleState } from "./module-example/state";

Vue.use(Vuex);

const store =  new Store<RootState>({
  state: {
    example: ExampleModule.state as ExampleState
  },
  strict: true,
  modules: {
    example: ExampleModule
  }
});

export default store;
