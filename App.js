import React, { useEffect, useState} from 'react';
import { Text, View, FlatList,Image, StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
  textos: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 10,
    paddingLeft:15,
    paddingRight:15
  }
})
                                                                              
export default function fruitScreen({ route }) {
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
  

    const renderItem = ( {item} ) => (
    console.log("--entra en el render", item),
    <View>
      <View style={{alignItems:'center'}}>
        {item.name === "pineapple" ?

            <Image
            style={{width: 150, height:150,marginTop:20}}
            source={require('./assets/piña.png')}/>: null} 
 
            

          
            {item.name === "Strawberry" ?

          
            <Image
            style={{ height: 200, width: 200 ,marginTop:20}}
            source={require('./assets/Fresa.png')}/>: null}
            
          


            {item.name === "Pears" ?

            <Image
            style={{width: 170, height:220,marginTop:20}}
            source={require('./assets/pera.png')}/>: null}
      </View>
          
        <View><Text style={styles.textos}>{item.name}</Text></View>
        <View><Text style={styles.textos}>El precio es: {item.price}</Text></View>
    
      
  </View>
    );

    return(
      
      <View>
          <FlatList
          data={fruits}
          renderItem={renderItem}
          keyExtractor={item => item.id} />
      </View>
      
     
  );

  }