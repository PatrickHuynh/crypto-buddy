import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./TradingView.css";

function TradingView(props) {
    const intervals = [1, 5, 60, 1440];
    let history = useHistory();

    const [viewParams, setViewParams] = useState(() => {
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

    const updateViewParams = (params) => {
        setViewParams(params);
        history.push({
            pathname: "/tradingview",
            search: `?symbols=${params.symbols.join(",")}&columns=${
                params.columns
            }&rows=${params.rows}&interval=${params.interval}`,
        });
    };

    return (
        <Fragment>
            <div className="container-fluid m-0 p-0">
                <div className="row bg-secondary m-0 p-0 justify-content-left">
                    {intervals.map((i) => {
                        return (
                            <button
                                key={i}
                                className={
                                    viewParams.interval == i
                                        ? "btn btn-sm btn-primary"
                                        : "btn btn-sm btn-secondary"
                                }
                                onClick={() => {
                                    let newViewParams = {
                                        ...viewParams,
                                        interval: i,
                                    };
                                    updateViewParams(newViewParams);
                                }}
                            >
                                {`${i}m`}
                            </button>
                        );
                    })}
                </div>
                <div
                    className="row no-gutter m-0 p-0 text-center"
                    style={{
                        height: `calc(
                            ${Math.floor(
                                100 / viewParams.rows
                            )}vh - ${Math.floor(90 / viewParams.rows)}px`,
                    }}
                >
                    {viewParams.symbols.map((s) => {
                        return (
                            <Fragment>
                                <div
                                    className="col-md-auto m-0 p-0"
                                    style={{
                                        minHeight: `100%`, //viewParams.widgetHeight,
                                        width: `${Math.floor(
                                            100 / viewParams.columns
                                        )}%`,
                                    }}
                                >
                                    <TradingViewWidget
                                        symbol={s}
                                        theme={Themes.DARK}
                                        interval={viewParams.interval}
                                        timezone={viewParams.timezone}
                                        autosize
                                    />
                                    <button
                                        className="btn btn-sm btn-secondary btn-tvnav float-right"
                                        onClick={() => {
                                            window.open(
                                                `http://tradingview.com/chart?symbol=${s}&interval=${viewParams.interval}`
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
