import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {LineChart} from 'react-native-chart-kit'


const {AlanEventEmitter} = NativeModules;

const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const App = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let subscribation;
    subscribation = alanEventEmitter.addListener('command', response => {
      console.log(response);
      if (response?.command === 'newChart') {
        setChartData({
          labels:
            response?.dates.length > 7
              ? response.dates.slice(
                  response.dates.length - 7,
                  response.dates.length,
                )
              : response.dates,
          data:
            response?.values.length > 7
              ? response.values.slice(
                  response.values.length - 7,
                  response.values.length,
                )
              : response.values,
        });
      } else if (response?.command === 'goBack') {
        setChartData(null);
      }
      
    });

    return () => {
      subscribation.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: '#2c5364',
        backgroundColor:"#ff4500"
      }}>
      {chartData ? (
        <View
        style={{
          flex:1,
          alignItems:"center",
          marginTop:10,
        }}
        >
          <Text
          style={{
            fontSize:25,
            color:'white',
          }}>Bitcoin Prices</Text>
          <LineChart 
          data={{
            labels:chartData?.labels,
            datasets:[{
              data:chartData?.data
           } ]
          }}

          width={Dimensions.get("window").width}
          height={350}
          chartConfig={{
            backgroundColor:"#f2f2f3",
            backgroundGradientFrom:"#f2f2f3",
            backgroundGradientTo:"#f55",
            decimalPlaces:2,
            color:(opacity=1)=>'rgba(255,255,255, ${opacity})',
            labelColor:(opacity =1 )=>'rgba(255,255,255,${opacity})',
            style:{
              borderColorL:16
            },
            propsForDots:{
              r:'6',
              strokeWidth:'2',
              stroke:"#000",

            },
            propsForLabels:{
              fontSize:12,
            }
          }}
xLabelsOffset={40}
verticalLabelRotation={-50}
bezier
style={{
  marginVertical:8,
  borderRadius:5
}}
          />

          </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
  style={{
    width: 420,
    height: 320,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  }}

  source={
    require('./compo/bitcoin.png')
  }
  
      //       source={{
      //  uri: 'https://penntoday.upenn.edu/sites/default/files/2022-01/cryptocurrency-main.jpg',
      //       }}
          
          />
          <Text
          style={{
            fontSize:28,
            color:'white',
            fontWeight:'700'
          }}
          >Bit Coin Info</Text>
          <View
          style={{
            paddingVertical:20,
            backgroundColor:"white",
            paddingHorizontal:15,
            borderRadius:40,
            marginTop:20,
            width:"90%"
          }}
          >
<Text
style={{
  fontSize:25,
  fontWeight:'bold',
  lineHeight:40,
  color:'black',
  margin:20,
 
}}
>
  start To Discover About 
  <Text
  style={{
color:'#12c2ed'
  }}
  > Bit Coin </Text>
  Information
  </Text>

  <Text style={{textAlign:'center'}}>
Ask any Question about Bitcoin. Alan will solve it  😍
  </Text>
  <Text
  style={{
    textAlign:"center",
    color:'#000',
  }}
  >
    How much is Bitcoin?
  </Text>
  <Text
  style={{
    textAlign:"center",
    color:'#000',
  }}
  >
   Give me the price of Bitcoin over the past year?
  </Text>
          </View>
        </View>
      )}

      <AlanView
        projectid={
          'cc5261475f315d760fc6c5b7a16f15cd2e956eca572e1d8b807a3e2338fdd0dc/stage'
        }
      />
    </View>
  );
}

export default App;
