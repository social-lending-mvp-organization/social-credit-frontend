import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoanHistory from '../LoanHistory';

configure({ adapter: new Adapter() });

describe('The loan history should contain', () => {
  const isLoggedIn = true;
  const wrapper = shallow(<LoanHistory isLoggedIn={isLoggedIn} />);
  it('a table', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });
  it('a pay loan button', () => {
    expect(wrapper.find('Button').props().id).toBe('pay-loan-button');
  });
});
