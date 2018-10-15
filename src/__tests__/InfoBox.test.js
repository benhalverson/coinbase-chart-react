import React from 'react';
import { shallow } from 'enzyme';
import InfoBox from '../InfoBox';

test('should render InfoBox correctly', () => {
  const wrapper = shallow(<InfoBox />);
  expect(wrapper).toMatchSnapshot();
});
