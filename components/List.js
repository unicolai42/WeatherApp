import React from 'react'
import {ListView, ImageBackground, TouchableHighlight, Image, ActivityIndicator} from 'react-native'
import axios from 'axios'

import Row from './Row'
import {openWeatherKey} from '../config/ApiKey'
import {home, list} from './Style'


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

    fetchWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&units=metric&appid=${openWeatherKey}`)
        .then(({data}) => {
            console.log('data', data)
            this.setState({
                loaded: true,
                report: data,
                dataSource: ds.cloneWithRows(data.list)
            })
        })
        .then(() => {
            console.log('report', this.state.report)
        })
        .catch((error) => {
            this.props.navigation.navigate('Home', {errCity: this.state.city})
        })
    }


    render() {
        if (this.state.loaded)
            return (
                <ImageBackground source={require('../images/home.jpg')} style={home.image} >    
                    <TouchableHighlight
                        onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Image source={require('../images/return.png')} style={list.return} />
                    </TouchableHighlight>            
                    <ListView
                        style={{marginTop: 20}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, s, i) => <Row index={parseInt(i, 10)} data={rowData} />}
                    />
                </ImageBackground>
            )
        else
            return (
                <ActivityIndicator color={'#0000ff'} size={'large'}/>
            )
    } 
}