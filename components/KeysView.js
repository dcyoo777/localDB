import React, {useState, useEffect} from 'react'
import {Text, View} from "react-native";

function KeysView(props) {

    const [keysView, setKeysView] = useState(<View />);

    useEffect(() => {
        const keys = Object.keys(props.data);
        let views = [];

        keys.forEach((key) => {
            views.push(<View key={key} style={{flex: 1, height: 20, justifyContent: "center"}}>
                <Text style={{textAlign: "center", alignItems: "center"}}>{key}</Text>
            </View>)
        });

        setKeysView(<View style={{flexDirection: 'row', height: 20, borderBottomWidth: 1}}>
            { views }
        </View>)

    }, [props]);


    return(
        <View style={{backgroundColor: "#aaaaaa"}}>
            { keysView }
        </View>
    );
}

export default KeysView;
