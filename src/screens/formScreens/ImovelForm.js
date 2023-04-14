import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ImovelService from "../../services/ImovelService";
import {Imovel} from "../../models/Imovel";

const ImovelForm = ({navigation}) => {

  const [categoria, setCategoria] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [locado, setLocado] = useState(false);
  const [foto, setFoto] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [valorAluguel, setValorAluguel] = useState(null);
  const [valorCondominio, setValorCondominio] = useState(null);
  const [numQuarto, setnumQuarto] = useState(null);
  const [numBanheiro, setnumBanheiro] = useState(null);

  const submit = async () => {
    const imovel = new Imovel(null, "Nao Locado", categoria, endereco, locado, foto, tipo, valorAluguel, valorCondominio, numQuarto, numBanheiro)
    await ImovelService.addData(imovel)
    .then((value) => {
      console.warn("Imovel inserido com sucesso id: ", value)
      navigation.navigate("Lista de Imoveis")
      }).catch((reason) => {
      console.error("Erro ao inserir imovel, ", reason)
    })

  }

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
          placeholder="numQuarto"
          style={styles.input}
          onChangeText={(value) => setnumQuarto(value)}
          value={numQuarto}
        />
      </View>
      <View>
        <TextInput
          placeholder="Categoria"
          style={styles.input}
          onChangeText={(value) => setCategoria(value)}
          value={categoria}
        />
      </View>
      <View>
        <TextInput
          placeholder="numBanheiro"
          style={styles.input}
          onChangeText={(value) => setnumBanheiro(value)}
          value={numBanheiro}
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
