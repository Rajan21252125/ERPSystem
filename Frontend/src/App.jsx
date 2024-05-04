import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Loading from "./helper/Loading";

// Lazy-loaded components
const Login = lazy(() => import("./components/Login"));
const Index = lazy(() => import("./components/student/Index"));
const Main = lazy(() => import("./components/tecaher/Main"));
const AddMarks = lazy(() => import("./components/tecaher/AddMarks"));
const AddAttendance = lazy(() => import("./components/tecaher/AddAttendance"));
const StudentForm = lazy(() => import("./components/tecaher/StudentForm"));
const ChangePassword = lazy(() => import("./components/student/ChangePassword"));
const Course = lazy(() => import("./components/tecaher/Course"));
const StudentRoutes = lazy(() => import("./helper/StudentRoutes"));
const AdminRoutes = lazy(() => import("./helper/AdminRoutes"));
const Elibrary = lazy(() => import("./components/student/Elibrary"));
const Profile = lazy(() => import("./components/student/Profile"));
const AddAlert = lazy(() => import("./components/tecaher/AddAlert"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<StudentRoutes />}>
              <Route path="/" element={<Suspense fallback={<Loading />}> <Index /> </Suspense>} />
              <Route path="/e-library" element={<Suspense fallback={<Loading />}> <Elibrary /> </Suspense>} />
              <Route path="/profile" element={<Suspense fallback={<Loading />}> <Profile /> </Suspense>} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<Suspense fallback={<Loading />}> <Main /> </Suspense>} />
              <Route path="/admin/Student" element={<StudentForm />} />
              <Route path="/admin/addmarks" element={<AddMarks />} />
              <Route path="/admin/course" element={<Course />} />
              <Route path="/admin/addattendance" element={<AddAttendance />} />
              <Route path="/admin/addAlert" element={<AddAlert />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/changePass" element={<ChangePassword />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
