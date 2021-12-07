import * as React from "react";
import { Text, View, Button } from "native-base";

function HomeScreen({ navigation }) {

  let onPress = () => {
    navigation.navigate('OtherScreen')
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button onPress={ onPress }>Go to second screen</Button>
      </View>
    );
  }

  export default HomeScreen;