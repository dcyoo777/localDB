import React, {useState, useEffect} from 'react'
import {Text, View} from "react-native";

function DataView(props) {

    const [dataView, setDataView] = useState(<View />);

    useEffect(() => {
        const keys = Object.keys(props.data);
        let views = [];

        keys.forEach((key) => {
            views.push(<View style={{flex: 1, height: 20, justifyContent: "center"}}>
                <Text style={{textAlign: "center", alignItems: "center"}}>{props.data[key]}</Text>
            </View>)
        });

        setDataView(<View style={{flexDirection: 'row', height: 20, borderBottomWidth: 1}}>
            { views }
        </View>)

    }, [props]);


    return(
        <View key={props.data['id']} style={{backgroundColor: 'white'}}>
            {dataView}
        </View>
    );
};

export default DataView;
