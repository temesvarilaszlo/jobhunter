import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import { Login } from "./views/auth/Login";
import RequireAuth from "./views/auth/RequireAuth";
import {JobDetail} from "./views/job/JobDetail";
import { JobList } from "./views/job/JobList";
import './index.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

function App() {
  // console.log(data);
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <JobList/>
              // <RequireAuth>
              //   <>
              //     <p>Be vagy jelentkezve.</p>
              //   </>
              // </RequireAuth>
            }
          />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;