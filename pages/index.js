import React, {Component} from "react";
import Head from "next/head";
import axios from 'axios';
import {BsFillHeartFill, BsArrowUpDown} from "react-icons/bs";
import {IconContext} from "react-icons";


let timeout = 0;
const apiKey = "c987c3a92e43e0f1e017";

class Input extends Component {


    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.secondCurrencyName === 'BRL')
            return ({
                firstCurrency: nextProps.currencyBRL,
                secondCurrency: nextProps.currencyUSD
            });

        else
            return ({
                firstCurrency: nextProps.currencyUSD,
                secondCurrency: nextProps.currencyBRL
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            value: 0.00,
            firstCurrency: 0.00,
            secondCurrency: 0.00,
            firstCurrencyIcon: "/USD.png",
            firstCurrencyName: "USD",
            secondCurrencyIcon: "/BRL.png",
            secondCurrencyName: "BRL",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSwitch() {
        let newFirstCurrencyIcon = this.state.secondCurrencyIcon;
        let newFirstCurrencyName = this.state.secondCurrencyName;
        let newSecondCurrencyIcon = this.state.firstCurrencyIcon;
        let newSecondCurrencyName = this.state.firstCurrencyName;

        this.setState({
            firstCurrencyIcon: newFirstCurrencyIcon,
            firstCurrencyName: newFirstCurrencyName,
            secondCurrencyIcon: newSecondCurrencyIcon,
            secondCurrencyName: newSecondCurrencyName,
        });

    }


    render() {
        return (
            <div>
                <div className="max-w-sm shadow-lg h-64 overflow-hidden shadow-lg text-lg text-center  bg-white rounded ">
                    <div className="flex items-center px-8 pt-10">
                        <img src={this.state.firstCurrencyIcon} width="30" className="mx-auto"
                             alt={this.state.firstCurrencyName}/>
                        <h1 className="text-center px-2">{this.state.firstCurrencyName}:</h1>
                        <input
                            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-1  appearance-none leading-normal"
                            type="text" value={this.state.value} onChange={this.handleChange}/>
                    </div>

                    <div className="mx-auto m-4">
                        <IconContext.Provider value={{size: 35}}>
                            <div>
                                <BsArrowUpDown className="mx-auto" onClick={this.handleSwitch}/>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div className="flex items-center px-8">
                        <img src={this.state.secondCurrencyIcon} width="30" className="mx-auto"
                             alt={this.state.secondCurrencyName}/>
                        <h1 className="text-center px-2">{this.state.secondCurrencyName}:</h1>
                        <input
                            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-1  appearance-none leading-normal"
                            type="text" value={parseFloat(this.state.value * this.state.secondCurrency).toFixed(2)}
                            onChange={this.handleChange}/>
                    </div>

                    <div className="mx-auto ml-6 flex px-16 pt-6 items-center text-sm">
                        Made with
                        <IconContext.Provider value={{color: "red"}}>
                            <div className="mx-1">
                                <BsFillHeartFill/>
                            </div>
                        </IconContext.Provider>
                        by <a className="mx-1" href="https://github.com/lucassartor">Lucas Sartor</a>
                    </div>
                </div>
            </div>
        );
    }
}


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyUSD: 0,
            currencyBRL: 0
        };

        this.fetchCurrency = this.fetchCurrency.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
    }


    fetchCurrency(firstCurrency, secondCurrency) {
        setTimeout(async () => {
            const response = await axios.get("https://free.currconv.com/api/v7/convert?q=" + firstCurrency + "_" + secondCurrency + "," + secondCurrency + "_" + firstCurrency + "&compact=ultra&apiKey=" + apiKey);
            const values = await response.data;

            this.setCurrency(values)
        }, timeout);

    }


    setCurrency(value) {
        this.setState({
            currencyUSD: value.USD_BRL,
            currencyBRL: value.BRL_USD
        });
    }


    render() {
        if (this.state.currencyUSD !== 0 || this.state.currencyBRL !== 0)
            timeout = 10000000;

        this.fetchCurrency("USD", "BRL");

        return (
            <div className="flex items-center justify-center h-screen">
                <Head>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans"/>
                </Head>
                <Input currencyUSD={this.state.currencyUSD} currencyBRL={this.state.currencyBRL}/>
            </div>
        );
    }
}

export default Home;






