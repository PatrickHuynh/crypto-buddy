import React, { useState, Fragment } from "react";
import web3 from "web3";

function NavBar(props) {
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

    const donateEthereum = async (ethValue) => {
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethAccount,
                    to: "0xAAA7f004d1c8734c893Ff7b47c9a0987099Bb766",
                    value: web3.utils.toHex(
                        web3.utils.toWei(ethValue.toString())
                    ),
                },
            ],
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between pb-0 pt-0">
            <a class="navbar-brand" href="#">
                CryptoBuddy
            </a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="/tradingview/?symbols=US30,EURUSD,BINANCE:BTCUSDT,BINANCE:ETHUSDT&columns=2&rows=2&interval=5"
                    >
                        Tradingview
                    </a>
                </li>
            </ul>

            <ul class="navbar-nav justify-content-end">
                {ethereum ? (
                    <Fragment>
                        {ethConnected ? (
                            <Fragment>
                                <li class="nav-item navbar-text mr-1">
                                    Donate
                                </li>
                                <li class="nav-item">
                                    <button
                                        className="btn btn-sm btn-outline-success m-1"
                                        onClick={(e) => {
                                            donateEthereum(0.01);
                                        }}
                                    >
                                        0.01 ETH
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button
                                        className="btn btn-sm btn-outline-success m-1"
                                        onClick={(e) => {
                                            donateEthereum(0.1);
                                        }}
                                    >
                                        0.1 ETH
                                    </button>
                                </li>
                            </Fragment>
                        ) : (
                            <li class="nav-item">
                                <button
                                    className="btn btn-sm btn-outline-success m-1"
                                    style={{ width: "250px" }}
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
        </nav>
    );
}

export default NavBar;
