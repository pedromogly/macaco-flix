import { Hook, useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css';

//BASE API: https://api.themoviedb.org/3/
//URLs API: movie/now_playing?api_key=b363b2383ff31d648cda0399a532b992&language=pt-BR


function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorPage, setErrorPage] = useState(false);

    useEffect(()=>{
        
        async function loadFilmes(){
            console.log('oi');
            try {
                const response = await api.get("/movie/now_playing", {
                    params:{
                        api_key: "b363b2383ff31d648cda0399a532b992",
                        language: "pt-BR",
                        page: 1,
                    }
                });
                //console.log(response.data.results.slice(0,10));
                setFilmes(response.data.results.slice(0,10));
                setLoading(false);
            } catch (err) { 
                console.error(err);
                setErrorPage(true);
            }
        }

        loadFilmes();

    }, []);

    if(errorPage){
        return(
            <div className="loadings">
                <h2>Erro ao Carregar API</h2>
                <Link to={'/'}><button className="button">Reconectar</button></Link>
            </div>
        )
    }

    if(loading){
        return(
            <div className="loadings">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <br/>
                            <Link to={`/filme/${filme.id}`}><button className="button">Acessar</button></Link>
                        </article>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;