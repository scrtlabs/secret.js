import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgAuthorizeCircuitBreaker as MsgAuthorizeCircuitBreakerParams,
  MsgTripCircuitBreaker as MsgTripCircuitBreakerParams,
  MsgResetCircuitBreaker as MsgResetCircuitBreakerParams,
} from "../protobuf/cosmos/circuit/v1/tx";

export {
  MsgAuthorizeCircuitBreaker as MsgAuthorizeCircuitBreakerParams,
  MsgTripCircuitBreaker as MsgTripCircuitBreakerParams,
  MsgResetCircuitBreaker as MsgResetCircuitBreakerParams,
} from "../protobuf/cosmos/circuit/v1/tx";

export class MsgAuthorizeCircuitBreaker implements Msg {
  constructor(public params: MsgAuthorizeCircuitBreakerParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker",
      value: this.params,
      encode: () => MsgAuthorizeCircuitBreakerParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgAuthorizeCircuitBreaker",
      value: this.params,
    };
  }
}

export class MsgTripCircuitBreaker implements Msg {
  constructor(public params: MsgTripCircuitBreakerParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.circuit.v1.MsgTripCircuitBreaker",
      value: this.params,
      encode: () => MsgTripCircuitBreakerParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgTripCircuitBreaker",
      value: this.params,
    };
  }
}

export class MsgResetCircuitBreaker implements Msg {
  constructor(public params: MsgResetCircuitBreakerParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.circuit.v1.MsgResetCircuitBreaker",
      value: this.params,
      encode: () => MsgResetCircuitBreakerParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgResetCircuitBreaker",
      value: this.params,
    };
  }
}
