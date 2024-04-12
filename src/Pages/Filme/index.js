import { useEffect, useState } from "react";
//useNavigate é um recurso usado para redirecionar o usuário pra outra pagina
//muito usado quando uma url não é encontrada
//nesse contexto a url não consegue trazer a id do produto da API
//logo seria uma pagina que as informações do Filme não existem
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import Erro from "../Erro";
import {toast} from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate(); //como invocar um navigate, armazena numa const

    useEffect(()=>{
        async function LoadFilm(){
            await api.get(`/movie/${id}`, {
                params:{                 
                    api_key: "b363b2383ff31d648cda0399a532b992",
                    language: "pt-BR",                  
                }
            })
            .then((response)=>{
                console.log(response.data);
                setLoading(false);
                setFilme(response.data);
            })
            .catch(()=>{
                console.log("BABABOE");
                setLoading(false);
                navigate("/", { replace: true }); //invoca a navigate para a '/' (pagina inicial), 
                return;//O return é necessário para o código parar de retornar as coisas abaixo
            })
        }

        LoadFilm();
    },[])

    function salvarFilme(){
        const chaveFilmeSalvo = `@macacoFlix-${filme.id}`;
        const minhaLista = localStorage.getItem(chaveFilmeSalvo); 
        
        let filmesSalvos = JSON.parse(minhaLista) || {};
        let hasFilme = false;
        if(filmesSalvos.id === filme.id){
            hasFilme = true;
        }

        if(hasFilme){
            toast.warn('Esse filme já foi salvo na sua lista');
            return;
        };

        filmesSalvos = filme;
        localStorage.setItem(chaveFilmeSalvo, JSON.stringify(filmesSalvos));
        toast.success('Esse filme já foi salvo na sua lista');
    }

    if(loading){
        return(
            <div>
                <h1>Carregando Filme...</h1>
            </div>
        )
    }


    return(
        <div className="filme-info">
            <h4>{filme.title}</h4>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}/>
            <h6>Sinopse</h6>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <a><button className="button" onClick={salvarFilme}>Salvar</button></a>
                <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external"><button className="button">Trailer</button></a>
            </div>
        </div>
    )
}

export default Filme;