import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

import Realm from 'realm';

export default function RealmExample() {

  const TaskSchema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?",
    },
    primaryKey: "_id",
  };

  const CarSchema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    }
  };

  const PersonSchema = {
    name: 'Person',
    properties: {
      name:     'string',
      birthday: 'date',
      cars:     'Car[]', // a list of Cars
      picture:  'data?'  // optional property
    }
  };

  const insertData = async() => {
    Realm.open({schema: [CarSchema, PersonSchema]})
      .then(realm => {
        // Create Realm objects and write to local storage
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Honda',
            model: 'Civic',
            miles: 1000,
          });
          myCar.miles += 20; // Update a property value
        });

        // Query Realm for all cars with a high mileage
        const cars = realm.objects('Car').filtered('miles > 1000');

        // Will return a Results object with our 1 car
        cars.length // => 1

        // Add another car
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Ford',
            model: 'Focus',
            miles: 2000,
          });
        });

        // Query results are updated in realtime
        cars.length // => 2

        console.log(cars)

        // Remember to close the realm when finished.
        realm.close();
      })
      .catch(error => {
        console.log(error);
      });

  }

  console.log("start Realm")


  insertData();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        Hello
      </Text>

    </SafeAreaView>
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
    fontSize: 23,
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
});
