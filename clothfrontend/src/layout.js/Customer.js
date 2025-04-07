import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Customer(){

    const [data, setDate] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/customer/`)
        .then((response) => response.json())
        .then((data) => {
            setDate(data);
        })
        .catch((error) => {
            console.error("error:", error)
        })
    }, [])

    const CustomerList = ({data}) => {
        return (
            <div>
            <ul>
                {data.map(item => (
                    <li key={item.url}>
                         <Link to={`/customer/${item.url.split("/").filter(Boolean).pop()}`}>
                        name : {item.name} <br/>
                        email: {item.email} <br/>
                        address: {item.address}<br/>
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
        )
    }

    return (
        <div>
            <h2>All Category</h2>
            {CustomerList({data})}
        </div>
    )
}

export default Customer