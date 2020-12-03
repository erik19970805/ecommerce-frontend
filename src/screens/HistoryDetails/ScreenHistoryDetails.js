import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHistory } from "../../redux/actions/historyActions";
import LoadingBox from "../../components/loading/LoadingBox";
import "./historyDetails.scss";

const ScreenHistoryDetails = ({ match }) => {
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const { history, loading } = useSelector((state) => state.history);
    useEffect(() => {
        dispatch(orderHistory(orderId));
    }, [dispatch, orderId]);
    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="history_page">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Codigo Postal</th>
                                <th>Codigo del Pais</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{history.address.recipient_name}</td>
                                <td>
                                    {history.address.line1 +
                                        " - " +
                                        history.address.city}
                                </td>
                                <td>{history.address.postal_code}</td>
                                <td>{history.address.country_code}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ margin: "30px 0" }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Productos</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.cart.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            <img
                                                src={item.images.url}
                                                alt={item.name}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity}</td>
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

export default ScreenHistoryDetails;
