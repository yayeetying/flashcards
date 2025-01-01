import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import {Switch, Route} from 'react-router-dom';

const App = () => {
  return(
    <Switch>
      <Route exact path='/'>
        <Homepage/>
      </Route>
      <Route exact path='/editor'>
        <CardEditor />
      </Route>
      <Route exact path='/viewer/:deckID'>
        <CardViewer />
      </Route>
      <Route>
        <div> Page Not Found!  </div>
      </Route>
    </Switch>
  )
}


export default App;
