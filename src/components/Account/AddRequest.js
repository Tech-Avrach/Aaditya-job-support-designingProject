import React, { useState } from 'react'
import { Button } from "reactstrap";
import ModalComponent from "./ModalComponent";
import { useParams } from 'react-router-dom';


const AddRequest = () => {
  const [open, setOpen] = useState(false)
  const { id } = useParams();
  console.log(id)

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Button color="primary" onClick={() => setOpen(true)}>Add Transcripts</Button>

        <ModalComponent
          isOpen={open}
          toggleModal={() => setOpen(!open)}
      />
    </div>
    

  )
}

export default AddRequest