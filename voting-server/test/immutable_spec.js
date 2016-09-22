import { expect } from 'chai';
import { List } from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);

    });
  });

  describe('a list', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('23', '127 Hours');
      let nextState = addMovie(state, '7 Psychopaths');

      expect(nextState).to.equal(List.of(
        '23',
        '127 Hours',
        '7 Psychopaths'
      ));

      expect(state).to.equal(List.of(
        '23',
        '127 Hours'
      ));

    });
  });

});

