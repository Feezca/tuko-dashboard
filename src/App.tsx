import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/auth/page";
import { AuthenticationContextProvider } from "./lib/services/authenticationContext/authentication.context";
import Dashboard from "./pages/dashboard/page";
import Layout from "./pages/dashboard/Layout";
import Protected from "./pages/protected/Protected";

function App() {
  const router = createBrowserRouter([
    { path: "login", element: <AuthPage /> },
    {
      path: "dashboard",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [{ path: "", element: <Dashboard /> }],
        },
      ],
    },
  ]);

  return (
    <>
      <AuthenticationContextProvider>
        <RouterProvider router={router} />
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
