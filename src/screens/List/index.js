import React, { Component } from 'react'
import { Text, View, StatusBar, ActivityIndicator, Image, FlatList } from 'react-native'
import axios from 'axios'
import CardView from 'react-native-cardview'

export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pokemonData: null
        }
    }

    static navigationOptions = {
        title: 'Pokédex',
        // headerStyle: {
        //     backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //     fontWeight: 'bold'
        // },
    };

    getPokemonExtraInfo = async (pokemon, index) => {
        var sprites;
        var types;

        await axios.get(pokemon.url)
            .then((res) => {
                sprites = res.data.sprites
                types = res.data.types
            })

        types = types.sort((a, b) => (a.slot < b.slot ? -1 : 1));

        return {
            sprites: sprites,
            types: types
        }
    }

    async componentDidMount() {
        StatusBar.setBarStyle("light-content");

        var finalPokemonData = []
        let res = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const promises = res.data.results.map(async (pokemon, index) => {
            var pokeImg
            var pokeTypes
            await this.getPokemonExtraInfo(pokemon, index).
                then((info) => {
                    pokeImg = info.sprites
                    pokeTypes = info.types
                })

            finalPokemonData.push(
                {
                    index: index,
                    name: pokemon.name,
                    url: pokemon.url,
                    types: pokeTypes,
                    img: pokeImg
                }
            )
        })

        const results = await Promise.all(promises)

        finalPokemonData = finalPokemonData.sort((a, b) => (a.index < b.index ? -1 : 1));

        this.setState({
            pokemonData: finalPokemonData
        })
    }

    render() {
        return (
            this.state.pokemonData !== null ?
                <View style={{ flex: 1, backgroundColor: "gray" }} forceInset={{ bottom: 'never' }}>
                    <FlatList
                        contentContainerStyle={{ padding: 16 }}
                        contentInset={{ bottom: 32 }}
                        data={this.state.pokemonData}
                        extraData={this.state.forceRefreshList}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => {
                            return (
                                <CardView
                                    style={{ backgroundColor: "white", marginBottom: 16, flexDirection: "row", alignItems: "center", padding: 8 }}
                                    cardElevation={2}
                                    cardMaxElevation={2}
                                    cornerRadius={5}>
                                    <View style={{
                                        borderRadius: 100,
                                        height: 30,
                                        width: 30,
                                        backgroundColor: '#320064',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Text
                                            style={{ color: "#FFF", fontWeight: "bold", fontSize: 12 }}>
                                            {item.index + 1}
                                        </Text>
                                    </View>
                                    <Image
                                        source={{ uri: item.img.front_default }}
                                        style={{ width: 80, height: 80 }} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={{ fontWeight: "700", fontSize: 24, marginBottom: 2, color: "black" }}>
                                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                        </Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {
                                                item.types.map((type, index) => {
                                                    var chipBackgroundColor = "#000"

                                                    switch (type.type.name) {
                                                        case 'grass':
                                                            chipBackgroundColor = "#7bc657"
                                                            break
                                                        case 'poison':
                                                            chipBackgroundColor = "#9f449e"
                                                            break;
                                                        case 'fire':
                                                            chipBackgroundColor = "#ee803b"
                                                            break;
                                                        case 'flying':
                                                            chipBackgroundColor = "#a893ed"
                                                            break;
                                                        case 'water':
                                                            chipBackgroundColor = "#6a92ed"
                                                            break
                                                        case 'bug':
                                                            chipBackgroundColor = "#a8b631"
                                                            break
                                                        case 'normal':
                                                            chipBackgroundColor = "#a8a77a"
                                                            break
                                                    }

                                                    return (
                                                        <View
                                                            style={{
                                                                borderRadius: 100,
                                                                backgroundColor: chipBackgroundColor,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                paddingTop: 2,
                                                                paddingBottom: 2,
                                                                paddingLeft: 6,
                                                                paddingRight: 6,
                                                                marginRight: 4
                                                            }}
                                                            key={index}>
                                                            <Text style={{ fontSize: 10, color: "#FFF" }}>
                                                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                                            </Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </CardView>
                            )
                        }} />
                </View>
                :
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="#c62828" />
                </View>
        )
    }
}
