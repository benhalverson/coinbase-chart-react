import React from 'react';
import { shallow } from 'enzyme';
import LineChart from '../LineChart';

xtest('should render LineChart correctly', () => {
  const wrapper = shallow(<LineChart data={this.state.data} />);
  expect(wrapper).toMatchSnapshot();
});
