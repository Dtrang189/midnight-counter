// This file is part of midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { CounterSimulator } from "./counter-simulator.js";
import {
  NetworkId,
  setNetworkId
} from "@midnight-ntwrk/midnight-js-network-id";
import { describe, it, expect } from "vitest";

setNetworkId(NetworkId.Undeployed);

describe("Counter smart contract", () => {
  it("generates initial ledger state deterministically", () => {
    const simulator0 = new CounterSimulator();
    const simulator1 = new CounterSimulator();
    expect(simulator0.getLedger()).toEqual(simulator1.getLedger());
  });

  it("properly initializes ledger state and private state", () => {
    const simulator = new CounterSimulator();
    const initialLedgerState = simulator.getLedger();
    expect(initialLedgerState.round).toEqual(0n);
    const initialPrivateState = simulator.getPrivateState();
    expect(initialPrivateState).toEqual({ privateCounter: 0 });
  });

  it("increments the counter correctly", () => {
    const simulator = new CounterSimulator();
    const nextLedgerState = simulator.increment();
    expect(nextLedgerState.round).toEqual(1n);
    const nextPrivateState = simulator.getPrivateState();
    expect(nextPrivateState).toEqual({ privateCounter: 0 });
  });

  it("increments the private counter correctly", () => {
    const simulator = new CounterSimulator();
    const result = simulator.incrementPrivate(10n);
    expect(result).toEqual(11n);
  });

  it("decrements the counter correctly", () => {
    const simulator = new CounterSimulator();
    // Increment first to avoid potential underflow (though Uint<64> might wrap, better to be safe)
    simulator.increment();
    simulator.increment();
    const state = simulator.decrement(1n);
    expect(state.round).toEqual(1n);
  });

  it("sets the counter value correctly", () => {
    const simulator = new CounterSimulator();
    const state = simulator.setValue(42n);
    expect(state.round).toEqual(42n);
  });
});
