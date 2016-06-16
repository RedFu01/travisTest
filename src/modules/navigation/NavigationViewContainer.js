import {connect} from 'react-redux';
//import {popRoute} from './NavigationState';
import NavigationView from './NavigationView';
import {navigatePop, navigatePush} from './NavigationState';
import {NavigationExperimental as Navigation} from 'react-native'

const {
	Transitioner: NavigationTransitioner,
	Card: NavigationCard,
	Header: NavigationHeader,
} = Navigation;

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => ({
    onNavigate: (action) => {
			// Two types of actions are likely to be passed, both representing "back"
			// style actions. Check if a type has been indicated, and try to match it.
console.log(NavigationCard)
      if (action.type && (
				action.type === 'BackAction' ||
				action.type === NavigationCard.CardStackPanResponder.Actions.BACK.type)
			) {
				dispatch(navigatePop())
			} else {
				// Currently unused by NavigationExperimental (only passes back actions),
				// but could potentially be used by custom components.
				dispatch(navigatePush(action))
			}
		}
  })
)(NavigationView);
