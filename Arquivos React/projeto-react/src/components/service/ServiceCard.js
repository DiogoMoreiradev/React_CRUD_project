import styles from './ServiceCard.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { BsFillTrashFill } from 'react-icons/bs'
import { useState } from 'react'

function ServiceCard({ id, name, cost, description, handleRemove }) {
  const [show, setShow] = useState(false)

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
    setShow(false)
  }
  const handleClose = () => {
    setShow(false)
  }
  const showModal = () => {
    setShow(true)
  }

  return (
    <div className={styles.service_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost} 
      </p>
      <p>{description}</p>
      <div className={styles.service_card_actions}>
        <button onClick={showModal}>
          <BsFillTrashFill />
          Excluir
        </button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir serviço</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente excluir?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={remove}>
          <BsCheckLg /> Excluir
          </Button>
          <Button variant="danger" onClick={handleClose}>
          <BsXLg /> Cancelar 
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  )
}

export default ServiceCard