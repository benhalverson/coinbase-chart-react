import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

test('renders <App /> correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(App)).toBeDefined;
  expect(wrapper).toMatchSnapshot();
});
