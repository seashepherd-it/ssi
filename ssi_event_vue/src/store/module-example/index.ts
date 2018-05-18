import state, { ExampleState } from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { Module } from "vuex";
import { RootState } from "store/state";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} as Module<ExampleState, RootState>;
