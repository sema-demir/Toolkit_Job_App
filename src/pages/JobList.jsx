import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import { useSelector } from "react-redux";
const JobList = ({ getJobs }) => {
  const jobState = useSelector((store) => store.jobReducer);

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
