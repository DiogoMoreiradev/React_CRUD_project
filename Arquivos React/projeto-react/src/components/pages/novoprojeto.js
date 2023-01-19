import styles from "./novoprojeto.module.css"
import ProjectForm from "../project/ProjectForm"
import { useNavigate } from "react-router-dom"
function NovoProjeto() {

 


  const navigate = useNavigate() // Hook para o redirecionamento

  function createPost(project) { // vai enviar as informações inseridas através do método POST
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { // define o tipo de conteudo e para onde vai ser enviado
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(project),

    }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        // depois do redirecionamenredirecionamento
        navigate("/projetos", {state: {message: 'O projeto foi criado com sucesso!'}})
        
      })

      .catch((err) => console.log(err)) // caso der erro

  }

  return (
    <div className={styles.projeto}>
      <h1>Criar Projeto</h1>
      <p>Criar seu projeto para depois adicionar os serviços</p>
      <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />




    </div>
  )
}


export default NovoProjeto