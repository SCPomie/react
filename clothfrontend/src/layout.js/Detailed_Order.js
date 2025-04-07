import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailedOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    // Get order details
    fetch(`http://127.0.0.1:8000/api/order/${id}/`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error("Error loading order:", err));
  }, [id]);

  useEffect(() => {
    // Get order items
    fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
      .then(res => res.json())
      .then(async (data) => {
        setItems(data);

        // Fetch product details for each item
        const productMap = {};
        await Promise.all(data.map(async (item) => {
          const res = await fetch(item.product);
          const product = await res.json();
          productMap[item.product] = product;
        }));

        setProducts(productMap);
      })
      .catch(err => console.error("Error loading order items:", err));
  }, [id]);

  const getTotal = () => {
    return items.reduce((total, item) => {
      const product = products[item.product];
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div>
      <h1>Order #{id} Details</h1>
      {order ? (
        <div>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date Ordered:</strong> {order.date_ordered}</p>
          <p><strong>Shipping Address:</strong> {order.shipping_addr}</p>
        </div>
      ) : (
        <p>Loading order info...</p>
      )}

      <h2>Items</h2>
      <ul>
        {items.map((item) => {
          const product = products[item.product];
          return (
            <li key={item.url}>
              <p>Product: {product ? product.name : "Loading..."}</p>
              <p>Price: €{product?.price ?? "..."}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          );
        })}
      </ul>

      <h3>Total: €{getTotal()}</h3>
    </div>
  );
}

export default DetailedOrder;
