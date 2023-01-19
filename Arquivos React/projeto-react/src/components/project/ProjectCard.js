import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'
import React from 'react'
import { useState } from 'react'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import Card from 'react-bootstrap/Card';

function ProjectCard({ id, name, budget, category, handleRemove }) {
  const [show, setShow] = useState(false)
  const remove = (e) => {
    setShow(true)
    e.preventDefault()
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleDeleteItem = () => {
    handleRemove(id)
    setShow(false)
  }

  return (
    
    <div className={styles.project_card}>
      <Card
          bg={'Dark'.toLowerCase()}
          key={'Dark'}
          text={'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
         <h4> <Card.Header> {name} </Card.Header></h4>
          <Card.Body>
           <Card.Title></Card.Title>
           
            <p>
            <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
            <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
           
            <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <button><BsPencil /> Editar
          </button>
        </Link>
        <button onClick={remove}>
    
          <BsFillTrashFill />
          Excluir
        </button>
          </div>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente excluir?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDeleteItem}>
          <BsCheckLg /> Excluir
          </Button>
          <Button variant="danger" onClick={handleClose}>
          <BsXLg /> Cancelar 
          </Button>
        </Modal.Footer>
      </Modal>
      
      </div>

  )
}

export default ProjectCard