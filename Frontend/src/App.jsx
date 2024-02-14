import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/student/Index";
import Main from "./components/tecaher/Main";
import AddMarks from "./components/tecaher/AddMarks";
import AddAttendance from "./components/tecaher/AddAttendance";
import store from "./store/store";
import { Provider } from "react-redux";
import StudentForm from "./components/tecaher/StudentForm";
import ChangePassword from "./components/student/ChangePassword";
import Course from "./components/tecaher/Course";
import StudentRoutes from "./helper/StudentRoutes";
import AdminRoutes from "./helper/AdminRoutes";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<StudentRoutes />}>
            <Route path="/" element={<Index />} />
            <Route path="/changePass" element={<ChangePassword />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<Main />} />
            <Route path="/admin/Student" element={<StudentForm />} />
            <Route path="/admin/addmarks" element={<AddMarks />} />
            <Route path="/admin/course" element={<Course />} />
            <Route path="/admin/addattendance" element={<AddAttendance />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
