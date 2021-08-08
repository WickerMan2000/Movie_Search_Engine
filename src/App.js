import React, { Fragment, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import MovieList from './components/MoviesList';
import MoviePage from './components/MoviePage';
import Search from './components/Search';
import Spinner from './UI/Spinner';

function App() {
  const [isTyping, setIsTyping] = useState(false);

  const typingMovieName = typing => {
    setIsTyping(typing);
  };

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Search sendTypingState={typingMovieName} />
          {isTyping ? <Spinner /> : <MovieList />}
        </Route>
        <Route path="/:id">
          <MoviePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;