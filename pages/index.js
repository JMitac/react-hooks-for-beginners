import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
    const [ dataApi, setDataApi ] = useState([]);
    let showResult = null;

    const LIMIT = 10;
    const OFFSET = 0;
    //const URL_LIST = `/pokemon?limit=${LIMIT}&offset=${OFFSET}`;
    const URL_DETAIL = '/pokemon/6/';
    
    useEffect(() => {
        fetch(`${process.env.API_BASE}${URL_DETAIL}`)
            .then(res => res.json())
            .then(data => setDataApi(data));
    },[ setDataApi ]);
    
    useMemo(() => {
        if( dataApi && Object.keys(dataApi) && Object.keys(dataApi).length ){
            showResult = (
                <article>
                    <figure>
                        <img 
                            className="photo-pokemon"
                            src={dataApi.sprites.other.dream_world.front_default}
                            alt={dataApi.name} 
                            title={dataApi.name}/>
                    </figure>
                    <figcaption>
                        <span>{`id : ${dataApi.id}`}</span><br></br>
                        <span>{`nombre : ${dataApi.name}`}</span><br></br>
                        <span>{`altura : ${dataApi.height}`}</span><br></br>
                        <span>{`peso : ${dataApi.weight}`}</span>
                        
                    </figcaption>
                </article>
            )
        }
    }, [ dataApi ]);

    return (
        <div className={styles.container}>
            <Head>
                <title>React Hooks</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}> React Hooks </h1>
                <p className={styles.description}> practical example </p>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        { showResult || 'no hay data' }
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}
