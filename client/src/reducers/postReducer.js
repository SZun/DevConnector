import { ADD_POST, GET_POST, POST_LOADING } from '../actions/types';

const intialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
