import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({
  textos: {
    textAlign: "center",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  textinput: {
    height: 40,
    width: 225,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20
  }
})

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#A1F45D',
        inactiveBackgroundColor: '#CFF0B4',
      }}

      screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen
        name="Fruteria Paco"
        component={fruitScreen}
        options={{ headerStyle: { backgroundColor: '#A1F45D' } }}
      />
      <Tab.Screen
        name="Añadir Fruta"
        component={addScreen}
        options={{ headerStyle: { backgroundColor: '#A1F45D' } }}
      />
    </Tab.Navigator>

  );

}

function addStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#28FF06',
        inactiveBackgroundColor: '#91EF83',
      }}

      screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen
        name="Principal"
        component={fruitScreen}
        options={{ headerStyle: { backgroundColor: '#28FF06' } }}
      />
      <Tab.Screen
        name="Secundaria"
        component={addScreen}
        options={{ headerStyle: { backgroundColor: '#28FF06' } }}
      />
    </Tab.Navigator>

  );

}

function fruitScreen({ route }) {
  const [fruits, setFruits] = useState(null);


  useEffect(() => {
    fetch("http://10.0.2.2:8080/fruits")
      .then(reponse => reponse.json())
      .then((reponseJson) => {


        console.log('getting data from fetch', reponseJson);
        setFruits(reponseJson);

      })
      .catch(error => console.log(error));
  }, [])


  const renderItem = ({ item }) => (
    console.log("--entra en el render", item),

    <ScrollView>
      <View>
        <View style={{ alignItems: 'center' }}>
          {item.name === "Piña" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/piña.png')} /> : null}




          {item.name === "Melocoton" ?


            <Image
              style={{ height: 200, width: 200, marginTop: 20 }}
              source={require('./assets/Fresa.png')} /> : null}




          {item.name === "Peras" ?

            <Image
              style={{ width: 170, height: 220, marginTop: 20 }}
              source={require('./assets/pera.png')} /> : null}

          {item.name === "Manzana" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/manzana.png')} /> : null}

          {item.name === "Uvas" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/uvas.png')} /> : null}

          {item.name === "Naranja" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/naranja.png')} /> : null}

          {item.name === "Kiwi" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/kiwi.png')} /> : null}

          {item.name === "Platano" ?

            <Image
              style={{ width: 150, height: 150, marginTop: 20 }}
              source={require('./assets/platano.png')} /> : null}
        </View>

        <View><Text style={styles.textos}>{item.name}</Text></View>
        <View><Text style={styles.textos}>El precio es: {item.price}</Text></View>
        <View
          style={{
            borderBottomColor: 'blue',
            borderBottomWidth: 1,
            padding: 10
          }}
        />




      </View>
    </ScrollView>

  );

  return (

    <View>
      <FlatList
        data={fruits}
        renderItem={renderItem}
        keyExtractor={item => item.id} />
    </View>


  );

}

function addScreen() {

  const [fruits, setFruits] = React.useState('');
  const [price, setPrice] = React.useState(null);



  const onPress = () => {
    fetch("http://10.0.2.2:8080/fruits", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": fruits,
        "price": price

      })
    })
  }

  return (

    <View style={{ alignItems: 'center' }}>

      <Text style={styles.textos}>¿Qué fruta quieres añadir?</Text>

      <TextInput
        placeholder="Escribe el la fruta a añadir"
        onChangeText={(x) => setFruits(x)}
        keyboardType="default"
        style={styles.textinput} />
      <TextInput
        placeholder="Escribe el precio de la fruta a añadir"
        onChangeText={(y) => setPrice(y)}
        keyboardType="numeric"
        style={styles.textinput} />

      <Button
        title="Buscar"
        color="#0015FF"
        onPress={onPress}

      />


    </View>

  );

}



export default function App() {


  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="Fruteria Paco" component={HomeStack} options={{ headerShown: false }} />
        <Stack.Screen name="Añadir" component={addStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}

