import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmClaim from './ConfirmClaim';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonDropdowns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
