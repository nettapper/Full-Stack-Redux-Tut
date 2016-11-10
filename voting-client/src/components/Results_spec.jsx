import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { List, Map } from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zeros', () => {
    const pair = List.of('23', 'Star Wars');
    const tally = Map({'Star Wars': 111});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [two, star] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(two).to.contain('23');
    expect(two).to.contain('0');
    expect(star).to.contain('Star Wars');
    expect(star).to.contain('111');
  });

});
