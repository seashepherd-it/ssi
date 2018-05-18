import { ExampleState } from "./state";
import { GetterTree } from "vuex";
import { RootState } from "store/state";

export default {
    getSomething(state: ExampleState) {
        return state.something;
    }
} as GetterTree<ExampleState, RootState>;
