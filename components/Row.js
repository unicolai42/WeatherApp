import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Moment from 'moment'
import 'moment/locale/fr'
import { Font } from 'expo'

import {style} from './Style'

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
            <View style={style.row.view}>
                <Text style={style.row.date}>{this.date(this.props.data.dt)}</Text>
                <Image style={style.row.icon} source={this.icon(this.props.data.weather[0].main.toLowerCase())} />
                <Text style={style.row.temp}>{Math.round(this.props.data.temp.day)}°C</Text>
            </View>
        )
    }
}