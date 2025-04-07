import { Link } from "react-router-dom";

function Order(){
    const status = [
    { code: "O", label: "Ordered" },
    { code: "P", label: "Processing" },
    { code: "S", label: "Shipped" },
    { code: "D", label: "Delivered" },
    ];

    return (
        <div>
            <h2>select an order status</h2>
            <ul>
                {status.map(status => (
                    <li key={status.code}>
                        <Link to={`/order/${status.code}`}>{status.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Order