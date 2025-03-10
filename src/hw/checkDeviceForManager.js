// @flow
import Transport from "@ledgerhq/hw-transport";
import { Observable, of, throwError } from "rxjs";
import { UnexpectedBootloader } from "@ledgerhq/errors";
import type { DeviceInfo, SocketEvent } from "../types/manager";
import genuineCheck from "./genuineCheck";

export default (
  transport: typeof Transport,
  deviceInfo: DeviceInfo
): Observable<SocketEvent> =>
  deviceInfo.isOSU || deviceInfo.managerAllowed
    ? of({ type: "result", payload: "0000" })
    : deviceInfo.isBootloader
    ? throwError(new UnexpectedBootloader())
    : genuineCheck(transport, deviceInfo);
