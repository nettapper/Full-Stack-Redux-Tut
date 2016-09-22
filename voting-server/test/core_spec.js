import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('23', '127 Hours');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('23', '127 Hours')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['23', '127 Hours'];  // this is a plain old js array
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('23', '127 Hours')
      }));
    });
  });

  describe('next', () => {
    it('takes the nex two entries under vote', () => {
      const state = Map({
        entries: List.of('23', '127 Hours', '7 Psychopaths')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('23', '127 Hours')
        }),
        entries: List.of('7 Psychopaths')
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('23', '127 Hours')
        }),
        entries: List()
      });
      const nextState = vote(state, '23');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 1,
            '127 Hours': 27
          })
        }),
        entries: List()
      });
      const nextState = vote(state, '127 Hours');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 1,
            '127 Hours': 28
          })
        }),
        entries: List()
      }));
    });
  });
});
