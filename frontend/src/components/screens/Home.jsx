import React, { useState, useEffect, useContext } from 'react';
import Card from "../Card";
import Carousal from '../Carousal';
import Form from 'react-bootstrap/Form';
import { UserData } from '../../App';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { BsSearch } from 'react-icons/bs'

const Home = () => {

  const { userState } = useContext(UserData);

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  //GET ALL FOOD DATA
  const getData = async ()=> {
    const res = await fetch(`${process.env.REACT_APP_URL}/foodData`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })

    const json = await res.json();
    setItems(json[0]);
  };

  useEffect(()=> {
    getData();
  }, []);

  return (
    <>
      <Carousal />
      <div className="container mt-5 mb-5">
        <div className="d-flex">
            <Form.Control
              type="search"
              placeholder="Find your Favourite Food"
              className="form-control border-1 me-2 text-center"
              aria-label="Search"
              value={search}
              onChange={(e)=> {setSearch(e.target.value)}}
              />
              <span className='search_icon cursor-pointer'><BsSearch/></span>
        </div>
      </div>
      <Container className='cards_container'>
        {items.length !== 0 ?
        <Row className='mb-5' key={items.length} xs={1} sm={2} md={3} lg={4} xl={4}>
         {items.filter((item)=> (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filteredItem)=> {

           return (
              <Col className='mb-2' key={filteredItem._id}>
              <Card foodItem={filteredItem} options={filteredItem.options[0]} userPresent={userState.isAuthenticated}/>
              </Col>
            )
        })
        }
        </Row>
        : "No data found"}
      </Container>
    </>
  )
}

export default Home;