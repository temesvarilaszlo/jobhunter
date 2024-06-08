import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import { Login } from "./views/auth/Login";
import RequireAuth from "./views/auth/RequireAuth";
import { JobDetail } from "./views/job/JobDetail";
import { JobList } from "./views/job/JobList";
import { Register } from "./views/auth/Register";
import { Profile } from "./views/profile/Profile";


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
                            <JobList />
                            // <RequireAuth>
                            //   <>
                            //     <p>Be vagy jelentkezve.</p>
                            //   </>
                            // </RequireAuth>
                        }
                    />
                    <Route path="/jobs/:jobId" element={<JobDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;