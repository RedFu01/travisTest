import {fromJS} from 'immutable';
import {NavigationExperimental as Navigation} from 'react-native'

const NAV_PUSH = 'NAV/PUSH';
const NAV_PUSH_ONE_WAY = 'NAV/PUSH_ONE_WAY';
const NAV_POP = 'NAV/POP';
const NAV_JUMP_TO_KEY = 'NAV/JUMP_TO_KEY'
const NAV_JUMP_TO_INDEX = 'NAV/JUMP_TO_INDEX'
const NAV_RESET = 'NAV/RESET'
const initialNavState = fromJS({
	index: 0,
	key:'Main',
	children:[
		{ key: 'Search', title: 'HAPPYCAR' }
	]
})

export function navigateOnewayPush(state){
	state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: NAV_PUSH_ONE_WAY,
		state
	}
}

export function navigatePush(state) {
	state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: NAV_PUSH,
		state
	}
}
export function navigatePop() {
	return {
		type: NAV_POP
	}
}

export default function NavigationReducer(state = initialNavState, action) {
	//state = state.toJS()
	switch (action.type) {

	case NAV_PUSH_ONE_WAY:
		if (state.toJS().children[state.toJS().index].key === (action.state && action.state.key)) return state
		return fromJS(Navigation.StateUtils.push(Navigation.StateUtils.pop(state.toJS()), action.state))

	case NAV_PUSH:
		if (state.toJS().children[state.toJS().index].key === (action.state && action.state.key)) return state
		return fromJS(Navigation.StateUtils.push(state.toJS(), action.state))

	case NAV_POP:
		if (state.toJS().index === 0 || state.toJS().children.length === 1) return state
		return fromJS(Navigation.StateUtils.pop(state.toJS()))

	case NAV_JUMP_TO_KEY:
		return Navigation.StateUtils.jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return Navigation.StateUtils.jumpToIndex(state, action.index)

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			routes: action.routes
		}

	default:
		return state
	}
}
