import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, View, Text, StyleSheet, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from "react-native-safe-area-context";

const ImovelList = ({navigation}) => {

  const [imoveis, setImoveis] = useState(null)

  useEffect(() => {
    try {
      AsyncStorage.getItem("imoveis", (error, result) => {
        console.log(result)
        setImoveis(JSON.parse(result))
      });

    } catch (e) {
      console.error(e)
    }
  }, [])

  const Item = ({item}) => {
    return <View style={styles.item}>
      <Text style={styles.title}>Tipo: {item.tipo}</Text>
      <Text style={styles.title}>Quartos: {item.quartos}</Text>
      <Text style={styles.title}>Banheiros: {item.banheiros}</Text>
      <Text style={styles.title}>Endereço: {item.endereco}</Text>
      <Text style={styles.title}>Valor do Aluguel: {item.valorAluguel}</Text>
      {item.tipo === "Apartamento" ? <Text style={styles.title}>Valor do Condominio: {item.valorCondominio}</Text> : false}
      <Image
        style={{width: 300, height: 150, margin: 15}}
        source={{
          uri: item.foto,
        }}
      />
    </View>
  };

  return <SafeAreaView style={styles.container}>
    <View style={styles.fixToText}>
      <Button
        title="Cadastrar Imovel"
        onPress={() => navigation.navigate('Cadastrar Imóvel')}
      />
    </View>
    <FlatList
      data={imoveis}
      renderItem={({item}) => <Item item={item}/>}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: '#4d4d4d',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default ImovelList;
