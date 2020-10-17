import React, { Fragment, useState, useEffect } from "react";
import queryString from "query-string";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import web3 from "web3";

function TradingView(props) {
    const intervals = [1, 5, 60, 1440];

    const [viewParams, setViewParams] = useState(() => {
        let params = queryString.parse(props.location.search);
        params.symbols = params.symbols.split(",");
        return params;
    });
    const [widgetHeight, setWidgetHeight] = useState(
        (window.innerHeight / viewParams.rows) * 0.99 || 2
    );
    const [widgetWidth, setWidgetWidth] = useState(
        (window.innerWidth / viewParams.columns) * 0.99 || 2
    );
    const [interval, setInterval] = useState(viewParams.intervals || 60);

    const [ethConnected, setEthConnected] = useState(false);
    const [ethAccount, setEthAccount] = useState();

    let ethereum;

    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        ethereum = window.ethereum;
    }

    const connectWallet = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setEthAccount(accounts[0]);
            setEthConnected(true);
        } catch (e) {
            console.log(e);
        }
    };

    const donateEthereum = async () => {
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethAccount,
                    to: "0xAAA7f004d1c8734c893Ff7b47c9a0987099Bb766",
                    value: web3.utils.toHex(web3.utils.toWei("0.01")),
                },
            ],
        });
    };

    return (
        <Fragment>
            <nav className="nav navbar-nav navbar-expand-md navbar-dark bg-dark">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        {intervals.map((i) => {
                            return (
                                <li class="nav-item">
                                    <button
                                        key={i}
                                        className={
                                            interval == i
                                                ? "btn btn-primary"
                                                : "btn btn-outline-primary"
                                        }
                                        onClick={() => {
                                            setInterval(i);
                                        }}
                                    >
                                        {`${i}m`}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <ul class="navbar-nav">
                        {ethereum ? (
                            <Fragment>
                                {ethConnected ? (
                                    <li class="nav-item">
                                        <button
                                            className="btn btn-success"
                                            style={{ width: "300px" }}
                                            onClick={(e) => {
                                                donateEthereum();
                                            }}
                                        >
                                            Donate 0.01 ETH
                                        </button>
                                    </li>
                                ) : (
                                    <li class="nav-item">
                                        <button
                                            className="btn btn-success"
                                            style={{ width: "300px" }}
                                            onClick={(e) => {
                                                connectWallet();
                                            }}
                                        >
                                            Donate ETH (Connect Wallet)
                                        </button>
                                    </li>
                                )}
                            </Fragment>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
            </nav>
            <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0 justify-content-center">
                    {viewParams.symbols.map((s) => {
                        return (
                            <div
                                className="col-md-auto m-0 p-0"
                                style={{
                                    height: widgetHeight,
                                    width: widgetWidth,
                                }}
                            >
                                <TradingViewWidget
                                    symbol={s}
                                    theme={Themes.DARK}
                                    interval={interval}
                                    autosize
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default TradingView;
