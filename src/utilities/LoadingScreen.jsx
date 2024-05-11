import Spinner from 'react-bootstrap/Spinner';

export default () => {
  return (
    <div className="loading">
      <Spinner animation="border" role="status"></Spinner>
      <p>Loading, please wait...</p>
    </div>
  );
}