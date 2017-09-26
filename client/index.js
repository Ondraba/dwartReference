import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Provider as FelaProvider } from 'react-fela';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

import ContentList from './components/ContentList';
import AddContent from './components/AddContent';

import { createRenderer } from 'fela'
import layoutDebugger from 'fela-layout-debugger'

const renderer = createRenderer({
  enhancers: [ layoutDebugger() ]
})


const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <FelaProvider renderer={renderer}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={SongList}/>
            <Route path="content" component={ContentList} />
            <Route path="content/add" component={AddContent} />
            <Route path="songs/new" component={SongCreate} />
              <Route path="songs/:id" component={SongDetail} />
              //:id react router variable, kterou obrzi v props
          </Route>
        </Router>
      </FelaProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
