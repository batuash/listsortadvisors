import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import faker from "faker";
import { random } from "lodash/fp";

const GENERATE_ITEMS_SIZE = 20;
const GENERATE_ITEMS_DELAY = 1000;

function withInfiniteScroll(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasMoreItems: true, items: [] };
    }

    getRandomItemFromArray = arr => arr[random(0)(arr.length - 1)];

    generateRandomItem = () => ({
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
      status: this.getRandomItemFromArray(["online", "offline"]),
      language: faker.random.locale(),
      reviews: random(0)(1000)
    });

    loadItems = () => {
      const promise = new Promise((resolve, reject) =>
        setTimeout(
          () =>
            resolve(
              new Array(GENERATE_ITEMS_SIZE)
                .fill(null)
                .map(() => this.generateRandomItem())
            ),
          GENERATE_ITEMS_DELAY
        )
      );

      promise.then(items => {
        this.setState({
          items: [...this.state.items, ...items]
        });
      });
    };

    render() {
      return (
        <InfiniteScroll
          loadMore={this.loadItems}
          hasMore={this.state.hasMoreItems}
          threshold={0}
        >
          <WrappedComponent advisors={this.state.items} {...this.props} />
        </InfiniteScroll>
      );
    }
  };
}

export default withInfiniteScroll;
