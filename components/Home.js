import React from 'react'
import {TouchableOpacity, TextInput, View, Text, ImageBackground, Image} from 'react-native'
// import {createStackNavigator} from 'react-navigation'
import { Font, AppLoading } from "expo"

import {home} from './Style'

export default class Home extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        search: '',
        fontLoaded: true,
        errMsg: false
    }

    async componentWillMount() {
        await Font.loadAsync({
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf')

        })
        this.setState({ fontLoaded: false });
    }

    submit() {
        if (this.state.search)
            this.props.navigation.navigate('List', {city: this.state.search})
        else
            this.setState({errMsg: true})
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
                    <View style={home.container}>
                        <Text style={home.title}>Weather App</Text>
                        <View style={home.search}>
                            <Image source={require('../images/weather.png')} style={home.iconWeather} />
                            <TextInput
                                style={[home.input, {fontFamily: 'Montserrat-Light'}]}
                                placeholder='Enter the name of a city'
                                placeholderTextColor='#f9f9f9'
                                onChangeText={(search) => this.setState({search})}
                                value={this.state.search}
                                onSubmitEditing={() => this.submit()}
                            />
                        </View>
                        <TouchableOpacity
                            style={home.button}
                            onPress={() => {this.submit()}}
                            underlayColor='#fff'>
                            <Text style={[home.txtButton, {fontFamily: 'Montserrat-Light'}]}>SEARCH</Text>
                        </TouchableOpacity>
                    </View>          
                </ImageBackground>
            )
    }
}