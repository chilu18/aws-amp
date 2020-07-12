import React, {Component} from 'react';
import './App.css';

// $ npm install react-plotly.js plotly.js
// $ npm i axios
import Plot from 'react-plotly.js'
import axios from 'axios';

class App extends Component {

  constructor(){
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    var url = 'https://qu8a2mteqj.execute-api.ap-southeast-2.amazonaws.com/Data/serialNumber/SN-1729'
    var headers = {
      headers: {
        'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "OPTIONS,GET",
            'Content-Type': 'application/json',
            'X-Api-Key': 'mlHNxPUCN72VIqri1pjiH1r63Bwtz6Sf6sPrqltZ',
            'x-amzn-RequestId' : '51d1dc1a-0707-4e86-a433-6cc749b0ea49',
            'x-amz-apigw-id':'PfPJRGSASwMFVpQ=',
            'X-Amzn-Trace-Id':'Root=1-5f092bd4-e6c138b466ba1aec3b4e0e60',
      }
    }
    axios.get(url, headers)
    .then((x)=>{
      console.log(x)
      this.setState({
        data: x.data.iotCatalogs
      })
    })
    .catch(()=>{
      alert('Failed to get the data 😭')
    })
  }

  // get button 
  getButton = () => {
    var url = 'https://qu8a2mteqj.execute-api.ap-southeast-2.amazonaws.com/Data/serialNumber/SN-1729'
    var headers = {
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials' : true,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "OPTIONS,GET",
        'Content-Type': 'application/json',
        'X-Api-Key': 'mlHNxPUCN72VIqri1pjiH1r63Bwtz6Sf6sPrqltZ',
        'x-amzn-RequestId' : '51d1dc1a-0707-4e86-a433-6cc749b0ea49',
        'x-amz-apigw-id':'PfPJRGSASwMFVpQ=',
        'X-Amzn-Trace-Id':'Root=1-5f092bd4-e6c138b466ba1aec3b4e0e60',

       
      }
    }
    axios.get(url, headers)
    .then((x)=>{
      console.log(x)
      this.setState({
        data: x.data.results
      })
    })
    .catch(()=>{
      alert('Failed to get the data 😭')
    })
  }

  // post button
  postButton = () => {
    var url = 'https://qu8a2mteqj.execute-api.ap-southeast-2.amazonaws.com/Data/serialNumber/SN-1729'
    var headers = {
      headers: {
        'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "OPTIONS,GET",
            'Content-Type': 'application/json',
            'X-Api-Key': 'mlHNxPUCN72VIqri1pjiH1r63Bwtz6Sf6sPrqltZ',
            'x-amzn-RequestId' : '51d1dc1a-0707-4e86-a433-6cc749b0ea49',
            'x-amz-apigw-id':'PfPJRGSASwMFVpQ=',
            'X-Amzn-Trace-Id':'Root=1-5f092bd4-e6c138b466ba1aec3b4e0e60',

      }
    }
    var dataBody = {
      //device_developer_id: "deviceDefault@Lintang_Wisesa",
      data: {
        deviceTemp: this.refs.temp.value,
        deviceMos: this.refs.mos.value,
        unixTimeStamp: this.refs.pot.value,
      }
    }
    axios.post(url, dataBody, headers)
    .then(()=>{
      alert('Data posted successfully! 😍')
      this.getButton()
    })
    .catch(()=>{
      alert('Failed to post the data 😭')
    })
  }

  render(){

    // get variables: temp, hum, pot, time
    var temp = this.state.data.map((val, i)=>{
      return val.data.deviceTemp
    })
    var hum = this.state.data.map((val, i)=>{
      return val.data.deviceMos
    })
   
    var unixTimeStamp = this.state.data.map((val, i)=>{
      return val.stream_created_at.split('T')[0] + ' ' + val.stream_created_at.split('T')[1] 
    })

    return (
      <div className="App container mt-5">
        <h2 style={{color:'white'}}>React ♥ Plotly ♥ Favoriot</h2>

        <div className='row mt-5 mb-3'>
          
          {/* temperature */}
          <div className='input-group col-sm-4'>
            <input ref='temp' type='number' placeholder='Temperature...' className='form-control'/>
            <div className='input-group-append'>
              <span className='input-group-text'>°C</span>
            </div>
          </div>

          {/* humidity */}
          <div className='input-group col-sm-4'>
            <input ref='hum' type='number' placeholder='Humidity...' className='form-control'/>
            <div className='input-group-append'>
              <span className='input-group-text'>%</span>
            </div>
          </div>

          {/* potentio */}
          <div className='input-group col-sm-4'>
            <input ref='pot' type='number' placeholder='Potentio...' className='form-control'/>
            <div className='input-group-append'>
              <span className='input-group-text'>#</span>
            </div>
          </div>

        </div>

        <div className='row mb-3 justify-content-around'>

          {/* post button */}
          <button className='btn btn-lg form-control col-sm-6'
          style={{maxWidth:'350px', backgroundColor:'purple', color:'white'}}
          onClick={this.postButton}
          >
            POST
          </button>

          {/* get button */}
          <button className='btn btn-lg form-control col-sm-6'
          style={{maxWidth:'350px', backgroundColor:'purple', color:'white'}}
          onClick={this.getButton}
          >
            GET
          </button>

        </div>

        <div>

          {
            this.state.data
            ?
            <Plot
              data={[
                {
                  x: unixTimeStamp ? unixTimeStamp : 0,
                  y: temp ? temp : 0,
                  type: 'scattergl',
                  marker: {color:'red'},
                  name: 'Temp (°C)'
                },
                {
                  x: unixTimeStamp ? unixTimeStamp : 0,
                  y: hum ? hum : 0,
                  type: 'scattergl',
                  marker: {color:'blue'},
                  name: 'Mos (%)'
                },
                
              ]}
              layout = {{
                width : '700', height : '400',
                title : 'Favoriot Data Visualization',
                legend: {
                  x: 1, y: 1, traceorder: 'normal',
                  font: {
                    family: 'sans-serif', size: 12, color: 'black'
                  },
                  bgcolor: 'lightgrey',
                  bordercolor: 'grey',
                  borderwidth: 1
                }
              }}
            />
            :
            <div></div>
          }

        </div>

      </div>
    );
  }
}

export default App;