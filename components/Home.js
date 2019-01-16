import React from 'react'
import {TouchableOpacity, TextInput, View, Text, ImageBackground, Image} from 'react-native'
// import {createStackNavigator} from 'react-navigation'
import { Font, AppLoading } from "expo"

import {style} from './Style'

export default class Home extends React.Component {
    static navigationOptions = {
        header: null,
        errCity: '',
    }

    state = {
        search: '',
        fontLoaded: true,
        emptyTxt: false
    }

    async componentWillMount() {
        await Font.loadAsync({
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf')

        })
        this.setState({ fontLoaded: false });
    }

    submit() {
        if (this.state.search) {
            this.setState({search: '', emptyTxt: false})
            this.props.navigation.navigate('List', {city: this.state.search})
        }
        else
            this.setState({emptyTxt: true})
    }

    render() {
        let errMsg = (this.props.navigation.state.params) ? <Text style={[style.home.errMsg, {fontFamily: 'Montserrat-LightItalic'}]}>{`${this.props.navigation.state.params.errCity} isn't a valid city. Please retry`}</Text> : null

        if (this.state.fontLoaded) {
            return (
                <AppLoading />
            );
        }
        else
            return (
                <ImageBackground source={require('../images/backgroundImg/home.jpg')} style={style.home.background} >
                    <View style={style.home.container}>
                        <Text style={style.home.title}>Weather App</Text>
                        <View style={style.home.search}>
                            <Image source={require('../images/iconsWeather/weather.png')} style={style.home.iconWeather} />
                            <TextInput
                                style={[style.home.input, {fontFamily: 'Montserrat-Light'}]}
                                placeholder='Enter the name of a city'
                                placeholderTextColor='#f9f9f9'
                                onChangeText={(search) => this.setState({search})}
                                value={this.state.search}
                                onSubmitEditing={() => this.submit()}
                            />
                        </View>
                        <TouchableOpacity
                            style={style.home.button}
                            onPress={() => {this.submit()}}
                            underlayColor='#fff'>
                            <Text style={[style.home.txtButton, {fontFamily: 'Montserrat-Light'}]}>SEARCH</Text>
                        </TouchableOpacity>
                        {(this.state.emptyTxt) ? <Text style={[style.home.errMsg, {fontFamily: 'Montserrat-LightItalic'}]}>You have to enter a city.</Text> : errMsg}
                    </View>          
                </ImageBackground>
            )
    }
}