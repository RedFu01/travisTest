import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import SearchView from '../SearchView.ios.js';
import { expect } from 'chai';

describe('<SearchView />', () => {
  it('should render the SearchView', () => {
    const wrapper = shallow(<SearchView />);
    expect(wrapper.length).to.equal(1);  
    //expect(wrapper.contains(<Text>I wonder if there will be any problems...</Text>)).to.equal(true);
  });
});
