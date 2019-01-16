import {StyleSheet} from 'react-native'

let style = StyleSheet.create({
    home: {
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
        },
        container: {
            height: '65%'
        },
        title: {
            fontFamily: 'Montserrat-Light',
            fontSize: 42,
            color: 'white',
            textAlign: 'center'
        },
        search: {
            borderBottomColor: '#e0e0e0',
            borderBottomWidth: 1,
            marginTop: '30%',
            marginRight: '10%',
            marginLeft: '10%',
            flexDirection: 'row',
            paddingBottom: 7
        },
        iconWeather: {
            width: 22,
            height: 22,
            marginRight: 10
        },
        input: {
            fontSize: 17,
            fontStyle: 'italic',
            alignItems: 'flex-end',
            height: 22,
            color: '#fff'
        },
        button: {
            backgroundColor: 'white',
            borderRadius: 2,
            marginRight: '10%',
            marginLeft: '10%',
            marginTop: 15,
            paddingVertical: 8,
        },
        txtButton: {
            color: '#d5aaed',
            fontSize: 17,
            textAlign: 'center'
        },
        errMsg: {
            color: 'red',
            textAlign: 'center',
            marginTop: 10
        }
    },
    list: {
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
        },
        return: {
            width: 32,
            height: 32,
            marginTop: 35,
            marginLeft: 3
        },
        titles: {
            color: 'white'
        },
        frameTitle: {
            alignItems: 'center',
        },
        cityTitle: {
            fontSize: 20
        },
        weatherTitle: {
            fontSize: 17
        },
        tempTitle: {
            flexDirection: 'row'
        },
        number: {
            fontSize: 90,
        },
        celsius: {
            marginTop: 15,
            fontSize: 32,
            textAlignVertical: 'top'
        }
    },
    row: {
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
        date: {

        },
        icon: {
            
        },
        temp: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22
        }
    }
})

export default style