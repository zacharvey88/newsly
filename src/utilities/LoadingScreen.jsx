import Spinner from 'react-bootstrap/Spinner';

export default () => {
  return (
    <div className="loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading, please wait...</p>
    </div>
  );
}