import Head from 'next/head'
import { useState, useRef } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
    const [ data, setData ] = useState([]);
    const getProduct = useRef('');
    const getTotal = useRef('');
    let showItem = null;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('>>>> onSubmit !!! : ',data);
        console.log('>>> producto ingresado : ',getProduct.current.value);
        console.log('>>> total ingresado : ',getTotal.current.value);

        setData([...data, {
            id: data.length,
            product: getProduct.current.value,
            total: getTotal.current.value,
        }]);

        setTimeout(() => {
            getProduct.current.value = '';
            getTotal.current.value = '';
        },100)
    }

    if( data && Object.keys(data) && Object.keys(data).length ){
        showItem = data.map(( item, key ) => {
            return (
                <article className="list-item" key={`itemList-${key}`}>
                    <h3>{item.product}</h3>
                    <label>{item.total}</label>
                </article>
            )
        });
    }

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
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="ingrese un producto" ref={getProduct}/>
                            <input type="text" placeholder="ingrese una cantidad" ref={getTotal}/>
                            <button>agregar</button>
                        </form>
                    </div>
                    <div className={styles.card}>
                        { showItem || 'no hay data' }
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
