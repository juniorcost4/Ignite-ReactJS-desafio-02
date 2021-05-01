import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api";

import { SideBar } from '../SideBar';
import { Content } from '../Content';

import '../../styles/body.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const Body = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    })
  }, []);

  useEffect(() => {
    api.get<MovProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const handleClickButton = (id: number) => {
    setSelectedGenreId(id);
  }

  return (
    <div className="wrapper">
      <SideBar genres={genres} handleClickButton={handleClickButton} selectedGenreId={selectedGenreId}/>
      <Content movies={movies} selectedGenre={selectedGenre}/>
    </div>
  );
}