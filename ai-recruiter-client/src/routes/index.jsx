import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages";
// import JobListing from "../Pages/Admin/ActiveJobListing";



const AppRouter = () => {
  return (
    <Routes>

      {/* //Public Routes */}
      <Route index element={<HomePage />} />
      {/* <Route path={routes.jobSearch} element={<JobSearch />} /> */}
      




      {/* <Route path={routes.about} element={<About />} /> */}
      {/* <Route path={routes.privacyPolicy} element={<PrivacyPolicy />} /> */}
      


      {/* //Auth routes */}
      {/* <Route element={<AuthRoute />} >
        <Route path={routes.login} element={<Login />} />
      </Route> */}

      


        {/* <Route path={"*"} element={<NotFound />} /> */}
    </Routes >
  );
};

export default AppRouter;