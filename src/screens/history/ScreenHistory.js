import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHistories } from "../../redux/actions/historyActions";
import LoadingBox from "../../components/loading/LoadingBox";
import { withRouter } from "react-router-dom";

import "./history.scss";

const ScreenHistory = ({ history }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state);
    const { histories, loading } = useSelector((state) => state.histories);
    const handleViewHistory = (id) => {
        history.push(`/history/${id}`);
    };

    useEffect(() => {
        if (token) dispatch(orderHistories());
    }, [dispatch, token]);

    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="history_page">
                    <h2>History</h2>
                    <h4>
                        Usted tiene {histories.length}
                        {histories.length === 1 ? " orden" : " ordenes"}
                    </h4>
                    <table>
                        <thead>
                            <tr>
                                <th>ID de pago</th>
                                <th>Fecha de compra</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.map((items) => {
                                return (
                                    <tr key={items._id}>
                                        <td>{items.paymentID}</td>
                                        <td>
                                            {new Date(
                                                items.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleViewHistory(items._id)
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default withRouter(ScreenHistory);
