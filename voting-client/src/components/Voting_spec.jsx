import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { List } from 'immutable';
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

	it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="23" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component, 'button');
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('23');
	});

	it('renders as a pure component', () => {
    const pair = ['23', 'Star Wars'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('23');

    pair[0] = 'this shouldnt be the new text';
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('23');
	});

});
