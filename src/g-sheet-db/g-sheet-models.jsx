import { useEffect, useState } from 'react'
import axios from 'axios'; // Import Axios
import Card from '../components/card/card';
import Cart from '../components/cart/cart';
import './db.css';



export default function FetchCSVData() {
    const [csvData, setCsvData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const onAddItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem) {
			const newData = cartItems.map(c =>
				c.id == item.id
					? { ...existItem, quantity: existItem.quantity + 1 }
					: c
			);
			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];
			setCartItems(newData);
		}
	};

	const onRemoveItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter(c => c.id !== existItem.id);
			setCartItems(newData);
		} else {
			const newData = cartItems.map(c =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);
			setCartItems(newData);
		}
	};
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
		setCount(prev => prev + 1);
		onAddItem(model);
	};

	const handleDecrement = () => {
		setCount(prev => prev - 1);
		onRemoveItem(model);
	};
    const onCheckout = () => {
		telegram.MainButton.text = 'Sotib olish :)';
		telegram.MainButton.show();
	};

    useEffect(() => {
        fetchCSVData();    // Fetch the CSV data when the component mounts
    }, []); // The empty array ensures that this effect runs only once, like componentDidMount

    const fetchCSVData = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmKiqAI9rlyyzoSgzuBLfVpNXF6nfIzOIWbU_72YgKgmRqaB037sga8IAHVHi2-L439olBjknhD6Dw/pub?gid=0&single=true&output=csv'; // Replace with your Google Sheets CSV file URL

        axios.get(csvUrl)    // Use Axios to fetch the CSV data
            .then((response) => {
                const parsedCsvData = parseCSV(response.data);        // Parse the CSV data into an array of objects
                setCsvData(parsedCsvData);        // Set the fetched data in the component's state
                console.log(parsedCsvData);        // Now you can work with 'csvData' in your component's state.
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
            });
    }

    function parseCSV(csvText) {
        const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
        const headers = rows[0].split(',');        // Extract headers (assumes the first row is the header row)
        const data = [];        // Initialize an array to store the parsed data
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
            const rowObject = {};
            for (let j = 0; j < headers.length; j++) {
                rowObject[headers[j]] = rowData[j];
            }
            data.push(rowObject);
        }
        return data;
    }
    const [searchField, setSearchField] = useState("");
    
    const filtered_data = csvData.filter(
        model => {
          return (
            model.code.includes(searchField.toLowerCase()) ||
            model.full_name.toLowerCase().includes(searchField.toLowerCase())
          );
        }
      );
    const handleChange = e => {
    setSearchField(e.target.value);
    };
    return (
        <>
        <div className="navbar">
            <div className="search__container">
                <input 
                type = "search" 
                placeholder = "Search Model" 
                onChange = {handleChange}
                />
            </div>
            <Cart cartItems={cartItems} onCheckout={onCheckout} />
        </div>
        
        <div className='cards__container'>
            
         {filtered_data.map(model=> {
            return(
                
            <>
            
                    <Card
                        key={model.id}
                        model={model}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
                    />
            
            </>
                
            )}
        )}
        </div>
    </>
    )
    
}