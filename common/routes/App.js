import React from 'react';
import { connect } from 'dva';
import styles from './App.css';

function App({ dispatch, user }) {
  return (
    <div>
      <h1>App</h1>
      <h2 className={styles.title}>User</h2>
      {
        user.map(({ id, name }) => <div key={id}>- {name}</div>)
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
