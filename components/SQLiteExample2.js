import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, ScrollView, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

import KeysView from "./KeysView";
import DataView from "./DataView";

const db = openDatabase({name: 'TestDB.db',
  createFromLocation: 1,});

export default function SQLiteExample2() {

  const [key, setKey] = useState(<View />);
  const [todos, setTodos] = useState(<View />);
  const [isAnyData, setIsAnyData] = useState(false);

  useEffect(() => {

    console.log(1)

    db.transaction(function (txn) {

      console.log(2)

      txn.executeSql(
        "SELECT * FROM todolist",
        [],
        function (tx, res) {

          console.log(3)

          let readData = [];

          if(res.rows.length>0){
            setIsAnyData(true);

            setKey(<KeysView data={res.rows.item(0)}/>);

            for(let i=0;i<res.rows.length;i++){
              readData.push(<DataView key={i} data={res.rows.item(i)}/>)
            }

            setTodos(readData);

          }

          console.log(readData);

        }
      );
    })

  }, []);

  console.log(4)

  return (
    <View style={{ flex: 1 }}>

      {
        isAnyData && ( <View>
            {key}
            <ScrollView>
              {todos}
            </ScrollView>
          </View>
        )
      }

    </View>
  );
};

