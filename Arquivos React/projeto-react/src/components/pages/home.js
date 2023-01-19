import React from "react";
import styles from "./home.module.css";
import Linkbutton from "../layout/Linkbutton";
import savings from '../../img/savings.svg';

function Home() {
    return (
        <section className={styles.home}>
            <h1>Bem vindo ao <span>Costs</span></h1>
            <br></br>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <Linkbutton to="/novoprojeto" text="Criar Projeto" />
            <img src={savings} alt="Costs_home" width="300px" height="300px" />

        </section>
    )
}


export default Home