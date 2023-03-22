import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImovelList from "./src/screens/listScreens/ImovelList";
import ImovelForm from "./src/screens/formScreens/ImovelForm";
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {
  const imoveis = [
    {
      id: "1",
      endereco: "Rua tananan",
      tipo: "Casa",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvtqkzTq_ttHVEAf8ZTKfRLQYdotcMUVgCA&usqp=CAU",
      valorAluguel: 1200,
      valorCondominio: 800,
      quartos: 4,
      banheiros: 2,
      locado: true
    },
    {
      id: "2",
      endereco: "Rua tananan",
      tipo: "Apartamento",
      foto: "https://www.estilofontana.com.br/blog/wp-content/uploads/2018/09/apartamentos-construtora-fontana.png",
      valorAluguel: 1200,
      valorCondominio: 800,
      quartos: 4,
      banheiros: 2,
      locado: true
    },
    {
      id: "3",
      endereco: "Rua tananan",
      tipo: "Casa",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvtqkzTq_ttHVEAf8ZTKfRLQYdotcMUVgCA&usqp=CAU",
      valorAluguel: 1200,
      valorCondominio: 800,
      quartos: 4,
      banheiros: 2,
      locado: true
    }
  ]

  useEffect(async () => {
    await AsyncStorage.setItem("imoveis", JSON.stringify(imoveis))
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de Imoveis" component={ImovelList} />
        <Stack.Screen name="Cadastrar Imóvel" component={ImovelForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
