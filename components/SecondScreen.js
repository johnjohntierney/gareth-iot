import * as React from "react";
import { Alert } from "react-native";
import { Text, View, Button } from "native-base";

function SecondScreen({ route }) {

    const [selectedPost, setSelectedPost] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/atom+xml;type=entry;charset=utf-8',
            'Authorization': 'SharedAccessSignature sr=met-events.servicebus.windows.net&sig=Yuso42BOpx8hTF8iA9doxSwmc6wppl%2FivOTqdcqnaLk%3D&se=1638980611&skn=send',
            'Host': 'met-events.servicebus.windows.net'
          },
          body: JSON.stringify(data)
        });
        return response;
    }

    let onPressOne = () => {
        Alert.alert("You have clicked button 1")

        postData('https://met-events.servicebus.windows.net/nightclass/messages', { name: 'Gareth Preston' })
            .then(data => {
                if(data.ok) {
                    console.log('Status : ' + data.status);
                    setStatus(data.status)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    let onPressTwo = () => {
        Alert.alert("You have clicked button 2")

        fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
            .then(data => {
                if(data.ok) {
                    data.json()
                    .then(data => {
                        console.log('Body : ', data[0]);
                        setSelectedPost(data[0])
                    });
                    
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View>
            <Button onPress={ onPressOne }>Fetch Data One {status}</Button>
            <Button onPress={ onPressTwo }>Fetch Data Two {selectedPost}</Button>
        </View>
    );
}

export default SecondScreen;