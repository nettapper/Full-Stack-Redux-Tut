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

    it('puts the winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 10,
            '127 Hours': 4
          })
        }),
        entries: List.of('7 Psychopaths', 'Red', 'Jumper')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('7 Psychopaths', 'Red'),
        }),
        entries: List.of('Jumper', '23')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 7,
            '127 Hours': 7
          })
        }),
        entries: List.of('7 Psychopaths', 'Red', 'Jumper')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('7 Psychopaths', 'Red'),
        }),
        entries: List.of('Jumper', '23', '127 Hours')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('23', '127 Hours'),
          tally: Map({
            '23': 7,
            '127 Hours': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: '23'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('23', '127 Hours')
      });
      const nextState = vote(state, '23');
      expect(nextState).to.equal(Map({
        pair: List.of('23', '127 Hours'),
        tally: Map({
          '23': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('23', '127 Hours'),
        tally: Map({
          '23': 1,
          '127 Hours': 27
        })
      });
      const nextState = vote(state, '127 Hours');
      expect(nextState).to.equal(Map({
        pair: List.of('23', '127 Hours'),
        tally: Map({
          '23': 1,
          '127 Hours': 28
        })
      }));
    });
  });
});
