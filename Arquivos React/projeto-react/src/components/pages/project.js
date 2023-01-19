import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import Alert from 'react-bootstrap/Alert';
import { CgDanger } from "react-icons/cg"

function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')
  const [showAlertService, setShowAlertService] = useState(false)
  const [showAlert, setShowAlert] = useState(false)



  useEffect(() => {

    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.services)
          }),
      0,
    )
  }, [id])

  function editPost(project) {
    setMessage('')
    // validação do orçamento
    if (project.budget < project.cost) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return false



    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
        setMessage('Projeto atualizado!')
        setType('success')
      })
  }

  function createService(project) {
    setMessage('')
    // último serviço
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4() // criando um id pro ultimo serviço

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
   
    // validação do valor máximo
    if (newCost > parseFloat(project.budget)) {
      setShowAlertService(true)
      project.services.pop()
      setTimeout(() => {
        setShowAlertService(false)
      }, 3000)
      return false

    }

    // adiciona o custo do serviço para o custo total
    project.cost = newCost
    


    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {

        setServices(data.services)
        setShowServiceForm(!showServiceForm)
        setMessage('Serviço adicionado!')
        setType('success')
      })
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
      })
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }


  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento Atual:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                  <p>
                    <span>Total disponível:</span> R${project.budget - project.cost}
                  </p>
                </div>
              ) : (

                <div className={styles.form}>
                  <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading><CgDanger /><h2>Ocorreu Um erro!</h2></Alert.Heading>
                    <p id={styles.alertp}>
                      O Orçamento não pode ser menor que o custo do projeto!
                    </p>
                  </Alert>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />

                </div>

              )}

            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>


              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>

              <div className={styles.form}>
                <Alert show={showAlertService} variant="danger" onClose={() => setShowAlertService(false)} dismissible>
                  <Alert.Heading><CgDanger /><h2>Ocorreu Um erro!</h2></Alert.Heading>
                  <p id={styles.alertp}>
                    Orçamento ultrapassado, verifique o valor do serviço!
                  </p>
                </Alert>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />

                )}



              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    teste={service.teste}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project