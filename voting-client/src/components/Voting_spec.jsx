import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={["23", "Star Wars"]} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('23');
		expect(buttons[1].textContent).to.equal('Star Wars');
	});

	it('invikes callback when a button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["23", "Star Wars"]}
              vote={vote} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('23');
	});

	it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["23", "Star Wars"]}
              hasVoted="23" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={["23", "Star Wars"]}
              hasVoted="23" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

});
