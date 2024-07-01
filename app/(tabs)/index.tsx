import { StyleSheet, SafeAreaView, TextInput, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const[baseCurrency, setBaseCurrency] = useState(0);
  const [valueBase, setValueBase] = useState(null);

  const data = [
    { label: 'AUD🇦🇺', value: 'aud' },
    { label: 'BTC', value: 'btc' },
    { label: 'Dogecoin', value: 'doge' },
    { label: 'Ethereum', value: 'eth' },
    { label: 'Euro🇪🇺', value: 'eur' },
    { label: 'JPY🇯🇵', value: 'jpy' },
    { label: 'TWD🇹🇼', value: 'twd' },
    { label: 'USD🇺🇸', value: 'usd' },
  ];
  const [value, setValue] = useState(null);

  const [currencyData, setCurrencyData] = useState({
    "aud": 1.00000000,
    "btc": 0.000010905016,
    "doge": 5.32677499,
    "eth": 0.00019705023,
    "jpy": 106.78295958,
    "twd": 21.6740334,
    "usd": 0.66481431,
  });

  let result = <Text></Text>;

  useEffect(() => {
    axios
      .get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${valueBase}.json`)
      .then((res) => {
        // console.log(res.data['aud']);
        setCurrencyData(res.data[valueBase]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [valueBase]);

  if(valueBase !== null && value !== null) {
    if(valueBase === value) {
      result = <Text style={styles.result}>{baseCurrency.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ' + value.toUpperCase() + ' '} = {baseCurrency.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ' + value.toUpperCase()}</Text>;
    } else {
      result =  <Text style={styles.result}>{baseCurrency.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ' + valueBase.toUpperCase() + ' '} = {(baseCurrency * currencyData[value]).toFixed(4).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ' + value.toUpperCase()}</Text>;
    }
  };

  // const renderItem = (item) => {
  //   return (
  //     <View>
  //       <Text style={styles.selectedTextStyle}>{item.label}</Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.saveAreaStyle}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select base currency"
        searchPlaceholder="Search..."
        value={valueBase}
        onChange={item => {
          setValueBase(item.value);
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={setBaseCurrency}
        value={baseCurrency}
        keyboardType='numeric'
        placeholder='Type number'
      />
      <MaterialCommunityIcons name="arrow-up-down" style={styles.arrow} size={30} />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select currency to be converted"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      {result}
      <Text style={styles.hint}>Hint: Tap the arrow to swap currencies</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveAreaStyle: {
    marginTop: 150
  },
  input: {
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  dropdown: {
    width: 350,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: "auto",
    marginRight: "auto"
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  result: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    fontSize: 25
  },
  arrow: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    marginBottom: 10,
  },
  hint: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 300
  }
});
