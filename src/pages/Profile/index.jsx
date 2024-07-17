import React from 'react';
import { Tabs } from 'antd';
import Bookings from './Bookings';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user)
  console.log(user)
  let admin = false;
  let partner = false;
  console.log(user.role)

  if(user.role === 'admin') {
      admin = true;
  } 
  if(user.role === 'partner') {
      partner = true;
  }
  const items = [
    {
      key: '1',
      label: 'Bookings',
      children: <Bookings/>,
    },
  ];
  console.log(admin)
  console.log(partner)
  if(!admin && !partner) {
    return (
        <>
        <h1>User Profile Page</h1>
        <span>Name : <b>{user.name}</b></span>
            {<Tabs defaultActiveKey="2" items={items} />}
        </>
    )
  } else if(admin) {
    return (
      <>
        <h1>Admin Profile Page</h1>
        <span>Name : <b>{user.name}</b></span>
        </>
    ) 
  } else {
      return(
        <>
          <h1>Partner Profile Page</h1>
          <span>Name : <b>{user.name.toUpperCase()}</b></span>
        </>
      )
    }

}

export default Profile;