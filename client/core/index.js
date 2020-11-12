import {
  reducer as coreReducer,
  getInitialState as getInitialCoreState,
} from "./rpn";
import { withHistory, withHistoryState } from "./with-history";
import { withErrorLog, withErrorLogState } from "./with-error-log";

export const reducer = withErrorLog(withHistory(coreReducer));
export const getInitialState = () =>
  withErrorLogState(withHistoryState(getInitialCoreState()));
