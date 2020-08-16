import React, {Component} from "react";
import Head from "next/head";
const apiKey = "f205970f3571f475aee5";
import axios from 'axios';

let timeout = 0;

class Input extends Component{

    constructor(props) {
        super(props);
        this.state = {value: 0.00};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    render() {
        return (
            <div className="max-w-sm shadow-lg h-64 overflow-hidden shadow-lg text-lg text-center  bg-white rounded ">

                <div className="flex items-center px-8 my-12">
                    <img src="/USD.png" width="30" className="mx-autor " alt="USD" />
                    <h1 className="text-center px-2">USD:</h1>
                    <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-1  appearance-none leading-normal" type="text" value={this.state.value} onChange={this.handleChange}/>
                </div>

                <div className="flex items-center px-8 ">
                    <img src="/BRL.png" width="30" className="mx-autor " alt="USD" />
                    <h1 className="text-center px-2">BRL:</h1>
                    <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-1  appearance-none leading-normal" type="text" value={parseFloat(this.state.value * this.props.currencyUSD).toFixed(2)} onChange={this.handleChange} />
                </div>

            </div>
        );
    }
}


class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currencyUSD: 0,
            currencyBRL: 0
        };

        this.fetchCurrency = this.fetchCurrency.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
    }


     fetchCurrency(firstCurrency, secondCurrency) {
        setTimeout(async () => {const response = await axios.get("https://free.currconv.com/api/v7/convert?q=" + firstCurrency + "_" + secondCurrency + "," + secondCurrency + "_" + firstCurrency + "&compact=ultra&apiKey=" + apiKey);
        const values = await response.data;

        this.handleCurrency(values)}, timeout);

    }


    handleCurrency(value){
        this.setState({
            currencyUSD: value.USD_BRL,
            currencyBRL: value.BRL_USD
        });
    }


    render() {
        if(this.state.currencyUSD !== 0  ||  this.state.currencyBRL !== 0 )
            timeout = 10000000;

        this.fetchCurrency("USD","BRL");

        return(
            <div className="flex items-center justify-center h-screen bg-black" >
                <Head>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                </Head>
                <Input currencyUSD = {this.state.currencyUSD} currencyBRL = {this.state.currencyBRL}/>
            </div>
        );
    }
}

export default Home;






