import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.about}>A propos :</Text>
                <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut cum est accusamus. Mollitia voluptates repellendus harum! Eius, quasi aliquam odit ad hic, eveniet vel, corrupti delectus provident rem quo explicabo!</Text>
                <Button onPress={() => this.props.navigation.navigate('Home')} title='Go to About screen'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0c0c33',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'red',
      borderWidth: 1
    },
    about: {
        color: '#fff',
        fontSize: 20
    }
});