import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = [];
        
        for (let i=0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if(chave.startsWith('@macacoFlix-')) {
                const valorString = localStorage.getItem(chave);
                const filme = JSON.parse(valorString);
                minhaLista.push(filme);
            } 
        }

        setFilmes(minhaLista)
        console.log(minhaLista);


    },[]);

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item)=> {
            return (item.id !== id) 
        })

        const itemExcluir = `@macacoFlix-${id}`;
        localStorage.removeItem(itemExcluir);
        setFilmes(filtroFilmes);
        toast("Filme excluido!");
        
    }

    return(
        <div className="container-favo">
            <h1>Filmes Salvos</h1>
            {filmes.length === 0 ?
            <div>
                <h3>Não há filmes salvos no momento  :(</h3>
            </div>
            :
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}><button className="button">Acessar</button></Link>
                                <button className="button" onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

            }
            
        </div>
    )
}

export default Favoritos;