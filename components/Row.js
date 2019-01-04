import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Moment from 'moment'
import 'moment/locale/fr'
import { Font } from 'expo'

Moment.locale('fr')

export default class Row extends React.Component {

    componentDidMount() {
        Font.loadAsync({
            'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
        });
    }

    date = (timestamp) => {
        return `${Moment(timestamp * 1000).format('ddd')} ${Moment(timestamp * 1000).format('DD/MM')}`
    }

    icon = (weather) => {
        switch (weather) {
            case 'sun':
                return require('../images/iconsWeather/sun.png')
                break
            case 'rain':
                return require('../images/iconsWeather/rain.png')
                break
            default:
                return require('../images/iconsWeather/cloud.png')
        }
    }

    render() {
        console.log('okok', this.icon(this.props.data.weather[0].main.toLowerCase()))
        return (
            <View style={style.view}>
                <Text>{this.date(this.props.data.dt)}</Text>
                <Image source={this.icon(this.props.data.weather[0].main.toLowerCase())} />
                <Text style={style.temp}>{Math.round(this.props.data.temp.day)}°C</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    temp: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    }
})