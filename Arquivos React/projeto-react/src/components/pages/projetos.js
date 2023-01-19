import { useEffect, useState } from "react"
import ProjectCard from "../project/ProjectCard"
import Linkbutton from "../layout/Linkbutton"
import Loading from "../layout/Loading"
import { useLocation } from 'react-router-dom'
import styles from './projetos.module.css'
import Message from '../layout/Message'
import Container from '../layout/Container'


function Projetos() {
  const location = useLocation() 
  let message = '' // verificando se a mensagem existe
  if (location.state) {
    message = location.state.message // setando o useLocation na mensagem para assim que carregar a página ela aparecer
  }
 
 
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
  
   
  
    useEffect(() => {
      // Para ver o loading
      setTimeout(
        () =>
          fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              setProjects(data)
              setRemoveLoading(true)
            }),
        100,
      )
    }, [])
  
    function removeProject(id) {
      setProjectMessage('')
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(projects.filter((project) => project.id !== id))
          setProjectMessage('Projeto removido com sucesso!')
        })
    }
    
  
    return (
      <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>Meus Projetos</h1>
          <Linkbutton to="/novoprojeto" text="Criar projeto" />
        </div>
        {message && <Message type="success" msg={message}/>}
        {projectMessage && <Message type="success" msg={projectMessage} />}
        <Container customClass="start">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={removeProject}
              />
              
            ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <h3>Não há projetos cadastrados!</h3>
          )}
        </Container>
      </div>
    )
  }

  
export default Projetos