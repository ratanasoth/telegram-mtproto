//@flow

import { type AxiosXHR } from 'axios'

/*:: import List from 'Util/immutable-list'
import ApiRequest from '../service/main/request'
import { NetMessage } from '../service/networker/net-message'
import NetworkerThread from '../service/networker' */
import { type ModuleStatus } from '../status'
import { type NetStatus } from 'NetStatus'
import { type MessageUnit } from '../task/index.h'
import { KeyStorage } from 'Util/key-storage'
import { KeyValue } from 'Monad'
import {
  type CryptoKey,
  toCryptoKey,
  type DCNumber,
  toDCNumber,
  type UID,
  toUID,
} from 'Newtype'
export type MessageHistory = {
  id: string,
  seq: number,
  direction: 'in' | 'out',
  message: MessageUnit
}

export type OnRecovery = {
  halt: DCNumber,
  recovery: DCNumber,
}

export type InitType = {
  uid: UID,
}

export type ApiNewRequest = {
  netReq: ApiRequest,
  method: string,
  params: { [key: string]: mixed },
  timestamp: number,
}

export type NetState = {
  dc: string,
  sent: List<NetMessage, string>,
  status: ModuleStatus,
  authKey: number[],
  authSubKey: {
    authKeyUint8: Uint8Array,
    authKeyBuffer: ArrayBuffer,
    authKeyID: number[],
  },
  salt: number[],
  session: number[],
  requestMap: { [req: string]: NetMessage },
}

export type CommandList = {
  commands: string[],
  msgs: string[],
  byMsg: { [msg: string]: string },
  byCommand: { [command: string]: string },
}

export type Client = {
  uid: string,
  homeDc: number,
  dcDetected: boolean,
  command: KeyValue<string, string>,
  request: KeyValue<UID, ApiRequest>,
  pendingAck: { [dc: number]: string[] },
  lastMessages: UID[],
  salt: KeyStorage,
  auth: KeyStorage,
  authID: KeyStorage,
  status: KeyValue<DCNumber, boolean>,
}

export type ClientList = {
  ids: string[],
  [uid: string]: Client & { status: KeyValue<DCNumber, boolean> },
}

export type State = {
  client: ClientList,
  // request: {
  //   api: List<ApiNewRequest, string>
  // },
}

export type OnSetStatus = {
  dc: number,
  status: NetStatus,
}[]

export type OnSeqSet = {
  dc: number,
  seq: number,
}

export type OnAckAdd = {
  dc: DCNumber,
  ack: string[]
}

export type OnRequestDone = MessageUnit[]/* {
  message: NetMessage,
  thread: NetworkerThread,
  result: {
    messageID: string,
    response: MTP,
    seqNo: number,
    sessionID: Uint8Array,
  },
  normalized: MessageUnit[],
} */

export type OnStorageImported = {
  +auth: { [dc: number]: number[] },
  +salt: { [dc: number]: number[] },
  +session: { [dc: number]: number[] },
  +home: DCNumber,
  +uid: UID,
}

export type OnReceiveResponse = {
  message: NetMessage,
  noResponseMsgs: string[],
  result: AxiosXHR<ArrayBuffer>,
  thread: NetworkerThread,
  dc: DCNumber,
  uid: UID,
}

export type OnNetSend = {
  message: NetMessage,
  threadID: string,
  thread: NetworkerThread,
  noResponseMsgs: string[],
}

export type OnDcDetected = {
  dc: DCNumber,
  uid: UID,
}

export type OnAuthResolve = {
  dc: DCNumber,
  uid: UID,
  authKey: CryptoKey,
  authKeyID: CryptoKey,
  serverSalt: CryptoKey,
}
