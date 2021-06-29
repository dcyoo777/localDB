import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

import SQLiteExample from "./components/SQLiteExample";
import RealmExample from "./components/RealmExample";
import SQLiteExample2 from "./components/SQLiteExample2";

export default function App() {

  const [nav, setNav] = useState(0);
  const [showComponent, setShowComponent] = useState(<SQLiteExample />);

  return (
    <View style={{ flex: 1 }}>

      <View style={{flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: "#aaaaaa"}}>

        <TouchableOpacity
          style={{flex: 1, backgroundColor: nav===0?'#C6C6DA':'#E6E6FA', justifyContent: "center"}}
          onPress={()=>{
            setShowComponent(<SQLiteExample />);
            setNav(0);
          }}
        >
          <Text style={{textAlign: "center", alignItems: "center"}}>
            SQLite1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flex: 1, backgroundColor: nav===1?'#C6C6DA':'#E6E6FA', justifyContent: "center"}}
          onPress={()=>{
            setShowComponent(<SQLiteExample2 />);
            setNav(1);
          }}
        >
          <Text style={{textAlign: "center", alignItems: "center"}}>
            SQLite2
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{flex: 1, backgroundColor: nav===2?'#C6C6DA':'#E6E6FA', justifyContent: "center"}}
          onPress={()=>{
            setShowComponent(<RealmExample />);
            setNav(2);
          }}
        >
          <Text style={{textAlign: "center", alignItems: "center"}}>
            Realm
          </Text>
        </TouchableOpacity>

      </View>

      {showComponent}

    </View>
  );
};
