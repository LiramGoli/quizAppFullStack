import { createStackNavigator } from "@react-navigation/stack";
import Riddle from "../screens/Riddle";
import DifficultyMenu from "../screens/DifficultyMenu";
import RiddlesMenu from "../screens/RiddlesMenu";

const Stack = createStackNavigator();

const RiddleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={1}
        name="Difficulty_Menu"
        component={DifficultyMenu}
        options={{ title: "Difficulty Menu" }}
      />
      <Stack.Screen
        key={2}
        name="Riddles_Menu"
        component={RiddlesMenu}
        options={{ title: "Riddles Menu" }}
      />
      <Stack.Screen
        key={3}
        name="Riddle"
        component={Riddle}
        options={{ title: "Riddle 1" }}
      />
    </Stack.Navigator>
  );
};

export default RiddleStack;
