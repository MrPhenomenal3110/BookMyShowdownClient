import React, { Children } from 'react'
import { useNavigate } from 'react-router-dom'
import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import MovieFrom from './MovieForm'
import { useSelector } from 'react-redux'

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const navigation = () => {
    if(user.role === 'partner') {
      navigate('/partner');
    } else if(user.user.role === 'user') {
      navigate('/');
    }
  }

  useEffect(() => {
    navigation();
  }, [])

    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>

        },

        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ]


  return (
    <div>
        <h1>Admin Page</h1>



        <Tabs items={tabItems}/>


    </div>
  )
}

export default Admin