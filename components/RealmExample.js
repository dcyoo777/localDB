import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView } from "react-native";

import Realm from 'realm';
import DataView from "./DataView";
import KeysView from "./KeysView";

const PersonSchema = {
  name: "Person",
  properties: {
    _id: "int",
    name: "string",
    phone: "string?",
    address: "string",
  },
  primaryKey: "_id",
};

const realm = new Realm({
    path: "myRealm2",
    schema: [PersonSchema],
    encryptionKey: new Int8Array(64),
})

export default function RealmExample() {

  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState('');
  const [Id, setId] = useState('');

  const [isAnyData, setIsAnyData] = useState(false);
  const [key, setKey] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {

    viewData() ;
    console.log(new Int8Array(64));

  }, []);

  const insertData = async () => {

    if (Name !== '' && Phone !== '' && Address !== '') {

      const res = realm.objects("Person");

      let nextId = 0;
      if (data.length > 0){
        nextId = res[res.length - 1]._id + 1;
      }

      realm.write(async () => {
        await realm.create("Person", {
          _id: nextId,
          name: Name,
          phone: Phone,
          address: Address,
        });
      });

      setName('');
      setPhone('');
      setAddress('');

      viewData();

    }
  }

  const deleteData = () => {

    if(Id!==''){

      const res = realm.objects("Person");

      const deleteData = res.find(data => data._id === parseInt(Id))

      realm.write(async () => {
        await realm.delete(deleteData);
      });

      setId('');

      viewData() ;
    }

  }

  const modifyData = () => {

    if(Id!=='' && Address!==''){

      const res = realm.objects("Person");

      const modifyData = res.find(data => data._id === parseInt(Id))

      realm.write(() => {
        modifyData.address = Address;
      });

      setId('');
      setAddress('');

      viewData() ;
    }

  }

  const viewData = () => {

    const res = realm.objects("Person");

    if (res.length > 0){
      let temp = [];

      setIsAnyData(true);

      for (let i = 0; i < res.length; ++i)
        temp.push(<DataView data={res[i]}/>);
      setData(temp);
      setKey(<KeysView data={res[0]} />);
    }

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
          Test Realm Database
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
          <Text style={styles.touchableOpacityText}>Insert</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          onChangeText={
            (text) => setId(text)
          }
          placeholder="Enter Id"
          value={Id} />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={deleteData}>
          <Text style={styles.touchableOpacityText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={modifyData}>
          <Text style={styles.touchableOpacityText}>Modify Address</Text>
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
    width: '100%',
    marginTop: 8,
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
