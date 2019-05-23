import { createStackNavigator, createAppContainer } from 'react-navigation'
import List from './screens/List'
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

class PokédexToolbar extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{ uri: 'http://pngimg.com/uploads/pokeball/pokeball_PNG24.png' }}
                    style={{ width: 30, height: 30 }}
                />
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 20, marginLeft: 4 }}>Pokédex</Text>
            </View>
        );
    }
}

const MainNavigation = createStackNavigator({
    List
}, {
        initialRouteName: 'List',
        defaultNavigationOptions: {
            headerTitle: <PokédexToolbar />,
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
            headerStyle: {
                backgroundColor: '#c62828',
            },
        }
    })

export default createAppContainer(MainNavigation)