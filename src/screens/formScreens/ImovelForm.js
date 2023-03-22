import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImovelForm = ({navigation}) => {

  const [endereco, setEndereco] = useState(null);
  const [locado, setLocado] = useState(false);
  const [foto, setFoto] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [valorAluguel, setValorAluguel] = useState(null);
  const [valorCondominio, setValorCondominio] = useState(null);
  const [quartos, setQuartos] = useState(null);
  const [banheiros, setBanheiros] = useState(null);

  const submit = async () => {

    const data = {
      endereco: endereco,
      locado: locado,
      foto: foto,
      tipo: tipo,
      valorAluguel: valorAluguel,
      valorCondominio: valorCondominio,
      quartos: quartos,
      banheiros: banheiros
    }

    await AsyncStorage.getItem("imoveis", (error, result) => {

      const imoveis = JSON.parse(result);

      data.id = imoveis.length + 1

      imoveis.push(data)

      AsyncStorage.setItem("imoveis", JSON.stringify(imoveis))

      navigation.navigate("Lista de Imoveis")
    });

  }

  useEffect(() => {
    console.log(tipo)
  }, [tipo])

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Tipo"
          style={styles.input}
          onChangeText={(value) => setTipo(value)}
          value={tipo}
        />
      </View>
      <View>
        <TextInput
          placeholder="Quartos"
          style={styles.input}
          onChangeText={(value) => setQuartos(value)}
          value={quartos}
        />
      </View>
      <View>
        <TextInput
          placeholder="Banheiros"
          style={styles.input}
          onChangeText={(value) => setBanheiros(value)}
          value={banheiros}
        />
      </View>
      <View>
        <TextInput
          placeholder="Endereço"
          style={styles.input}
          onChangeText={(value) => setEndereco(value)}
          value={endereco}
        />
      </View>
      <View>
        <TextInput
          placeholder="Locado"
          style={styles.input}
          onChangeText={(value) => setLocado(value)}
          value={locado}
        />
      </View>
      <View>
        <TextInput
          placeholder="Valor do Aluguel"
          style={styles.input}
          onChangeText={(value) => setValorAluguel(value)}
          value={valorAluguel}
        />
      </View>
      {tipo === "Apartamento" ? <View>
        <TextInput
          placeholder="Valor Condominio"
          style={styles.input}
          onChangeText={(value) => setValorCondominio(value)}
          value={valorCondominio}
        />
      </View> : <></>}
      <View>
        <TextInput
          placeholder="Foto"
          style={styles.input}
          onChangeText={(value) => setFoto(value)}
          value={foto}
        />
      </View>
      <Button
        title="Cadastrar"
        onPress={submit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ImovelForm;
