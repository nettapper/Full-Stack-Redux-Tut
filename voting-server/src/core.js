import { List, Map } from 'immutable';

// Givent a state and a list of entries a new state is returned with the new
// list of entries modified
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

// Given a state, a new state will be generated with the first two elements of
// the entries moved into the Map vote as a List pair
export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

// vote should increment the counter in state.vote.tally or add one if one
// doesn't already exist
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
