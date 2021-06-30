import React, { useState, useEffect } from 'react';

import {SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

import KeysView from "./KeysView";
import DataView from "./DataView";

const db = openDatabase({ name: 'SchoolDatabase.db'});

export default function SQLiteExample() {

  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState('');
  const [id, setId] = useState('');

  const [isAnyData, setIsAnyData] = useState(false);
  const [key, setKey] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='TestTable'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS TestTable', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS TestTable(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), phone INT(15), address VARCHAR(255))',
              []
            );
          }
        }
      );
    })

    viewData() ;

  }, []);

  const insertData = () => {

    if(Name!=='' && Phone!=='' && Address!==''){
      db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO TestTable (name, phone, address) VALUES (?,?,?)',
            [Name, Phone, Address],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            }
        );
      });

      setName('');
      setPhone('');
      setAddress('');

      viewData() ;
    }

  }

  const deleteData = () => {

    if(id!==''){
      db.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM TestTable WHERE id = ?',
            [id],
            (tx, results) => {

              if (results.rowsAffected > 0) {
                Alert.alert('Data Deleted Successfully....');
              } else Alert.alert('Failed....');
            }
        );
      });

      setId('');

      viewData() ;
    }

  }

  const modifyData = () => {

    if(id!=='' && Address!==''){
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE TestTable SET address = ? WHERE id = ?;',
          [Address, id],
          (tx, results) => {

            if (results.rowsAffected > 0) {
              Alert.alert('Data Modified Successfully....');
            } else Alert.alert('Failed....');
          }
        );
      });

      setId('');
      setAddress('');

      viewData() ;
    }

  }

  const viewData = () => {

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM TestTable',
        [],
        (tx, results) => {
          let temp = [];

          if (results.rows.length > 0){
            setIsAnyData(true);

            for (let i = 0; i < results.rows.length; ++i)
              temp.push(<DataView data={results.rows.item(i)}/>);
            setData(temp);
            setKey(<KeysView data={results.rows.item(0)} />);
          }


        }
      );
    });

  }

  return (
    <View style={{ flex: 1}}>

      {
        isAnyData && ( <View style={styles.table}>
              {key}
              <ScrollView>
                {data}
              </ScrollView>
            </View>
        )
      }

      <View style={styles.mainContainer}>

        <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
          Test SQLite Database
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setName(text)
          }
          placeholder="Enter Name"
          value={Name} />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setPhone(text)
          }
          placeholder="Enter Phone Number"
          keyboardType={'numeric'}
          value={Phone} />

        <TextInput
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          onChangeText={
            (text) => setAddress(text)
          }
          placeholder="Enter Address"
          value={Address} />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={insertData}>
          <Text style={styles.touchableOpacityText}> Insert </Text>
        </TouchableOpacity>

        <TextInput
            style={[styles.textInputStyle, { marginBottom: 20 }]}
            onChangeText={
              (text) => setId(text)
            }
            placeholder="Enter Id"
            value={id} />

        <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={deleteData}>
          <Text style={styles.touchableOpacityText}> Delete </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={modifyData}>
          <Text style={styles.touchableOpacityText}> Modify Address </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: '#0091EA',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    width: '100%'
  },

  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    padding: 8
  },

  textInputStyle: {
    height: 45,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },

  table: {
    maxHeight: 200,
  }
});
