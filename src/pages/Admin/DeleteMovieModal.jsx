import { Modal, message } from 'antd';
import { deleteMovie } from '../../calls/movies'
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const DeleteMovieModal = ({isDeleteModalOpen, setIsDeleteModalOpen, selectedMovie, setSelectedMovie, getData}) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const navigation = () => {
      if(user.role === 'partner') {
        navigate('/partner');
      } else if(user.role === 'user') {
        navigate('/');
      }
    }

    useEffect(() => {
      navigation();
    }, [])

    const dispatch =  useDispatch()
    const handleOk = async () => {
        try{
            dispatch(showLoading);
            const movieId = selectedMovie._id;
            const response = await deleteMovie({ movieId });
          
            if(response.success){
              console.log("id and respone ->  " , movieId, response);
                message.success(response.message);
                getData();
            }else{
                message.error(response.message);
                setSelectedMovie(null);
            }
            setIsDeleteModalOpen(false);
            dispatch(hideLoading);
            
        }catch(err){
            dispatch(hideLoading);
            setIsDeleteModalOpen(false)
            message.error(err.messagae);
        }        
    };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <Modal title="Delete Movie?" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p className='pt-3 fs-18'>Are you sure you want to delete this movie?</p>
            <p className='pb-3 fs-18'>This action can't be undone and you'll lose this movie data.</p>
      </Modal>
    </>
  );
};

export default DeleteMovieModal;