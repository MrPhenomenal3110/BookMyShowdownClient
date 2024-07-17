import { Tabs } from 'antd';
import TheatreList from './TheatreList';
import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Partner = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const navigation = () => {
    if(user.role === 'admin') {
      navigate('/admin');
    } else if(user.role === 'user') {
      navigate('/');
    }
  }

  useEffect(() => {
    navigation();
  }, [])
      const items = [
        {
          key: '1',
          label: 'Theatres',
          children: <TheatreList/>,
        }
      ];

    return (
        <>
        <h1>Partner Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Partner;