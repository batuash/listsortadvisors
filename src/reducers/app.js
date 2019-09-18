// @flow

type State = {
	message: string
};

type Action = {
	type: string,
	[string]: any
};

const initialState: State = {
  message: 'hello world'
};

export { initialState };

const app = (state: State = initialState, { type, ...payload }: Action) => {
  switch (type) {
    default:
      return state;
  }
};

export default app;
