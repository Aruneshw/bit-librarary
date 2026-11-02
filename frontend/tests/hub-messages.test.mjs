import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeRoomMessages } from '../src/lib/hub/types.ts';
const msg = (id, created_at, room_id='room-one') => ({ id, room_id, sender_id: 'student', body: id, created_at });
test('an older history response cannot erase a message received over Realtime', () => {
  const history = [msg('first','2026-11-02T10:00:00Z')];
  const arrivedDuringFetch = msg('second','2026-11-02T10:01:00Z');
  assert.deepEqual(mergeRoomMessages('room-one',[arrivedDuringFetch],history).map(m=>m.id),['first','second']);
});
test('reconnection duplicates and room switches preserve one chronological room history', () => {
  const first = msg('first','2026-11-02T10:00:00Z');
  const other = msg('private-other-room','2026-11-02T10:00:00Z','other-room');
  assert.deepEqual(mergeRoomMessages('room-one',[first,other],[first]),[first]);
});
test('messages with identical timestamps retain deterministic order for pagination', () => {
  const a=msg('a','2026-11-02T10:00:00Z'), b=msg('b','2026-11-02T10:00:00Z');
  assert.deepEqual(mergeRoomMessages('room-one',[b],[a]).map(m=>m.id),['a','b']);
});
