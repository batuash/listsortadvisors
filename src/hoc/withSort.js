import React from "react";
import { compose } from "lodash/fp";

function withSort(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        orderBy: "number",
        desc: false
      };
    }

    applySort = id => () => {
      const { desc, orderBy } = this.state;
      this.setState({
        orderBy: id,
        desc: orderBy === id ? !desc : false
      });
    };

    extractValues = ({ a, b }) => ({
      a: a[this.state.orderBy],
      b: b[this.state.orderBy]
    });

    isEmpty = input => typeof input === "undefined" || typeof input === "null";

    compareValues = ({ a, b }) =>
      this.isEmpty(a) || a < b ? -1 : a > b ? 1 : 0;

    reverseRows = rows => (this.state.desc ? rows.reverse() : rows);

    sortRows = rows => rows.sort(this.sortMethod);

    sortMethod = (a, b) =>
      compose(
        this.compareValues,
        this.extractValues
      )({ a, b });

    render() {
      const { orderBy, desc } = this.state;

      return (
        <WrappedComponent
          orderBy={orderBy}
          desc={desc}
          applySort={this.applySort}
          sortRows={compose(
            this.reverseRows,
            this.sortRows
          )}
          {...this.props}
        />
      );
    }
  };
}

export default withSort;
