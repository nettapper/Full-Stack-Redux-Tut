import React from 'react';
import { List, Map } from 'immutable';

const pair  = List.of('23', 'Star Wars');
const tally = Map({'23': 21, 'Star Wars': 111});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair:  pair,
      tally: tally
    });
  }
});
