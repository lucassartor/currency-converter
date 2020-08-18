import React, {Component} from "react";
import Head from "next/head";
import axios from 'axios';
import {BsFillHeartFill, BsArrowUpDown} from "react-icons/bs";
import {IconContext} from "react-icons";


let timeout = 0;
const apiKey = "f205970f3571f475aee5";

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
            data: ['USD', 'BRL']
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.makeOption = this.makeOption.bind(this);
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

    makeOption(options){
        return <option>{options}</option>;
    }


    render() {
        return (
            <div>
                <div
                    className="max-w-lg shadow-lg h-64  overflow-hidden shadow-lg text-lg text-center  bg-white rounded ">
                    <div className="flex items-center px-8 pt-10">

                        <img src={this.state.firstCurrencyIcon} width="30" className="mx-auto"
                             alt={this.state.firstCurrencyName}/>
                        <h1 className="text-center px-2">{this.state.firstCurrencyName}:</h1>
                        <input
                            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-1  appearance-none leading-normal"
                            type="text" value={this.state.value} onChange={this.handleChange}/>

                        <select value={this.state.firstCurrencyName} className="block w-full bg-gray-200 border border-gray-200 text-gray-700 ml-3 py-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            {this.props.currencyId.map(this.makeOption)}
                        </select>
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

                        <select value={this.state.secondCurrencyName} className="block w-full bg-gray-200 border border-gray-200 text-gray-700 ml-3 py-2  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            {this.props.currencyId.map(this.makeOption)}
                        </select>
                    </div>

                    <div className="mx-auto ml-16 flex px-16 pt-6 items-center text-sm">
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
            currencyBRL: 0,
            currencyNames: [],
            currencyId: [],
        };

        this.fetchCurrency = this.fetchCurrency.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
        this.fetchCurrencyNames = this.fetchCurrencyNames.bind(this);
        this.setCurrencyNames = this.setCurrencyNames.bind(this);
    }


    fetchCurrency(firstCurrency, secondCurrency) {
        setTimeout(async () => {
            const response = await axios.get("https://free.currconv.com/api/v7/convert?q=" + firstCurrency + "_" + secondCurrency + "," + secondCurrency + "_" + firstCurrency + "&compact=ultra&apiKey=" + apiKey);
            const values = await response.data;
            this.setCurrency(values)
        }, timeout);

    }

    fetchCurrencyNames(){
        setTimeout(async () => {
            const response = await axios.get("https://free.currconv.com/api/v7/countries?apiKey=" + apiKey);
            const values = await response.data;
            this.setCurrencyNames(values)
        }, timeout);
    }


    setCurrency(value) {
        this.setState({
            currencyUSD: value.USD_BRL,
            currencyBRL: value.BRL_USD
        });
    }

    setCurrencyNames(value) {
        this.setState({
            currencyId: Object.values(value.results).map(currencyId => currencyId.currencyId),
            currencyNames: Object.values(value.results).map(currencyName => currencyName.currencyId)
        });

    }


    render() {
        if (this.state.currencyUSD !== 0 || this.state.currencyBRL !== 0)
            timeout = 10000000;

        this.fetchCurrency("USD", "BRL");
        this.fetchCurrencyNames();


        return (
            <div className="flex items-center justify-center h-screen">
                <Head>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans"/>
                </Head>
                <Input currencyUSD={this.state.currencyUSD} currencyBRL={this.state.currencyBRL} currencyId ={this.state.currencyId} currencyNames ={this.state.currencyNames}/>
            </div>
        );
    }
}

export default Home;






