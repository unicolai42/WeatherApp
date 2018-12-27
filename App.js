import { createStackNavigator, createAppContainer } from 'react-navigation'

import About from './components/About'
import Home from './components/Home'
import List from './components/List'

// class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator/>
//     );
//   }
// }

const AppStackNavigator =  createStackNavigator({
  Home: Home,
  About: About,
  List: List
});

export default createAppContainer(AppStackNavigator)