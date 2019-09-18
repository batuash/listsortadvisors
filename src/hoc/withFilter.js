import React from 'react';

function withFilter(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {filters: []};
    }

    applyFilter = id => ({target: {value}}) => {
      const {filters} = this.state;
      const newFilter = value
        ? [{regex: new RegExp(`^.*${value}.*$`), id}]
        : [];

      this.setState({
        filters: [...filters.filter(f => f.id !== id)].concat(newFilter)
      });
    };

    filterRows = rows =>
      rows.filter(row =>
        this.state.filters.reduce(
          (acc, {regex, id}) => acc && regex.test(row[id]),
          true
        )
      );

    render() {
      const {filters} = this.state;

      return (
        <WrappedComponent
          filters={filters}
          applyFilter={this.applyFilter}
          filterRows={this.filterRows}
          {...this.props}
        />
      );
    }
  };
}

export default withFilter;
