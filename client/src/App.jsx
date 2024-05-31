import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import { Login } from "./views/auth/Login";
import RequireAuth from "./views/auth/RequireAuth";

function App() {
  // console.log(data);
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <>
                  <p>Be vagy jelentkezve.</p>
                </>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;