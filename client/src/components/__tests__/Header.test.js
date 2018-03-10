/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from '../Header';

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Header onDropAccepted={() => {}} />, div);
  unmountComponentAtNode(div);
});

test('renders expected initial components', () => {
  const wrapper = mount(<Header />);
  expect(wrapper.find('header').length).toBe(1);
  expect(wrapper.find('img').length).toBe(1);
  expect(wrapper.find('h1').length).toBe(1);
});

test('h1 renders expected text', () => {
  const wrapper = mount(<Header />);
  expect(wrapper.find('h1').text()).toBe('Shut Up and Count');
});
