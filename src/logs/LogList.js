import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { useQuery } from 'react-fetching-library';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { logListAction } from '../api/actions/log';
import LogDetail from './LogDetail';

function LogList() {
  const { path, url } = useRouteMatch();
  const [state, setState] = useState({
    page: 1,
    per_page: 25,
    results: [],
    total: 0
  });

  const { loading, error, payload } = useQuery(
    logListAction()
  );

  useEffect(() => {
    if (payload) {
      setState({...payload});
    }
  }, [payload]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    console.log('Unable to load logs');
  }

  return (
    <React.Fragment>
      <h1>Logs</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Table Name</th>
            <th>Row Id</th>
            <th>Updated At</th>
            <th>Updated By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.results.sort((a, b) => (new Date(a.updated_at) < new Date(b.updated_at)) ? 1 : -1).map(log => {
            return (
              <tr key={log.id}>
                <td>{log.type}</td>
                <td>{log.table_name}</td>
                <td>{log.row_id}</td>
                <td>{log.updated_at}</td>
                <td>{log.updated_by}</td>
                <td>
                  <Link className="btn btn-secondary" to={`${url}/${log.id}/detail`}>
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Switch>
        <Route path={`${path}/:logId/detail`}>
          <LogDetail></LogDetail>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default LogList;