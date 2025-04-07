import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndividualCat(){

    const[data, setdata] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${id}`)
        .then((response) => response.json())
        .then((data) => {
            setdata(data)
        })
        .catch((error) => {
            console.error("error:", error)
        })
    }, [id])

    const ProductList = ({data}) => {
        return (
            <div>
                <ul>
                    {data.map(item => (
                        <li key={item.name}>
                            {item.name} : {item.price}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div>
            {ProductList({data})}
        </div>
    )
}

export default IndividualCat