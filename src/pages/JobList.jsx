import axios from "axios";
import { useEffect } from "react";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
const JobList = () => {
  const jobState = useSelector((store) => store.jobReducer);
  const dispatch = useDispatch();

  const getJobs = () => {
    //slicetaki yükleniyoru true cek
    dispatch(setLoading());
    axios
      .get("http://localhost:3001/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="list-page">
      {/*
      1. Yüklenme devam ediyorsa ekrana loader bas
      2. Yüklenme bittiyse hata varsa ekrana hatayı ve tekrar dene butonu bas
      3 Yüklenme bittiyse  hata yoksa kartları ekrana bas
      */}
      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
