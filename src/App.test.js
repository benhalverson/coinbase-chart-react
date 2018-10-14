import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({
  adapter: new Adapter()
});

it('renders without crashing', () => {
  let app = mount(<App />);
  expect(app).toBeDefined();
});
