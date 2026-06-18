import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ImageBackground } from 'react-native';
import axios from 'axios'

export default function App() {
  const [characters, setCharacters] = useState([])

  async function fetchCharacters() {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character')
      setCharacters(response.data.results)
      console.log(response.data)
    } catch (error) {
      console.log('Erro ao buscar personagens')
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])
  
  return (
    <View style={styles.container}>
      <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}} source={require('./images/portal-rickandmorty.jpg')}>
      <Text style={{fontSize: 50, padding: 10, marginTop: 20, color: '#05a61dff', fontWeight: 800, textAlign: 'center'}}>Rick and Morty</Text>
      <FlatList 
      data={characters}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image 
          source={{uri: item.image}}
          style={{width: 200, height: 200, borderRadius: 10, margin: 10}}/>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={{fontWeight: 700, color: '#00abc9ff', fontSize: 18}}>Status: {item.status}</Text>
          <Text style={{color: '#fff', fontSize: 16}}>Specie: {item.species}</Text>
          <Text style={{color: '#fff', fontSize: 16}}>Gender: {item.gender}</Text>
          </View>
      )}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020A17',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A2738',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#00f5d9ff',
    borderWidth: 4
  },

  text: {
    color: '#00ff6aff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
