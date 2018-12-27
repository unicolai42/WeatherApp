import React from 'react'
import {Button, TextInput, View, Text} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import { Font, AppLoading } from "expo"


export default class Home extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        search: '',
        fontLoaded: true
    }

    async componentWillMount() {
        await Font.loadAsync({
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf')
        })
        this.setState({ fontLoaded: false });
    }

    submit() {
        this.props.navigation.navigate('List', {city: this.state.search})
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <AppLoading />
            );
        }
        else
            return (
                <View>
                    <Text style={{fontFamily: 'Montserrat-Light', color: 'black', marginTop: 30}}>Weather App</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 30}}
                        placeholder='Enter the name of a city'
                        placeholderTextColor='black'
                        onChangeText={(search) => this.setState({search})}
                        value={this.state.search}
                        onSubmitEditing={() => this.submit()}
                    />
                </View>
            )
    }
}