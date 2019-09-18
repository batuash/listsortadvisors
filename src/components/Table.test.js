import React from 'react';
import Table from './Table';
import ShallowRenderer from 'react-test-renderer/shallow';
import tableData from '../static/sampleData'


describe('Table', () => {
	it('renders correctly with no data', () => {
		const renderer = new ShallowRenderer();
	  const tree = renderer.render(<Table />);
	  expect(tree).toMatchSnapshot();
	});

	it('renders correctly with valid data', () => {
		const renderer = new ShallowRenderer();
	  const tree = renderer.render(<Table tableData={tableData} />);
	  expect(tree).toMatchSnapshot();
	});
});
