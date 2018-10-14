import React from 'react';
import { shallow } from 'enzyme';
import ToolTip from '../ToolTip';

xtest('renders <ToolTip /> correctly', () => {
  const wrapper = shallow(<ToolTip />);
  expect(wrapper).toMatchSnapshot();
});
