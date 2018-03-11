/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dropzone from 'react-dropzone';
import toJSON from 'enzyme-to-json';

import FileDropzone from '../FileDropzone';
import { ALLOWED_MIME, MAX_FILE_SIZE } from '../../settings';

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />, div);
  unmountComponentAtNode(div);
});

test('renders expected initial components', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  expect(wrapper.find('p').text()).toBe('Click or drop .txt files.');
  expect(wrapper.find(Dropzone).length).toBe(1);
});

test('renders expected text', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  expect(wrapper.find('p').text()).toBe('Click or drop .txt files.');
  expect(wrapper.find('small').text()).toBe('(max size is 10MB)');
});

test('renders expected props from settings', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  expect(wrapper.find(Dropzone).props().accept).toBe(ALLOWED_MIME);
  expect(wrapper.find(Dropzone).props().maxSize).toBe(MAX_FILE_SIZE);
});

test('renders expected overlay text when active', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  wrapper.setState({ dropzoneActive: true });
  expect(wrapper.find('div').first().text()).toContain('Go ahead, drop it!');
});

test('renders file info text when file', () => {
  const fileFixture = [{ name: 'hello', size: 123456 }];
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  wrapper.setState({ file: fileFixture });
  expect(wrapper.find('div').first().text()).toContain('hello');
  expect(wrapper.find('div').first().text()).toContain('120kb');
});

test('renders file info text when file is under 1kb', () => {
  const fileFixture = [{ name: 'hello', size: 123 }];
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  wrapper.setState({ file: fileFixture });
  expect(wrapper.find('div').first().text()).toContain('hello');
  expect(wrapper.find('div').first().text()).toContain('~1kb');
});

test('dropzoneActive state is true on dragenter', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  wrapper.simulate('dragenter');
  expect(wrapper.state().dropzoneActive).toBe(true);
});

test('dropzoneActive state is false on dragleave', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  wrapper.simulate('dragleave');
  expect(wrapper.state().dropzoneActive).toBe(false);
});

test('proper state changes on drop', () => {
  const spy = jest.fn();
  const wrapper = mount(<FileDropzone onDropAccepted={spy} onDropRejected={() => {}} />);
  wrapper.instance().onDrop([{ name: 'hi', size: 123456 }]);
  expect(wrapper.state().dropzoneActive).toBe(false);
  expect(spy.mock.calls.length).toBe(1);
});

test('onDropRejected calls callback with proper error type: size', () => {
  const spy = jest.fn();
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={spy} />);
  wrapper.instance().onDropRejected([{ type: 'text/plain', size: 1231223123456 }]);
  expect(spy.mock.calls[0][0]).toBe('size');
  expect(spy.mock.calls.length).toBe(1);
});

test('onDropRejected calls callback with proper error type: size', () => {
  const spy = jest.fn();
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={spy} />);
  wrapper.instance().onDropRejected([{ type: 'application/javascript', size: 123 }]);
  expect(spy.mock.calls[0][0]).toBe('type');
  expect(spy.mock.calls.length).toBe(1);
});

test('Snapshot: renders as expected', () => {
  const wrapper = mount(<FileDropzone onDropAccepted={() => {}} onDropRejected={() => {}} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
