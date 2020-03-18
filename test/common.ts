// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {describe, it} from 'mocha';
import {shouldRetryRequest, decorateStatus} from '../src/decorateStatus';

describe('decorateStatus', () => {
  it('should attach the correct HTTP code', () => {
    const grpcStatus = {code: 0};
    const status = decorateStatus(grpcStatus);
    assert.strictEqual(status!.message, 'OK');
  });

  it('should return null if the code doesnt match', () => {
    const grpcStatus = {code: 999};
    const status = decorateStatus(grpcStatus);
    assert.strictEqual(status, null);
  });

  it('should accept a basic message', () => {
    const message = 'QUACK!';
    const grpcStatus = {code: 1, message};
    const status = decorateStatus(grpcStatus);
    assert.strictEqual(status!.message, message);
  });

  it('should parse JSON from the response message', () => {
    const message = {
      description: {
        rubber: '🦆',
      },
    };
    const grpcStatus = {code: 1, message: JSON.stringify(message)};
    const status = decorateStatus(grpcStatus);
    assert.deepStrictEqual(status!.message, message.description);
  });
});

describe('shouldRetryRequest_', () => {
  it('should retry on 429, 500, 502, and 503', () => {
    const s1 = shouldRetryRequest({code: 429});
    assert.strictEqual(s1, true);
    const s2 = shouldRetryRequest({code: 444});
    assert.strictEqual(s2, false);
  });
});
