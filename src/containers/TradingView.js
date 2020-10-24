import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Modal } from "react-bootstrap";
import "./TradingView.css";

function SymbolsModal(props) {
    const [symbols, setSymbols] = useState([...props.parentViewState.symbols]);

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Body>
                <table className="table table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Symbol</th>
                            <th className="text-center" scope="col">
                                Up
                            </th>
                            <th className="text-center" scope="col">
                                Down
                            </th>
                            <th className="text-center" scope="col">
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {symbols.map((s, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{s}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => {
                                                let newSymbols = [...symbols];
                                                let moveSymbol = newSymbols.splice(
                                                    i,
                                                    1
                                                );
                                                newSymbols.splice(
                                                    Math.max([i - 1, 0]),
                                                    0,
                                                    moveSymbol
                                                );
                                                setSymbols(newSymbols);
                                            }}
                                        >
                                            ▲
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => {
                                                let newSymbols = [...symbols];
                                                let moveSymbol = newSymbols.splice(
                                                    i,
                                                    1
                                                );
                                                newSymbols.splice(
                                                    i + 1,
                                                    0,
                                                    moveSymbol
                                                );
                                                setSymbols(newSymbols);
                                            }}
                                        >
                                            ▼
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                console.log(i);
                                                let newSymbols = [...symbols];
                                                newSymbols.splice(i, 1);
                                                setSymbols(newSymbols);
                                            }}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => {
                        props.handleUpdateViewState({
                            ...props.parentViewState,
                            symbols: [...symbols],
                        });
                        props.handleHideModal();
                    }}
                >
                    Update View
                </button>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        props.handleHideModal();
                        setSymbols([...props.parentViewState.symbols]);
                    }}
                >
                    Discard Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}

function TradingView(props) {
    const intervals = [1, 5, 60, 1440];
    let history = useHistory();

    const [viewState, setViewState] = useState(() => {
        let params = queryString.parse(props.location.search);
        params.symbols = params.symbols.split(",");
        params.columns = params.columns || 2;
        params.rows = params.rows || 2;
        params.interval = params.interval || 60;
        params.widgetHeight =
            params.widgetHeight ||
            ((window.innerHeight - 71) / params.rows) * 0.99;
        params.widgetWidth =
            params.widgetWidth || (window.innerWidth / params.columns) * 0.99;
        params.timezone = params.timezone || "Atlantic/Reykjavik";
        return params;
    });

    const updateViewState = (params) => {
        setViewState(params);
        history.push({
            pathname: "/tradingview",
            search: `?symbols=${params.symbols.join(",")}&columns=${
                params.columns
            }&rows=${params.rows}&interval=${params.interval}`,
        });
    };

    const [showSymbols, setShowSymbols] = useState(false);

    const handleShowSymbols = () => {
        setShowSymbols(!showSymbols);
    };

    return (
        <Fragment>
            <SymbolsModal
                show={showSymbols}
                handleHideModal={() => {
                    handleShowSymbols();
                }}
                handleUpdateViewState={updateViewState}
                parentViewState={{ ...viewState }}
            ></SymbolsModal>
            <div className="container-fluid m-0 p-0">
                <div className="row bg-secondary m-0 p-0 justify-content-left">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                            handleShowSymbols();
                        }}
                    >
                        Symbols
                    </button>
                    <div className="navbar-text bg-dark btn-sm ml-2 mr-2 rounded-0">
                        Interval
                    </div>
                    {intervals.map((i) => {
                        return (
                            <button
                                key={i}
                                className={
                                    viewState.interval == i
                                        ? "btn btn-sm btn-primary"
                                        : "btn btn-sm btn-secondary"
                                }
                                onClick={() => {
                                    let newviewState = {
                                        ...viewState,
                                        interval: i,
                                    };
                                    updateViewState(newviewState);
                                }}
                            >
                                {`${i}m`}
                            </button>
                        );
                    })}
                    <div className="navbar-text bg-dark btn-sm ml-2 mr-2 rounded-0">
                        Columns
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => {
                        return (
                            <button
                                key={i}
                                className={
                                    viewState.columns == i
                                        ? "btn btn-sm btn-primary"
                                        : "btn btn-sm btn-secondary"
                                }
                                onClick={() => {
                                    let newviewState = {
                                        ...viewState,
                                        columns: i,
                                    };
                                    updateViewState(newviewState);
                                }}
                            >
                                {`${i}`}
                            </button>
                        );
                    })}
                    <div className="navbar-text bg-dark btn-sm ml-2 mr-2 rounded-0">
                        Rows
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => {
                        return (
                            <button
                                key={i}
                                className={
                                    viewState.rows == i
                                        ? "btn btn-sm btn-primary"
                                        : "btn btn-sm btn-secondary"
                                }
                                onClick={() => {
                                    let newviewState = {
                                        ...viewState,
                                        rows: i,
                                    };
                                    updateViewState(newviewState);
                                }}
                            >
                                {`${i}`}
                            </button>
                        );
                    })}
                </div>
                <div
                    className="row no-gutter m-0 p-0 text-center"
                    style={{
                        height: `calc(
                            ${Math.floor(
                                100 / viewState.rows
                            )}vh - ${Math.floor(90 / viewState.rows)}px`,
                    }}
                >
                    {viewState.symbols.map((s) => {
                        return (
                            <Fragment key={s.toString()}>
                                <div
                                    className="col-md-auto m-0 p-0"
                                    style={{
                                        minHeight: `100%`, //viewState.widgetHeight,
                                        width: `${Math.floor(
                                            100 / viewState.columns
                                        )}%`,
                                    }}
                                >
                                    <TradingViewWidget
                                        symbol={s}
                                        theme={Themes.DARK}
                                        interval={viewState.interval}
                                        timezone={viewState.timezone}
                                        autosize
                                    />
                                    <button
                                        className="btn btn-sm btn-secondary btn-tvnav float-right"
                                        onClick={() => {
                                            window.open(
                                                `http://tradingview.com/chart?symbol=${s}&interval=${viewState.interval}`
                                            );
                                        }}
                                    >
                                        Go
                                    </button>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default TradingView;
