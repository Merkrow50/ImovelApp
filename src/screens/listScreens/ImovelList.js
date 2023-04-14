import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, View, Text, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ImovelService from "../../services/ImovelService";

const ImovelList = ({navigation, route}) => {

  const [imoveis, setImoveis] = useState(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',() => {
      try {
        ImovelService.findAll().then((values) => {
          console.warn("Sucesso ao listar os imoveis")
          setImoveis(values._array)
        });
      } catch (e) {
        console.warn("Falha ao carregar lista de imoveis " + e)
      }
    })
    return unsubscribe;
  }, [navigation])

  const Item = ({item}) => {
    return <View style={styles.item}>
      <Text style={styles.title}>Tipo: {item.tipo}</Text>
      <Text style={styles.title}>Locador: {item.locador}</Text>
      <Text style={styles.title}>Categoria: {item.categoria}</Text>
      <Text style={styles.title}>Quartos: {item.numQuarto}</Text>
      <Text style={styles.title}>Banheiros: {item.numBanheiro}</Text>
      <Text style={styles.title}>Endereço: {item.endereco}</Text>
      <Text style={styles.title}>Valor do Aluguel: {item.valorAluguel}</Text>
      <Text style={styles.title}>Locado: {item.locado}</Text>
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
