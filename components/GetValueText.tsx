import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { globalStyles } from "../shared/globalStyles";
import ButtonPrevNext from "./TunnelsButton";
import { router } from "expo-router";
import { VariableType } from "../shared/types/VariableType";

// Type définissant les propriétés attendues par le composant
type ResponseTextType = {
  varText: VariableType
//   {
//     _id: string;
//     label: string;
//     min_length: number;
//     max_length: number;
//     question: string;
//     mandatory: boolean;
//   };
}

// Composant de réponse textuelle
const ResponseText: React.FC<ResponseTextType> = ({ varText }) => {
  console.log(varText, 'varText');

  // State pour suivre la réponse de l'utilisateur
  const [response, setResponse] = React.useState({
    'id': varText._id,
    'label': varText.label,
    'value': ''
  });

  // Fonction appelée lorsqu'il y a un changement dans le TextInput
  const handleChange = (text: string) => {
    // Met à jour la réponse dans le state
    if (text.length <= varText.max_length) {
      setResponse(prev => ({ ...prev, value: text }));
    } else {
      Alert.alert(`La réponse ne peut pas dépasser ${varText.max_length} caractères`);
    }
  };

  return (
    <View>
      <Text style={globalStyles.textLight}>
        {varText.question}
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder={`Saisissez votre réponse ici (max ${varText.max_length} caractères)`}
        value={response.value}
        onChangeText={(text) => handleChange(text)}
        placeholderTextColor={'#ffffff80'}
      />
      <View >
        </View>
      <ButtonPrevNext 
        onPress1={() =>  router.back() }
        onPress2={()=> console.log('suivant')}
        buttonName1="< Précédent"
        buttonName2="Suivant >"
        />  
    </View>
  );
};

export default ResponseText;


