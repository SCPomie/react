import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function IndividualCust() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch customer details
    fetch(`http://127.0.0.1:8000/api/customer/${id}/`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching customer:", err));
  }, [id]);

  useEffect(() => {
    // Fetch customer orders
    fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
      .then((res) => res.json())
      .then(setOrders)
      .catch((err) => console.error("Error fetching orders:", err));
  }, [id]);

  const extractId = (url) => url.split("/").filter(Boolean).pop();

  const CustomerInfo = ({ data }) => (
    <div>
      <h2>Customer Info</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Address: {data.address}</p>
    </div>
  );

  const OrderList = ({ orders }) => (
    <div>
      <h3>Orders Placed</h3>
      {orders.length === 0 ? (
        <p>This customer has not placed any orders.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const orderId = extractId(order.url);
            return (
              <li key={order.url}>
                <p>
                  <strong>Order #{orderId}</strong> –{" "}
                  <Link to={`/order/detail/${orderId}`}>View Order</Link>
                </p>
                <p>Date: {order.date_ordered}</p>
                <p>Shipping Address: {order.shipping_addr}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      {data ? (
        <>
          <CustomerInfo data={data} />
          <OrderList orders={orders} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default IndividualCust;
