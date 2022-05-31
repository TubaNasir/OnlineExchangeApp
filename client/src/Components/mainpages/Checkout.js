import React, { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import '../../Components/UI/Checkout.css'
import Title from '../utilities/Title'
import { placeOrderAPI} from '../../api/OrderAPI';
import { updateCartAPI} from '../../api/UserAPI';
import { updateAdAPI} from '../../api/AdvertisementAPI';



function Checkout() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserAPI.cart
    const [userCartDetails, setUserCartDetails]= state.UserAPI.userCartDetails
    const [total,setTotal] = useState(0)
  const [categories] = state.CategoryAPI.categories
  const [user,setUser] = state.UserAPI.user
  const [token] = state.UserAPI.token
  const [buyer, setBuyer] = useState({
    name: '', email: '', contact: '', address: '',city: '', province: '', sellerID: '', item: '',
})

console.log(buyer)

const [location, setLocation] = useState({
  provinces: [],
  cities: [],
  selectedProvince: '',
  selectedCity: ''
});

const updateLocation = newLocation => {
  setLocation({ ...location, ...newLocation });
};
const changeProvince = event => {
  if (event.target.value === '') {
    updateLocation({
      selectedProvince: '',
      cities: []
    })
    setBuyer({ ...buyer, province: '' })
  }
  else {
    updateLocation({
      selectedProvince: event.target.value,
      cities: location.provinces.find(p => p.name === event.target.value).cities
    });

    setBuyer({ ...buyer, province: event.target.value })
  }
};

const changeCity = event => {
  if (event.target.value === '') {
    updateLocation({ selectedCity: '' })
    setBuyer({ ...buyer, city: '' })
  } else {
    updateLocation({ selectedCity: event.target.value })
    setBuyer({ ...buyer, city: event.target.value })
  }
}



const onChangeInput = e => {
  const { name, value } = e.target;
  setBuyer({ ...buyer, [name]: value })
}
    
    useEffect(() => {
        const getTotal = () => {
            const total = userCartDetails.reduce((prev, item) => {
                return prev + (item.price)
            }, 0)
        
            setTotal(total)
        }
        getTotal()
    },[])

    useEffect(() => {

      setLocation(prevState => ({
          ...prevState,
          provinces: [{ name: "Sindh", cities: [{ name: 'Badin' }, { name: 'Bhirkan' }, { name: 'Rajo Khanani' }, { name: 'Chak' }, { name: 'Dadu' }, { name: 'Digri' }, { name: 'Diplo' }, { name: 'Dokri' }, { name: 'Ghotki' }, { name: 'Haala' }, { name: 'Hyderabad' }, { name: 'Islamkot' }, { name: 'Jacobabad' }, { name: 'Jamshoro' }, { name: 'Jungshahi' }, { name: 'Kandhkot' }, { name: 'Kandiaro' }, { name: 'Karachi' }, { name: 'Kashmore' }, { name: 'Keti Bandar' }, { name: 'Khairpur' }, { name: 'Kotri' }, { name: 'Larkana' }, { name: 'Matiari' }, { name: 'Mehar' }, { name: 'Mirpur Khas' }, { name: 'Mithani' }, { name: 'Mithi' }, { name: 'Mehrabpur' }, { name: 'Moro' }, { name: 'Nagarparkar' }, { name: 'Naudero' }, { name: 'Naushahro Feroze' }, { name: 'Naushara' }, { name: 'Nawabshah' }, { name: 'Nazimabad' }, { name: 'Qambar' }, { name: 'Qasimabad' }, { name: 'Ranipur' }, { name: 'Ratodero' }, { name: 'Rohri' }, { name: 'Sakrand' }, { name: 'Sanghar' }, { name: 'Shahbandar' }, { name: 'Shahdadkot' }, { name: 'Shahdadpur' }, { name: 'Shahpur Chakar' }, { name: 'Shikarpaur' }, { name: 'Sukkur' }, { name: 'Tangwani' }, { name: 'Tando Adam Khan' }, { name: 'Tando Allahyar' }, { name: 'Tando Muhammad Khan' }, { name: 'Thatta' }, { name: 'Umerkot' }, { name: 'Warah' }] },
          { name: "Punjab", cities: [{ name: "Lahore" }, { name: "Multan" }] }],
        }))
  }, [])

  const updateCart = (cart) =>{
    updateCartAPI(cart,token)
    .then(res => {
        console.log(res.data);
        setUser(res.data.data)
    })
    .catch(err => {
        console.log(err.response)
      })

  }

  const updateSoldItems = async () => {
    userCartDetails.map((ad) => {
      console.log(ad.cart)
      updateAdAPI(ad._id, ad , token)
      .then(res => {
        console.log(res.data);
       removeAd(ad._id);
  })
  .catch(err => {
    console.log(err.response.data)
    alert(err.response.data.error.msg)
  })

    })
 setUserCartDetails([]);
  }

  const removeAd = id => {
        cart.forEach((item, index) => {
            if (item === id) {
                cart.splice(index, 1)
            }
        })

        setCart([...cart])
        updateCart(cart)
        // getTotal();
    
}


  const checkoutSubmit = () => {
    const b = buyer
    userCartDetails.map(async(p) => {
        placeOrderAPI({item: p, sellerID: p.userId || 1 , name: b.name, email: b.email, contact: b.contact, address: b.address,city: b.city, province: b.province
      }, token)
        .then(res => {
          console.log(res.data);
          alert("Order placed successfully")
          setBuyer({name: '', email: '', contact: '', address: '',city: '', province: '', sellerID: '', item: '',})
          setCart([])
          setUserCartDetails((prevState) => ({ ...prevState, status: 'sold' }));
          setTotal(0)
          
          updateLocation({
            selectedProvince: '',
            selectedCity: '',
            cities: []
          })
    })
    .catch(err => {
      console.log(err.response.data)
      alert(err.response.data.error.msg)
      alert("Ad posting failed")
      //return(<Toast msg="Failed to post ad"/>)
    })
  })

  updateSoldItems()
}
  
 return (
    <div>
        <Title title='Checkout'/>
        <div class="row page">
        <div class="col-md-8 order-md-1">
        <div className='card mt-4'>

<div className="card-header">
    <h4 style={{textAlign: 'center'}}>Register</h4>
</div>
<div className='card-body'>
    <form onSubmit={checkoutSubmit}>
        <div className='form-group mb-3'>
            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
                Full Name
            </text>
            <input type='text'
                name='name'
                value={buyer.name}
                required
                onChange={onChangeInput}
                className='form-control' />
        </div>

        <div className='form-group mb-3'>
            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
                Contact
            </text>
            <input type='number'
                //placeholder='Contact'
                name='contact'
                value={buyer.contact}
                required
                onChange={onChangeInput}
                className='form-control form-group' />
        </div>

        <div className='form-group mb-3'>
            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
                Email
            </text>
            <input type='email'
                //placeholder='Contact'
                name='email'
                value={buyer.email}
                required
                onChange={onChangeInput}
                className='form-control form-group' />
        </div>
        <div className='form-group mb-3'>
            <text style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>
                Address
            </text>
            <input type='address'
                //placeholder='Password'
                name='address'
                value={buyer.address}
                required
                onChange={onChangeInput}
                className='form-control form-group' />
        </div>

        <div className='Col-sm-12'>

            <div className='form-group col-md-6 mb-3'>
    <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Province</label>
    <select className="form-select" placeholder="Province" value={location.selectedProvince} required onChange={changeProvince}>
      <option className='option' value=''>All</option>
      {location.provinces.map((c, key) => {
        return <option className='option' key={key} value={c.name}>{c.name}</option>;
      })}
    </select>
  

            </div>

            <div className='form-group col-md-6 mb-3'>
            <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>City</label>
    <select className="form-select" placeholder="City" value={location.selectedCity} required onChange={changeCity}>
      <option className='option' value=''>All</option>
      {location.cities.map((e, key) => {
        return <option className='option' key={key} value={e.name}>{e.name}</option>;
      })}
    </select>


        </div>

</div>


        <div className='col-md-8 form-group mb-3'>
            <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Image</label>
            <input type="file" name='image' value={buyer.image} onChange={onChangeInput} className='form-control form-group' />
        </div>


       
    </form>


   </div>
</div>
        </div>
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Order Summary</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                  {userCartDetails.map ? userCartDetails.map((ad) => {
                      return(<li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">{ad.name}</h6>
                  </div>
                  <span class="text-muted">Rs. {ad.price}</span>
                </li>)
                  }) : null}
                
                
                
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (PKR)</span>
                  <strong>Rs. {total}</strong>
                </li>
              </ul>
              <div className='checkout'>
                            <button className='checkout_button' onClick={checkoutSubmit}>
                                <span>Checkout</span>
                            </button>
                    </div>
              
              </div>
              
        </div>
    </div>
  )
}

export default Checkout