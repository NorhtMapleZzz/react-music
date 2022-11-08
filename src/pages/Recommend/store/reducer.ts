import * as actionTypes from './constant';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      // return state.toSet().add()
  }
}