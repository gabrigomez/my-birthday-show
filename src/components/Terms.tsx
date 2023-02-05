import * as React from 'react';
import { BiCake } from 'react-icons/bi';
import { FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Terms = () => {
  return (
    <div className='flex flex-col items-center mx-4'>
      <Link className='flex items-center my-4 group' to='/'>
        <div className='flex'>
          <BiCake className='text-7xl group-hover:text-slate-900' />
          <FaMusic className='text-2xl text-green-400 group-hover:scale-75 duration-300'/>
        </div>
      </Link>
      <div className='flex flex-col items-center w-80 mx-2 p-4 shadow-lg border rounded-xl border-slate-200'>
        <p className='text-center text-md mb-4'>
          My Birthday Show utiliza a API do Spotify para consultar os dados do perfil do usuário (músicas e artistas 
          mais ouvidos). Ao clicar no botão de permissão, o usuário concorda em fornecer o acesso a tais informações
          pelo aplicativo.
        </p>
        <p className='text-center text-md mb-4'>
          Nenhum conteúdo sensível é acessado ou alterado. Os dados obtidos pelo My Birthday Show não são
          armazenados ou compartilhados com terceiros. Sua utilização se limita apenas para os fins da aplicação, ou seja, 
          a montagem do setlist personalizado conforme o histórico de músicas e artistas ouvidos.
        </p>
        <p className='text-center text-md mb-4'>
          O usuário pode revogar o acesso do My Birthday Show ao seu perfil a qualquer momento. Para isso, basta
          seguir os passos fornecidos pela <a className='text-green-500' href="https://support.spotify.com/us/article/spotify-on-other-apps/">
          página de suporte do Spotify.</a>
        </p>
      </div>        
    </div>
  )
}