import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function OrderByStatus() {
  const { status } = useParams();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const extractId = (url) => url.split("/").filter(Boolean).pop();

  const statusLabels = {
    O: "Ordered",
    P: "Processing",
    S: "Shipped",
    D: "Delivered",
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
      .then((res) => res.json())
      .then(async (orderData) => {
        setOrders(orderData);

        const customerMap = {};

        for (const order of orderData) {
          const customerUrl = order.customer;

          // Only fetch if we haven't already
          if (!customerMap[customerUrl]) {
            try {
              const res = await fetch(customerUrl);
              const data = await res.json();
              customerMap[customerUrl] = data;
            } catch (err) {
              console.error(`Failed to fetch customer ${customerUrl}`, err);
            }
          }
        }

        setCustomers(customerMap);
      })
      .catch((error) => console.error("Error loading orders:", error));
  }, [status]);

  return (
    <div>
      <h1>Orders with Status: {statusLabels[status] || status}</h1>
      <ul>
        {orders.map((order) => {
          const orderId = extractId(order.url);
          const customer = customers[order.customer];
          const customerId = customer ? extractId(customer.url) : null;

          return (
            <li key={order.url}>
              <p><strong>Order #{orderId}</strong></p>
              <p>Date Ordered: {order.date_ordered}</p>
              <p>Shipping Address: {order.shipping_addr}</p>

              {customer ? (
                <p>
                  Customer:{" "}
                  <Link to={`/customer/${customerId}`}>
                    {customer.name}
                  </Link>
                </p>
              ) : (
                <p>Loading customer...</p>
              )}

              <p>
                <Link to={`/order/detail/${orderId}`}>View Order</Link>
              </p>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OrderByStatus;
