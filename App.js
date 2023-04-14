import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImovelList from "./src/screens/listScreens/ImovelList";
import ImovelForm from "./src/screens/formScreens/ImovelForm";
import {useEffect} from "react";
import DatabaseInit from "./src/database/DatabaseInit";
import {LocatarioForm} from "./src/screens/formScreens/LocatarioForm";
import LocatarioList from "./src/screens/listScreens/LocatarioList";
import {HomeScreen} from "./src/screens/HomeScreen";


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    new DatabaseInit()
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Cadastrar Locatário" component={LocatarioForm} />
        <Stack.Screen name="Lista de Imoveis" component={ImovelList} />
        <Stack.Screen name="Cadastrar Imóvel" component={ImovelForm} />
        <Stack.Screen name="Lista de Locadores" component={LocatarioList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
