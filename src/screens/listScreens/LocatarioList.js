import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, View, Text, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ImovelService from "../../services/ImovelService";
import LocatarioService from "../../services/LocatarioService";

const ImovelList = ({navigation}) => {

  const [locatarios, setLocatarios] = useState(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        LocatarioService.findAll().then((values) => {
          console.warn("Sucesso ao listar os locatários")
          setLocatarios(values._array)
        });
      } catch (e) {
        console.warn("Falha ao carregar lista de locatários " + e)
      }
    })
    return unsubscribe;
  }, [navigation])

  const Item = ({item}) => {
    return <View style={styles.item}>
      <Text style={styles.title}>Nome: {item.nome}</Text>
      <Text style={styles.title}>CPF: {item.cpf}</Text>
      <Text style={styles.title}>Data de Nascimento: {item.data_nascimento}</Text>
      <Text style={styles.title}>Renda Mensal: {item.renda_mensal}</Text>
      <Text style={styles.title}>Data de Vencimento do Aluguel: {item.vencimento_aluguel}</Text>
      <Text style={styles.title}>Inicio do Contrato: {item.inicio_contrato}</Text>
      <Text style={styles.title}>Fim do Contrato: {item.fim_contrato}</Text>
      <Text style={styles.title}>Identificação do Imóvel: {item.id_imovel}</Text>
    </View>
  };

  return <SafeAreaView style={styles.container}>
    <View style={styles.fixToText}>
      <Button
        title="Cadastrar Locatário"
        onPress={() => navigation.navigate('Cadastrar Locatário')}
      />
    </View>
    <FlatList
      data={locatarios}
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
