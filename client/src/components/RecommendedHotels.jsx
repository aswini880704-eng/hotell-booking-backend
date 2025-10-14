import React, { useEffect, useState } from 'react';
import Hotelcard from './Hotelcard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';


const RecommendedHotels = () => {
const {rooms ,searchedCities} = useAppContext();
const [recommended, setRecommended] = useState([]);

const filterHotels = ()=>{
  const filteredHotels = rooms.slice().filter( room => searchedCities.includes(room.hotel.city));

}

useEffect(()=>{
  filterHotels()
},[rooms, searchedCities])


if (!recommended || recommended.length === 0) 
    return   (
        <div className='flex flex-col items-center
        px-6 md:px-16 lg:px-24 bg-slate-50 py-20' >
<Title title='Recommended Hotels'
subTitle='Discover our handpicked selection of exceptional
properties around the world, offering unparalleled luxury 
and unforgettable experiences.'/>



          <div className='flex items-center justify-between mb-20'>
            {recommended.slice(0, 4).map((room, index)=>(
             <Hotelcard  key={room._id} room={room} index={index}  />


            ))}
          </div>



        </div>
    );
};

export default RecommendedHotels;