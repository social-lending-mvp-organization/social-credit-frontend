import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from '../Dashboard';

configure({ adapter: new Adapter() });

describe('The dashboard should contain', () => {
  const isLoggedIn = false;
  const wrapper = shallow(<Dashboard isLoggedIn={isLoggedIn} />);
  it('a div with class name .dashboard-wrapper', () => {
    expect(wrapper.find('.dashboard-wrapper').length).toBe(1);
  });
});
