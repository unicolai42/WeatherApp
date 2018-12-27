import React from 'react'
import {Button, TextInput, View, Text, ImageBackground} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import { Font, AppLoading } from "expo"

import {home} from './Style'

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
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf')

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
                <ImageBackground source={require('../images/home.jpg')} style={home.image} >
                    <View style={home.view}>
                        <Text style={home.title}>Weather App</Text> 
                        <TextInput
                            style={[home.input, (this.state.search) ? {fontFamily: 'Montserrat-Light'} : {fontFamily: 'Montserrat-LightItalic'}]}
                            placeholder='Enter the name of a city'
                            placeholderTextColor='black'
                            onChangeText={(search) => this.setState({search})}
                            value={this.state.search}
                            onSubmitEditing={() => this.submit()}
                        />
                        <Button
                            style={home.button}
                            onPress={() => {this.submit()}}
                            title="START"
                        />
                    </View>          
                </ImageBackground>
            )
    }
}