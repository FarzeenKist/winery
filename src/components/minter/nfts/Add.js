/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form } from "react-bootstrap";
import { uploadToIpfs } from "../../../utils/minter";


const AddNfts = ({ save }) => {
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [show, setShow] = useState(false);


  // check if all form data has been filled
  const isFormFilled = () => name && ipfsImage && price && description;
      

  // close the popup modal
  const handleClose = () => {
    setShow(false);
    // setAttributes([]);
  };

  // display the popup modal
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button"
        onClick={handleShow}
        className="add_wine_btn mb-4"
     >Add <i class="bi bi-plus"></i></button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title
            style={{ color: "#531c1c", width: "100%", textAlign: "center" }}
          >Create Wine NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Wine Name"
              className={"mb-3"}
              style={{ height: "45px", fontSize: "0.9rem" }}
              onChange={(e) => {
                setName(e.target.value.trim());
              }}
            />
            <Form.Control
              as="textarea"
              placeholder="Wine Description"
              className={"mb-3"}
              style={{ height: "80px", fontSize: "0.9rem" }}
              onChange={(e) => {
                setDescription(e.target.value.trim());
              }}
            />
            <Form.Control
              type="number"
              placeholder="Price"
              className={"mb-3"}
              style={{ height: "45px", fontSize: "0.9rem" }}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Form.Control
              type="file"
              placeholder="Wine Image"
              className={"mb-3"}
              onChange={async (e) => {
                console.log(e.target.files)
                const image_file = e.target.files
                console.log(image_file)
                
                const imageUrl = await uploadToIpfs(image_file);
                if (!imageUrl) {
                  alert("Failed to upload image");
                  return;
                }
                setIpfsImage(imageUrl);
              }}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer  className="modal_footer">
          <button className="close_btn" onClick={handleClose}>
            Close
          </button>
          <button
            className="create_btn"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                name,
                price,
                ipfsImage,
                description
              });
              handleClose();
            }}
            >
            Create NFT
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddNfts.propTypes = {

  // props passed into this component
  save: PropTypes.func.isRequired,
  // address: PropTypes.string.isRequired,
};

export default AddNfts;
