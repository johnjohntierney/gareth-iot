import * as React from "react";
import { Text, View, Button, Input } from "native-base";
import { Client, Message } from 'react-native-paho-mqtt';

// 192.168.0.221:9001

function DeviceScreen({ route, navigation }) {
  const { hubAddress } = route.params;

  const [data, setData] = React.useState(null); 

  console.log('Address:'+hubAddress);

  //Set up an in-memory alternative to global localStorage
  const myStorage = {
      setItem: (key, item) => {
          myStorage[key] = item;
      },
      getItem: (key) => myStorage[key],
      removeItem: (key) => {
          delete myStorage[key];
      },
  };

  const client = new Client({ uri: 'ws://' + hubAddress + '/', clientId: 'clientId', storage: myStorage });
  client.on('connectionLost', (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log(responseObject.errorMessage);
    }
  });
  client.on('messageReceived', (message) => {
    // setData(message.payloadString)

    let json = JSON.parse(message.payloadString);
    for(let i = 0; i < json.length; i++) {
      if(json[i].definition != null)
        console.log(json[i].definition);
    }
  });

  // connect the client
  client.connect()
    .then(() => {
        // console.log('onConnect');
        return client.subscribe('zigbee2mqtt/bridge/devices');
    })
    .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
        }
    });

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter the host address of the MQTT Hub below.</Text>
      </View>
    );
  }

  export default DeviceScreen;