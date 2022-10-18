import { Input } from 'reactstrap';
import { data } from './assets/data'
import { Button } from 'reactstrap';
import './App.css';
import { useState } from 'react';

function App() {
  const [stateData, setStateData] = useState(data)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [searchValue, setSearchValue] = useState(0)
  const calculateTotal = (arr) => {
    return arr.reduce((acc,i) => {
      return acc+i.count
    },0)
  }

  const handleIncr = (ind) => {
    const newData = [...stateData]
    newData[ind].count++
    /* let total= newData.reduce((acc, i)=>{
      return acc+i.count
    },0); */
    
    let totalPrice= 0;
    for(let i of newData){
      totalPrice += i.count * i.price
    }

    // setTotalItems(total)
    setTotalPrice(totalPrice)
    setTotalItems(calculateTotal(newData))
    setStateData(newData)
  }
  const handleDecr = (ind) => {
    const newData = [...data]
    if(newData[ind].count){
    
    newData[ind].count--
    /* let total= 0;
    for(let i of newData){
      total+= i.count
    } */
    let totalPrice= 0;
    for(let i of newData){
      totalPrice += i.count * i.price
    }



    setTotalPrice(totalPrice)
    setTotalItems(calculateTotal(newData))
    // setTotalItems(total)
    setStateData(newData)
    }
  }
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const filtered = stateData.filter(i=>i.title.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div className="App">
      <div className='header'>
        <Input value={searchValue} placeholder='Search' onChange={handleSearch}/>
        <span className='counter'>{totalItems}</span>
      </div>
      <div className='main'>
        {
          filtered.map((item, index) => {
            return (
              <div className='custom-card'>
                <img src={item.image} alt="" width={'70px'} />
                <p>{item.title.slice(0, 12)}</p>
                <div>
                  <p>Price: {item.price}</p>
                  <p>{item.count}</p>
                  <Button color="primary" className='minus' onClick={()=>handleDecr(index)}>-</Button>
                  <Button color="primary" className='plus' onClick={()=>handleIncr(index)}>+</Button>
                </div>
              </div>
            )
          })
        }
      </div>
      <div style={{marginBottom: "10px", fontWeight: "bold"}}>Total Price : {totalPrice}$</div>
      <div>
        <Button>Prev</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
}

export default App;
