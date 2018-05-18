import { ActionContext, ActionTree } from "vuex";
import { ExampleState } from "./state";
import { RootState } from "store/state";

type ExampleContext = ActionContext<ExampleState, RootState>;

type SomeActionPayload = { whatExactly: string };

export default {
    async someAction(context: ExampleContext, { whatExactly }: SomeActionPayload): Promise<void> {
        context.getters.setSomething(context.state, {something: whatExactly});
    }
} as ActionTree<ExampleState, RootState>;
