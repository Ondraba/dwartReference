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
import UpdateContent from './components/UpdateContent';
import ContentDetail from './components/ContentDetail';

import AddComment from './components/AddComment';

import AdminDriver from './components/AdminDriver';
import PublicDriver from './components/PublicDriver';
 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={SongList}/>
            <Route path="content" component={ContentList} />
            <Route path="content/add" component={AddContent} />
            <Route path="admin" component={AdminDriver} />
            <Route path="public" component={PublicDriver} />
            <Route path="songs/new" component={SongCreate} />
            <Route path="songs/:id" component={SongDetail} />
            <Route path="contentDetail/:id" component={ContentDetail} />
            <Route path="AddComment" component={AddComment} />
            <Route path="updateContent/:id" component={UpdateContent} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render( 
  <Root />,
  document.querySelector('#root')
);
