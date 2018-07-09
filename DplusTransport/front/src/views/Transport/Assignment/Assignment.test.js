import React from 'react';
import ReactDOM from 'react-dom';
import Assignment from './Assignment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonDropdowns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
