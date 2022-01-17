import React, { useEffect, useState} from 'react';
import { Text, View, FlatList  } from 'react-native';

                                                                              
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
        <View>
            <Text>{item.name}</Text>
        </View>
        <View>
            <Text>{item.price}</Text>
        </View>
        <Text>{item.id}</Text>
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