import React from 'react'
import {ListView, ImageBackground, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import axios from 'axios'
import { Font, AppLoading } from "expo"

import Row from './Row'
import {openWeatherKey} from '../config/ApiKey'
import style from './Style'
import { View, Text } from 'native-base'

 
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
        loaded: false,
        fontLoaded: true
    }

    async componentWillMount() {
        await Font.loadAsync({
          'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
          'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf')
        })
        this.setState({ fontLoaded: false });
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
        })
        .catch((error) => {
            console.log(error)
            this.props.navigation.navigate('Home', {errCity: this.state.city})
        })
    }

    imgWeather = (weatherId) => {
        console.log(this.state.report.list[0].weather[0].main, 'state weather')
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
    let mxTimezones = ct.getTimezonesForCountry(this.state.report.city.country);
        const tz = new Date()
        let timezoneZero = tz.getHours() - tz.getTimezoneOffset() / 60 * -1

        if (timezoneZero < 0) {
            timezoneZero += 24
        }

        const hour = timezoneZero + Math.round(mxTimezones[0].utcOffset / 60)

        console.log(hour)
        if (hour > 22 || hour < 7)
            return Math.round(temp.night)
        else if (hour < 12)
            return Math.round(temp.morn)
        else if (hour > 18)
            return Math.round(temp.day)
        else
            return Math.round(temp.eve)
    }

    render() {
        if (this.state.loaded && !this.state.fontLoaded)
            return (
                <ImageBackground source={this.imgWeather(this.state.report.list[0].weather[0].id)} style={style.list.Background} >    
                    <TouchableHighlight
                        onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Image source={require('../images/return.png')} style={style.list.eturn} />
                    </TouchableHighlight>
                    <View style={style.listFrameTitle}>
                        <Text style={[style.listTitles, {fontFamily: 'Montserrat-Regular'}, style.listCityTitle]}>{this.state.report.city.name}</Text>
                        <Text style={[style.listTitles, {fontFamily: 'Montserrat-Light'}, style.listWeatherTitle]}>{this.state.report.list[0].weather[0].main}</Text>
                        <View style={[style.listTitles, {fontFamily: 'Montserrat-Light'}, style.listTempTitle]}>
                            <Text style={[style.listTitles, {fontFamily: 'Montserrat-ExtraLight'}, style.listNumber]}>{this.actualWeather()}</Text>
                            <Text style={[style.listTitles, {fontFamily: 'Montserrat-Light'}, style.listCelsius]}>°</Text>
                        </View>
                    </View>        
                    <ListView
                        style={{marginTop: 150, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, s, i) => <Row index={parseInt(i, 10)} data={rowData} />}
                    />
                </ImageBackground>
            )
        else
            return (
                <ImageBackground source={require('../images/backgroundImg/home.jpg')} style={style.listBackground} > 
                    <ActivityIndicator color={'#0000ff'} size={'large'}/>
                </ImageBackground>
            )
    } 
}