import { createStackNavigator } from "@react-navigation/stack";
import Riddle from "../screens/Riddle";
import DifficultyMenu from "../screens/DifficultyMenu";
import RiddlesMenu from "../screens/RiddlesMenu";
const Stack = createStackNavigator();

const RiddleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        key={1}
        name="Difficulty_Menu"
        component={DifficultyMenu}
      />
      <Stack.Screen
        key={2}
        name="Riddles_Menu"
        component={RiddlesMenu}
      />
      <Stack.Screen
        key={3}
        name="Riddle"
        component={Riddle}
      />
    </Stack.Navigator>
  );
};

export default RiddleStack;
