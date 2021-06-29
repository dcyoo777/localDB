import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({name: 'TestDB.db',
  createFromLocation: 1,});

export default function SQLiteExample2() {

  const [todos, setTodos] = useState('Hello');

  useEffect(() => {

    console.log(1)

    db.transaction(function (txn) {

      console.log(2)

      txn.executeSql(
        "SELECT * FROM todolist",
        [],
        function (tx, res) {

          console.log(3)

          const rows = res.rows;
          let readData = [];

          for(let i=0;i<rows.length;i++){
            readData.push({
              ...rows.item(i)
            })
          }

          setTodos(readData.toString())

          console.log(readData);

        }
      );
    })

  }, []);

  console.log(4)

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Text>
        {todos}
      </Text>

    </SafeAreaView>
  );
};

