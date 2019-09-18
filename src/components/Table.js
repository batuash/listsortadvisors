import React from 'react';

const Table = (props) => {
	const {
		tableData: {columns, rows},
	} = props;

	return (
		<table>
			<thead>
				<tr>
					{columns.map(({id, title}, idx) => (
						<th key={`${title}_${idx}`}>
							{id === 'number' ? '#' : title}
						</th>
					))}
				</tr>
				<tr className="Table-filter-row">
					{columns.map(({id, title}, idx) => (
						<th key={`filter_${title}_${idx}`}>
							<input
								type="text"
								placeholder="Filter"
								className="Table-filter-input"
							/>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, rowIdx) => (
					<tr key={`${row.number}_${rowIdx}`} className="Table-body-row">
						{columns.map(({id}, celIdx) => (
							<td key={`${row.number}_${celIdx}`}>{row[id]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

Table.defaultProps = {
  tableData: {columns: [], rows: []}
};

export default Table;
