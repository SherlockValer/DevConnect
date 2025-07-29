import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-w-screen min-h-screen">
      <div className="loader"></div>
    </div>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 mb-20">
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
