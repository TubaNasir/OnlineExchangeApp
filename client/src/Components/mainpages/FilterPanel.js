import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import { getCategoryInfoAPI } from '../../api/CategoryAPI'
import '../UI/FilterPanel.css'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  thumb: {
    color: 'darkslategrey'
  },
  rail: {
    color: 'rgba(0,0,0,.26)',
  },
  track: {
    color: 'darkslategrey'
  }
});

export const FilterPanel = () => {
  const classes = useStyles();
  const state = useContext(GlobalState)

  const [price, setPrice] = state.AdvertisementAPI.price
  const [location, setLocation] = useState({
    provinces: [],
    cities: [],
    selectedProvince: '',
    selectedCity: ''
  });
  const [city, setCity] = state.AdvertisementAPI.city
  const [province, setProvince] = state.AdvertisementAPI.province
  const [sortPrice, setSortPrice] = state.AdvertisementAPI.sortPrice
  const [sortAds, setSortAds] = state.AdvertisementAPI.sortAds

  const updateRange = (e, data) => {
    setPrice(data);
  };

  const labels = [
    {
      value: 50,
      label: "Rs 50",
    },
    {
      value: 100,
      label: "Rs 100",
    },
    {
      value: 150,
      label: "Rs 150",
    },
    {
      value: 200,
      label: "Rs 200",
    },
    {
      value: 250,
      label: "Rs 250",
    },
    {
      value: 500,
      label: "Rs 500",
    },
    {
      value: 1000,
      label: "Rs 1000",
    },
  ];




  useEffect(() => {
    setLocation(prevState => ({
      ...prevState,
      provinces: [

        {
          name: "Sindh",
          cities: [
            {
              name: "Karachi"
            },
            {
              name: "Hyderabad"
            }
          ]
        },
        {
          name: "Punjab",
          cities: [
            {
              name: "Lahore"
            },
            {
              name: "Multan"
            }
          ]
        }
      ]
    }));
  }, [])

  console.log(location)

  const updateLocation = newLocation => {
    setLocation({ ...location, ...newLocation });
  };

  const changeProvince = event => {
    if (event.target.value === '') {
      updateLocation({
        selectedProvince: '',
        cities: []
      })
      setProvince('')
    }
    else {
      updateLocation({
        selectedProvince: event.target.value,
        cities: location.provinces.find(p => p.name === event.target.value).cities
      });

      setProvince('province=' + event.target.value)
    }

  };

  const changeCity = event => {
    if (event.target.value === 'All') {
      updateLocation({ selectedCity: '' })
      setCity('')
    } else {
      updateLocation({ selectedCity: event.target.value })
      setCity('city=' + location.selectedCity)
    }
  }


  return (
    <div>
      <div className='container' style={{ marginBottom: '30px' }}>
        <h5>
          FILTERS
        </h5>
        <hr
          style={{
            backgroundColor: '#54514a',
            height: 3,
            margin: '20px 0'
          }}
        />
        <p className='label'>Location</p>
        <div className="form-group">
          <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Province</label>
          <select className="form-select" placeholder="Province" value={location.selectedProvince} onChange={changeProvince}>
            <option className='option' value=''>All</option>
            {location.provinces.map((c, key) => {
              return <option className='option' key={key} value={c.name}>{c.name}</option>;
            })}
          </select>
        </div>


        <div className="form-group">
          <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>City</label>
          <select className="form-select" placeholder="City" value={location.selectedCity} onChange={changeCity}>
            <option className='option'>All</option>
            {location.cities.map((e, key) => {
              return <option className='option' key={key} value={e.name}>{e.name}</option>;
            })}
          </select>
        </div>


        <hr
          style={{
            backgroundColor: 'dimgrey',
            height: 3,
            margin: '30px 0'
          }}
        />
        <p className='label-range'>Price</p>
        <div className={classes.root}>
          <Slider
            value={price}
            onChange={updateRange}
            valueLabelDisplay='on'
            min={0}
            max={100000}
            classes={{
              thumb: classes.thumb,
              rail: classes.rail,
              track: classes.track
            }}

          />

        </div>

        <hr
          style={{
            backgroundColor: '#54514a',
            height: 3,
            margin: '20px 0'
          }}
        />

        <h5>
          SORTING
        </h5>
        <hr
          style={{
            backgroundColor: '#54514a',
            height: 3,
            margin: '20px 0'
          }}
        />
        <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Price</label>
        <div className="form-group">
          <select className="form-select" placeholder="Select" value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
            <option className=''>None</option>
            <option value='sort=-price'>High-Low</option>
            <option value='sort=price'>Low-High</option>
          </select>
        </div>

        <label style={{ marginTop: 5, marginBottom: 5, fontWeight: 500 }}>Ads</label>
        <div className="form-group">
          <select className="form-select" placeholder="Select" value={sortAds} onChange={(e) => setSortAds(e.target.value)}>
            <option value=''>New-Old</option>
            <option value='sort=createdAt'>Old-New</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default FilterPanel