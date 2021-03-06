import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('hadles SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['23'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['23']
    }));
  });

  it('hadles NEXT', () => {
    const initialState = fromJS({
      entries: ['23', '127 Hours']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['23', '127 Hours']
      },
      entries: []
    }));
  });

  it('hadles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['23', '127 Hours']
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: '23' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['23', '127 Hours'],
        tally: { '23': 1 }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['23'] };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['23']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['23', '127 Hours']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: '23'},
      {type: 'VOTE', entry: '127 Hours'},
      {type: 'VOTE', entry: '23'},
      {type: 'NEXT'}
    ];

    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: '23'
    }));
  });
});
