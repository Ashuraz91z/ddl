// app/page.js
import Header from '../components/Header';
  import Footer from '../components/Footer';
  import Sidebar from '../components/Sidebar';
  import MapComponent from '../components/Map';


  export default function HomePage() {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-4 h-screen">
            <MapComponent />
          </main>
          <Footer />
        </div>
      </div>
    );
  }
