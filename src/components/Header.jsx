import Navbar from "./header-components/Navbar";
import TopicsBar from "./header-components/TopicsBar";

export default () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, backgroundColor: '#fff'}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 20px' }}>
        <Navbar />
        <TopicsBar />
      </div>
    </div>
  );
}
