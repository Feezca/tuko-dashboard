import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/auth/page";

function App() {
  const router = createBrowserRouter([
    { path: "login", element: <AuthPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
