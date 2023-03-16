import React, { useState, useEffect, useContext } from 'react';
import Card from "../Card";
import Carousal from '../Carousal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { BsSearch } from 'react-icons/bs';
import { useDispatchItems, useItems } from '../contextReducers/ItemsContext';
import Footer from './Footer';
import { UserData } from '../../App';

const Home = () => {

  const [category, setCategory] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const useitems = useItems();
  const usedispatchItems = useDispatchItems();
  const { userState } = useContext(UserData)
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const API = process.env.REACT_APP_URL

  // GET UNIQUE CATEGORIES FROM API
  const getUniqueCategory = (data)=> {
    let filteredData = data.map((item)=> {
      return item.category
    })
    filteredData = ["All", ...new Set(filteredData)]
    setCategory(filteredData)
  }

  // FILTER ITEMS WITH CATEGORY
  const filterCategory = (value)=> {

    if(value === "All") {
      usedispatchItems({type: "SET_API_DATA", payload: items})
    } else {
      usedispatchItems({type: "FILTER_CATEGORY", payload: [items, value]})
    }
  }

  //GET ALL FOOD DATA
  const getData = async ()=> {
    try {
      
      const res = await fetch(`${API}/foodData`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      })
      
      const json = await res.json();
      if(json[0]) {
        getUniqueCategory(json[0])
        setItems(json[0]);
        usedispatchItems({type: "SET_API_DATA", payload: json[0]})
      } else {
        setItems([])
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  // CHANGE SORTING FUNCTIONALITY
  const ChangeSort = (value)=> {

    const allItems = useitems.allItems
    
    if(value === "All") {
      usedispatchItems({type: "SET_API_DATA", payload: items})
    }
    else if(value === 'Ascending') {
      usedispatchItems({type: "SORT_ASCENDING", payload: allItems})
    }
    else if(value === "Price_Low") {
      usedispatchItems({type: "SORT_LOW_PRICE", payload: allItems})
    } else if(value === "Price_High") {
      usedispatchItems({type: "SORT_HIGH_PRICE", payload: allItems})
    }
  }

  useEffect(()=> {
    getData();
    if(localStorage.getItem('authToken')) {
     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
     const {isAuth} = userDetails;
     
     if(isAuth) {
       setAuthenticated(true);
      }
    }
    else {
      setAuthenticated(false)
  }
}, [authenticated, userState.isAuthenticated]);

  return (
    <>
      <Carousal />
      <Container className="mt-5 mb-3 w-50 text-center">
        <Row>
          <Col lg={8} xl={11} className="">
              <Form.Control
                type="search"
                placeholder="Find your Favourite Food"
                className="form-control border-1 me-2 text-center"
                aria-label="Search"
                value={search}
                onChange={(e)=> {setSearch(e.target.value)}}
                />
                <span className='search_icon cursor-pointer'><BsSearch/></span>
          </Col>
          <Col lg={4} xl={1} className='text-center'>
            <select name="sorting" id="sorting" className='rounded p-1 h-50' onChange={(e)=> {ChangeSort(e.target.value)}}>
              <option value="All">All</option>
              <option value="All" disabled={true}></option>
              <option value="Ascending">Ascending</option>
              <option value="All" disabled={true}></option>
              <option value="Price_Low">Price(Low)</option>
              <option value="All" disabled={true}></option>
              <option value="Price_High">Price(High)</option>
            </select>
          </Col>
        </Row>
      </Container>
      <div className='d-flex align-items-center gap-5 text-center py-3 my-3 justify-content-center'>
        {category && category.map((item, index)=> {
          return <div key={index}  value={item} onClick={()=> filterCategory(item)} className='category_card'> <p className='mt-4 fw-bold'>{item}</p></div> 
          })}
      </div>
      <br />
      <Container className='cards_container'>
        {useitems.allItems && useitems.allItems.length !== 0 ?
        <Row className='mb-5' key={useitems.allItems.length} xs={1} sm={2} md={3} lg={4} xl={4}>
         {useitems.allItems.filter((item)=> (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filteredItem)=> {
           return (
            <Col className='mb-2' key={filteredItem._id}>
              <Card foodItem={filteredItem} options={filteredItem.options[0]} userPresent={authenticated}/>
            </Col>
            )
          })
        }
        </Row>
        : "No data found"}
      </Container>
      <Footer />
    </>
  )
}

export default Home;