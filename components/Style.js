import {StyleSheet} from 'react-native'

let style = StyleSheet.create({
    homeBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    homeContainer: {
        height: '65%'
    },
    homeTitle: {
        fontFamily: 'Montserrat-Light',
        fontSize: 42,
        color: 'white',
        textAlign: 'center'
    },
    homeSearch: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        marginTop: '30%',
        marginRight: '10%',
        marginLeft: '10%',
        flexDirection: 'row',
        paddingBottom: 7
    },
    homeIconWeather: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    homeInput: {
        fontSize: 17,
        fontStyle: 'italic',
        alignItems: 'flex-end',
        height: 22,
        color: '#fff'
    },
    homeButton: {
        backgroundColor: 'white',
        borderRadius: 2,
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: 15,
        paddingVertical: 8,
    },
    homeTxtButton: {
        color: '#d5aaed',
        fontSize: 17,
        textAlign: 'center'
    },
    homeErrMsg: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10
    },
    listBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    listReturn: {
        width: 32,
        height: 32,
        marginTop: 35,
        marginLeft: 3
    },
    listTitles: {
        color: 'white'
    },
    listFrameTitle: {
        alignItems: 'center',
    },
    listCityTitle: {
        fontSize: 20
    },
    listWeatherTitle: {
        fontSize: 17
    },
    listTempTitle: {
        flexDirection: 'row'
    },
    listNumber: {
        fontSize: 90,
    },
    listCelsius: {
        marginTop: 15,
        fontSize: 32,
        textAlignVertical: 'top'
    },
    rowView: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowDate: {

    },
    rowIcon: {
        
    },
    rowTemp: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    }
})

export default style