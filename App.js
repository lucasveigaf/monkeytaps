import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/home';
import Game from './components/game';
import NewLevel from './components/new-level';
import EndScreen from './components/end-screen';
import LoseScreen from './components/lose-screen';

const RootStack = createStackNavigator(
  {
    Home: Home,
    Game: Game,
    NewLevel: NewLevel,
    EndScreen: EndScreen,
    LoseScreen: LoseScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'black',
      },
    },
    headerLayoutPreset: 'center',
  },
);

const App = createAppContainer(RootStack);

export default App;
