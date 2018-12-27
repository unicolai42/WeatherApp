import React from 'react'
import {ListView, Text, ActivityIndicator} from 'react-native'
import axios from 'axios'

import Row from './Row'
import {openWeatherKey} from '../config/ApiKey'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Meteo / ${navigation.state.params.city}`
        }
    }

    state = {
        city: this.props.navigation.state.params.city,
        report: {},
        dataSource: ds
    }

    componentDidMount() {
        this.fetchWeather()
    }

    fetchWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&units=metric&appid=${openWeatherKey}`)
        .then(({data}) => {
            this.setState({
                report: data,
                dataSource: ds.cloneWithRows(data.list)
            })
        })
        .then(() => {
            console.log('report', this.state.report)
        })
    }


    render() {
        if (this.state.report === null)
            return (
                <ActivityIndicator color={'#0000ff'} size={'large'}/>
            )
        else
            return (
                <ListView
                    style={{marginTop: 20}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, s, i) => <Row index={parseInt(i, 10)} data={rowData} />}
                />
            )
    } 
}