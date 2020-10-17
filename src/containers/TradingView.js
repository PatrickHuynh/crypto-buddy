import React, { Fragment, useState, useEffect } from "react";
import queryString from "query-string";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

function TradingView(props) {
    const intervals = [1, 5, 60, 1440];

    const [viewParams, setViewParams] = useState(() => {
        let params = queryString.parse(props.location.search);
        params.symbols = params.symbols.split(",");
        return params;
    });
    const [widgetHeight, setWidgetHeight] = useState(
        ((window.innerHeight - 71) / (viewParams.rows || 2)) * 0.99
    );
    const [widgetWidth, setWidgetWidth] = useState(
        (window.innerWidth / (viewParams.columns || 2)) * 0.99
    );
    const [interval, setInterval] = useState(viewParams.interval || 60);

    return (
        <Fragment>
            <div className="container-fluid m-0 p-0">
                <div className="row bg-secondary m-0 p-0 justify-content-left">
                    {intervals.map((i) => {
                        return (
                            <button
                                key={i}
                                className={
                                    interval == i
                                        ? "btn btn-sm btn-primary"
                                        : "btn btn-sm btn-secondary"
                                }
                                onClick={() => {
                                    setInterval(i);
                                }}
                            >
                                {`${i}m`}
                            </button>
                        );
                    })}
                </div>
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
