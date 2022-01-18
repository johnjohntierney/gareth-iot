import * as React from "react";
import { Text, View, Button, Input } from "native-base";

function HomeScreen({ navigation }) {
  const [hubAddress, setHubAddress] = React.useState(null);

  // 192.168.0.221:9001

  let onPress = () => {
    navigation.navigate('Devices', { hubAddress })
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter the host address of the MQTT Hub below.</Text>
        <Input size="md" onChangeText={address => setHubAddress(address)} />
        <Button onPress={ onPress }>Display list of devices</Button>
      </View>
    );
  }

  export default HomeScreen;