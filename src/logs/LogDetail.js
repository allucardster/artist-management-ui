import { useEffect, useState } from "react";
import { Alert, Modal, Spinner } from "react-bootstrap";
import { useQuery } from "react-fetching-library";
import { useHistory, useParams } from "react-router";
import { readLogAction } from "../api/actions/log";

function LogDetail() {
  const history = useHistory();
  const { logId } = useParams();
  const [log, setLog] = useState({
    id: '',
    type: '',
    table_name: '',
    row_id: '',
    updated_at: '',
    updated_by: '',
    changes: {}
  });
  const { loading, error, payload } = useQuery(
    readLogAction(logId)
  );

  useEffect(() => {
    if (payload) {
      setLog({...payload});
    }
  }, [payload]);

  if (loading) {
    return (
      <Modal show backdrop="static" keyboard={false} animation={false}>
        <Modal.Body>
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    console.log('Unable to load log');
  }

  const handleClose = () => {
    history.goBack();
  }

  const getLogDetail = () => {
    const {id, ...rest} = log;
    return rest;
  }

  return (
    <Modal show animation={false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Changes
        <Alert variant="secondary">
          <pre>
            {JSON.stringify(getLogDetail(), null, 2)}
          </pre>
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default LogDetail;