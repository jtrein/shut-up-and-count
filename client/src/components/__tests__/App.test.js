/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Snackbar from 'material-ui/Snackbar';

import MockFetch from '../../__mocks__/fetch';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});

test('renders expected initial components', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Header').length).toEqual(1);
  expect(wrapper.find('FileDropzone').length).toEqual(1);
  expect(wrapper.find('BigButton').length).toEqual(1);
  expect(wrapper.find('Snackbar').length).toEqual(0);
  expect(wrapper.find('Table').length).toEqual(0);
  expect(wrapper.find('Column').length).toEqual(0);
  expect(wrapper.find('Spinner').length).toEqual(0);
});

test('BigButton is disabled on init', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('BigButton').props().disabled).toEqual(true);
});

test('BigButton can enable when isButtonDisabled=false', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ isButtonDisabled: false });
  expect(wrapper.find('BigButton').props().disabled).toEqual(false);
});

test('BigButton click: spinner does not fire in initial state', () => {
  const wrapper = shallow(<App />);
  wrapper.find('BigButton').simulate('click');
  expect(wrapper.state().progress).toEqual(false);
});

test('BigButton click: postTextFile sets state after fetch', async () => {
  const origFetch = global.fetch;
  const fakeRes = [{ eachWordCount: { hello: 1 }, totalWordCount: 1 }];
  global.fetch = MockFetch(fakeRes);

  const wrapper = shallow(<App />);
  wrapper.setState({ fileToSend: [{ filename: 'hello' }] });
  wrapper.find('BigButton').simulate('click');

  expect(wrapper.state().progress).toEqual(true);

  await wrapper;
  await wrapper;

  expect(wrapper.state().progress).toEqual(false);
  expect(wrapper.state().data).toEqual(fakeRes);

  global.fetch = origFetch;
});

test('BigButton click: postTextFile sets error state after fetch', async () => {
  const origFetch = global.fetch;
  const fakeRes = { error: 'is this bad?' };
  global.fetch = MockFetch(fakeRes);

  const wrapper = shallow(<App />);
  wrapper.setState({ fileToSend: [{ filename: 'hello' }] });
  wrapper.find('BigButton').simulate('click');

  await wrapper;
  await wrapper;
  await wrapper;

  expect(wrapper.state().data).toEqual({});
  expect(wrapper.state().error).toEqual('is this bad?');
  expect(wrapper.state().progress).toEqual(false);

  global.fetch = origFetch;
});

test('Snackbar shows when error is set', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ error: 'hello' });
  expect(wrapper.find(Snackbar).length).toEqual(1);
});

test('Spinner can show when progress=true and no error', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ progress: true });
  expect(wrapper.find('Spinner').length).toEqual(1);
});

test('Table can show when data', () => {
  const dataFixture = { eachWordCount: { hello: 2, world: 4 } };
  const wrapper = shallow(<App />);
  wrapper.setState({ data: dataFixture });
  expect(wrapper.find('Table').length).toEqual(1);
});

test('Table can show <Column /> when data', () => {
  const dataFixture = { eachWordCount: { hello: 2 } };
  const wrapper = shallow(<App />);
  wrapper.setState({ data: dataFixture });
  expect(wrapper.find('Column').length).toEqual(2);
});

test('Table can show text before table', () => {
  const dataFixture = { eachWordCount: { hello: 2 }, totalWordCount: 1 };
  const wrapper = shallow(<App />);
  wrapper.setState({ data: dataFixture });
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find('p').text()).toEqual('Total word count: 1');
});

test('Table can show text before table', () => {
  const dataFixture = { eachWordCount: { hello: 2 }, totalWordCount: 1 };
  const wrapper = mount(<App />);
  wrapper.setState({ data: dataFixture });
  expect(wrapper.find('Table').text()).toContain('Word');
  expect(wrapper.find('Table').text()).toContain('Occurrences');
  expect(wrapper.find('Table').text()).toContain('hello');
  expect(wrapper.find('Table').text()).toContain('2');
});

test('handleDropAccepted can set proper state', () => {
  const wrapper = mount(<App />);
  wrapper.find('FileDropzone').simulate('drop');
  expect(wrapper.state().fileToSend).toEqual([]);
  expect(wrapper.state().isButtonDisabled).toBe(false);
});
