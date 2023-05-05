import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";
import { Profile } from "./pages/profile";
import { Profile } from "./pages/profile";
import { Store } from "./pages/store";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
  { path: '/profile/:username', element: <Profile /> },
  { path: '/profile/:username', element: <Profile /> },
  { path: '/store/:storename', element: <Store /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

