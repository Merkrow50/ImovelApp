import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Dropdown from 'react-native-input-select';
import ImovelService from "../services/ImovelService";

export const ImovelSelector = ({initialValue, setSelectedValue}) => {
  const [imoveis, setImoveis] = useState(null)

  const filterByCategoria = (values) => {
    return values.filter((x) => x.categoria === 'Aluguel' && x.locado !== "Sim")
  }

  useEffect(() => {
    try {
      ImovelService.findAll().then((values) => {
        console.log(values)
        setImoveis(filterByCategoria(values._array))
      });
    } catch (e) {
      console.warn("Falha ao carregar lista de imoveis " + e)
    }
  }, [])

  return <View>
    <Dropdown
      searchInputStyle={styles.input}
      checkboxStyle={{backgroundColor: 'blue', borderRadius: 0, padding: 0}}
      label="Imovel"
      placeholder="Selecione um imovel..."
      options={imoveis}
      optionLabel={'id'}
      optionValue={'id'}
      selectedValue={initialValue}
      onValueChange={(value) => setSelectedValue(value)}
      primaryColor={'green'}
    />
  </View>
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 12,
    borderRadius: 0,
    padding: 10,
  }
});
