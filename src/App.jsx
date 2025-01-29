import React, { useEffect } from 'react'
import {useState} from 'react';
import './App.css';
import axios from "axios";
function App() {
  const[amount,setAmount]=useState(1);
  const[fromCurrency,setFromcurrency]=useState("USD");
  const[toCurrency,setTocurrency]=useState("INR")
  const[convertedAmount,setConvertedAmount]=useState(null);
 const[exchangeRate,setExchangeRate]=useState(null);
 
  useEffect(()=>{
    const getExchangeRate=async()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res=await axios.get(url);
        setExchangeRate(res.data.rates[toCurrency]);
      }catch(error){
        console.error("Error fetching exchange rate",error);
      }
    };
    getExchangeRate();
    },[fromCurrency,toCurrency])

    useEffect (()=>{
      if(exchangeRate!==null){
        setConvertedAmount((amount*exchangeRate).toFixed(2));
      }
    },[amount,exchangeRate]);

    const handleAmountChange=(e)=>{
      const value=parseFloat(e.target.value);
      setAmount(isNaN(value)?0:value);
    }
  return (
    <div>
      <div className="box">
      <h1>CURRENCY CONVERTOR </h1>
      <div className="input-container"> 
      <label htmlFor="amount">Amount
            <input
             // type="number"
           //   id="amt"
             value={amount}
              onChange={handleAmountChange}
            />
</label>
</div>
<div className="input-container">
<label htmlFor="from">From Currency</label>
<select id="fromCurrency" 
value={fromCurrency}
onChange={(e)=>setFromcurrency(e.target.value)}
>
  <option value="null">Select From Currency</option>
  <option value="USD">USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="GBP">GBP - British Pound Sterling</option>
  <option value="JPY">JPY - Japanese Yen</option>
  <option value="AUD">AUD - Australian Dollar</option>
  <option value="INR">INR - Indian Rupee</option>
</select>
</div>
<div className="input-container">
<label htmlFor="from">To Currency</label>
<select id="toCurrency" 
value={toCurrency}
onChange={(e)=>setTocurrency(e.target.value)}
>
<option value="null">Select To Currency</option>
  <option value="USD">USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="GBP">GBP - British Pound Sterling</option>
  <option value="JPY">JPY - Japanese Yen</option>
  <option value="AUD">AUD - Australian Dollar</option>
  <option value="INR">INR - Indian Rupee</option>
</select>
</div>

<div className="result">
  <p>{amount} {fromCurrency} is equal to {convertedAmount}{toCurrency}</p>
</div>
    </div>
    </div>
  )
}

export default App