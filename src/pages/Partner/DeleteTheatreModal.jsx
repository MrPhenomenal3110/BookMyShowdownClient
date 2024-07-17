import React from 'react';
import { Modal, message } from "antd";
import { deleteTheatre } from "../../calls/theatres";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(showLoading);
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre({ theatreId });
      console.log(theatreId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedTheatre(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading);
    } catch (err) {
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

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

  return (
    <>
      <Modal
        title="Delete Theatre?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theatre?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theatre data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteTheatreModal;