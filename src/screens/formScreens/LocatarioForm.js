import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, StyleSheet, TextInput, View} from "react-native";
import {ImovelSelector} from "../../components/ImovelSelector";
import {Locatario} from "../../models/Locatario";
import LocatarioService from "../../services/LocatarioService";
import ImovelService from "../../services/ImovelService";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const LocatarioForm = ({navigation}) => {

  const [nome, setNome] = useState(null);
  const [CPF, setCPF] = useState(false);
  const [nascimento, setNascimento] = useState(null);
  const [rendaMensal, setRendaMensal] = useState(null);
  const [vencimento, setVencimento] = useState(null);
  const [inicioContrato, setInicioContrato] = useState(null);
  const [fimContrato, setFimContrato] = useState(null);
  const [imovelLocado, setImovelLocado] = useState('');

  const submit = async () => {

    try {
      const locatario = new Locatario(null, nome, CPF, nascimento, rendaMensal, vencimento, inicioContrato, fimContrato, imovelLocado)

      const imovel = await ImovelService.findById(imovelLocado)

      await LocatarioService.addData(locatario)

      imovel.locado = 'Sim'
      imovel.locador = locatario.nome
      await ImovelService.updateById(imovel)
      console.warn("Locador inserido com sucesso id: ", value)
      navigation.navigate("Lista de Locadores")
    }catch (e) {
      console.error("Erro ao inserir locador, ", e)
    }

  }

  return (
    <SafeAreaView styles={{flex: 1}}>
      <View>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={(value) => setNome(value)}
          value={nome}
        />
      </View>
      <View>
        <TextInput
          placeholder="CPF"
          style={styles.input}
          onChangeText={(value) => setCPF(value)}
          value={CPF}
        />
      </View>
      <View>
        <TextInput
          placeholder="Data de Nascimento"
          style={styles.input}
          onChangeText={(value) => setNascimento(value)}
          value={nascimento}
        />
      </View>
      <View>
        <TextInput
          placeholder="rendaMensal"
          style={styles.input}
          onChangeText={(value) => setRendaMensal(value)}
          value={rendaMensal}
        />
      </View>
      <View>
        <TextInput
          placeholder="fimContrato"
          style={styles.input}
          onChangeText={(value) => setInicioContrato(value)}
          value={inicioContrato}
        />
      </View>
      <View>
        <TextInput
          placeholder="fimContrato"
          style={styles.input}
          onChangeText={(value) => setFimContrato(value)}
          value={fimContrato}
        />
      </View>
      <View>
        <TextInput
          placeholder="Valor do Aluguel"
          style={styles.input}
          onChangeText={(value) => setVencimento(value)}
          value={vencimento}
        />
      </View>
      <ImovelSelector initialValue={imovelLocado} setSelectedValue={setImovelLocado}/>
      <Button
        title="Cadastrar"
        onPress={submit}
      />
    </SafeAreaView>
  )
}
