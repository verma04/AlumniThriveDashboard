import React, { useState } from "react";
import { Button, Modal } from "antd";
import {
  addMentorShipCategory,
  deleteMentorShipCategory,
} from "../../../graphql/actions/mentorship/category";

const Delete = ({ isModalOpen, handleOk, handleCancel, id }) => {
  const [deleteCat, { loading }] = deleteMentorShipCategory({
    onCompleted() {
      handleCancel();
    },
  });

  const deleteCategory = () => {
    deleteCat({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  return (
    <>
      <Modal
        confirmLoading={loading}
        okText="Delete"
        title="Delete this category?"
        open={isModalOpen}
        onOk={deleteCategory}
        onCancel={handleCancel}
      >
        It'll be gone forever and we won't be able to recover it.
      </Modal>
    </>
  );
};

export default Delete;
