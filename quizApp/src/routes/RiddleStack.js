import { createStackNavigator } from "@react-navigation/stack";
import Riddle from "../screens/Riddle";
import DifficultyMenu from "../screens/DifficultyMenu";
import RiddlesMenu from "../screens/RiddlesMenu";
import LottieView from "lottie-react-native";
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
        // options={{
        //   title: "Difficulty Menu",
        //   headerStyle: {
        //     backgroundColor: "transparent",
        //   },
        // }}
      />
      <Stack.Screen
        key={2}
        name="Riddles_Menu"
        component={RiddlesMenu}
        // options={{
        //   title: "Riddles Menu",
        //   headerStyle: {
        //     backgroundColor: "transparent",
        //   },
        // }}
      />
      <Stack.Screen
        key={3}
        name="Riddle"
        component={Riddle}
        // options={{ title: "Riddle 1" }}
      />
    </Stack.Navigator>
  );
};

export default RiddleStack;
