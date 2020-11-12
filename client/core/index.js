import {
  reducer as coreReducer,
  getInitialState as getInitialCoreState,
} from "./rpn";
import { withErrorLog, withErrorLogState } from "./with-error-log";

export const reducer = withErrorLog(coreReducer);
export const getInitialState = () => withErrorLogState(getInitialCoreState());
