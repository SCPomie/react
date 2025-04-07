import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Category(){

    const [data, setDate] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/category/`)
        .then((response) => response.json())
        .then((data) => {
            setDate(data);
        })
        .catch((error) => {
            console.error("error:", error)
        })
    }, [])

    const CategoryList = ({data}) => {
        return (
            <div>
            <ul>
                {data.map(item => (
                    <li key={item.shortcode}>
                         <Link to={`/category/${item.shortcode}`}>
                        {item.shortcode}: {item.display_name}
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
            <CategoryList data={data} />
        </div>
    )
}

export default Category