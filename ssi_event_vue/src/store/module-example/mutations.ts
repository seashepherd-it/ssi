import { ExampleState } from "src/store/module-example/state";

type SomethingPayload = ExampleState;

export default {
    setSomething(state: ExampleState, {something}: SomethingPayload) {
        state.something = something;
    }
};
