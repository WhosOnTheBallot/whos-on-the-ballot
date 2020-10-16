import React from 'react';
import ReactDOM from 'react-dom';

import App from '../client/components/App';

it('renders without crashing', () => {
  // Create a DOM element to render the component into
  const div = document.createElement('div');

  // Render the component
  // If something is wrong it will fail/crash here
  ReactDOM.render(<App />, div);

  // Clean up

  ReactDOM.unmountComponentAtNode(div);
});
