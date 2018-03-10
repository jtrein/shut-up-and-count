/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BigButton from '../BigButton';

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<BigButton onClick={() => {}} />, div);
  unmountComponentAtNode(div);
});

test('renders expected initial components', () => {
  const wrapper = shallow(<BigButton onClick={() => {}} />);
  expect(wrapper.find('div').length).toEqual(1);
  expect(wrapper.find('button').length).toEqual(1);
});

test('button is initially disabled', () => {
  const wrapper = shallow(<BigButton onClick={() => {}} />);
  expect(wrapper.find('button').props().disabled).toEqual(false);
});

test('button has passed onClick func', () => {
  const wrapper = shallow(<BigButton onClick={() => {}} />);
  expect(wrapper.find('button').props().onClick.toString()).toEqual('() => {}');
});

test('button calls onClick once when clicked', () => {
  const spy = jest.fn();
  const wrapper = shallow(<BigButton onClick={spy} />);
  wrapper.find('button').simulate('click');
  expect(spy.mock.calls.length).toEqual(1);
});
