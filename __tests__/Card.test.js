import React from 'react';
import ReactDOM from 'react-dom';

import Card from '../client/components/Card';

// Passing dummy data into official prop in order to simulate fetch, followed by render
const official = {
  name: 'Donald J. Trump',
};

it('renders without crashing', () => {
  // Create a DOM element to render the component into
  const div = document.createElement('div');

  // Render the component
  // If something is wrong it will fail/crash here
  ReactDOM.render(<Card official={official} />, div);

  // Clean up

  ReactDOM.unmountComponentAtNode(div);
});
