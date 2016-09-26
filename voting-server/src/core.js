import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

// Givent a state and a list of entries a new state is returned with the new
// list of entries modified
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}


function getWinners(vote) {
  if(!vote) return [];
  const [a,b]  = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes ) return [a];
  if (aVotes < bVotes ) return [b];
  else                  return [a,b];
}

// Given a state, a new state will be generated with the first two elements of
// the entries moved into the Map vote as a List pair
export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
      entries: entries.skip(2)
    });
  }
}

// vote should increment the counter in state.vote.tally or add one if one
// doesn't already exist
export function vote(state, entry) {
  return state.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
