import React from 'react'
import {ListView, ImageBackground, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import axios from 'axios'

import Row from './Row'
import {openWeatherKey} from '../config/ApiKey'
import {home, list} from './Style'
import { View, Text } from 'native-base';
import Moment from 'moment-timezone'
import 'moment/min/moment-with-locales'

const ct = require('countries-and-timezones');
 
        

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            // title: `Meteo / ${navigation.state.params.city}`
            header: null
        }
    }

    state = {
        city: this.props.navigation.state.params.city,
        report: {},
        dataSource: ds,
        loaded: false
    }

    componentDidMount() {
        this.fetchWeather()
    }

    fetchWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&units=metric&appid=${openWeatherKey}`)
        .then(({data}) => {
            this.setState({
                loaded: true,
                report: data,
                dataSource: ds.cloneWithRows(data.list)
            })
            Moment.locale(data.city.country.toLowerCase())
        })
        .then(() => {
            const mxTimezones = ct.getTimezonesForCountry(this.state.report.city.country);
            console.log(mxTimezones, 'KKKKKKKKKK');
        })
        .catch((error) => {
            this.props.navigation.navigate('Home', {errCity: this.state.city})
        })
    }

    imgWeather = (weatherId) => {
        if (weatherId === 800)
            return require('../images/backgroundImg/clear.jpg')
        else if (weatherId > 800 && weatherId < 805)
            return require('../images/backgroundImg/clouds.jpg')
        else if (weatherId >= 600 && weatherId <= 622)
            return require('../images/backgroundImg/snow.jpg')
        else if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531))
            return require('../images/backgroundImg/rain.jpg')
        else if (weatherId >= 200 && weatherId <= 232)
            return require('../images/backgroundImg/storm.jpg')
        else
            return require('../images/backgroundImg/others.jpg')
    }

    actualWeather = () => {
        const temp = this.state.report.list[0].temp
        const now = Moment().format('HH')
        if (now > 22 || now < 7)
            return Math.round(temp.night)
        else if (now < 12)
            return Math.round(temp.morn)
        else if (now > 18)
            return Math.round(temp.day)
        else
            return Math.round(temp.eve)
    }

    render() {
        // timezoner.getTimeZone(this.state.report.city.lat, this.state.report.city.lon)
        // .then((err, data) => {
        //     console.log(data) /// TRY TO FIND A NPM TO HAVE ACCES TO COUNTRY/CITY CODE TO USE TZ FROM MOMENT TZ
        //     console.log(Moment().tz(data.timeZoneId).format('HH')) ////LOOKING FOR ADD TIME NOW TO KNOW WHICH TEMP CHOOSE ID ITS THE DAY MORNING EVENING OR NIGHT AND PUT IT AFTER THE NAME PF THE CITY AND BEFORE THE STATE OF THE SKY            
        // })
        console.log(this.state.report)

        if (this.state.loaded)
            return (
                <ImageBackground source={this.imgWeather(this.state.report.list[0].weather[0].id)} style={list.background} >    
                    <TouchableHighlight
                        onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Image source={require('../images/return.png')} style={list.return} />
                    </TouchableHighlight>
                    <View>
                        <Text>{this.state.report.city.name}</Text>
                        <Text>{this.actualWeather()}</Text>
                    </View>        
                    <ListView
                        style={{marginTop: 20}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, s, i) => <Row index={parseInt(i, 10)} data={rowData} />}
                    />
                </ImageBackground>
            )
        else
            return (
                <ImageBackground source={require('../images/backgroundImg/home.jpg')} style={list.background} > 
                    <ActivityIndicator color={'#0000ff'} size={'large'}/>
                </ImageBackground>
            )
    } 
}