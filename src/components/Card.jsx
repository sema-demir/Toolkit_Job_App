import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteJob } from "../redux/slices/jobSlice";
const Card = ({ job }) => {
  const dispatch = useDispatch();
  const colors = {
    Mülakat: "green",
    Reddedildi: "red",
    "Devam Ediyor": "orange",
  };
  const handleDelete = () => {
    if (confirm("Silmek istediğinizden emin misiniz ? ")) {
      // api isteği at
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        // başarılı olursa storedan kaldır
        .then(() => {
          dispatch(deleteJob(job.id));
          toast.success("İşleminiz basarıyla kaldırıldı");
        })
        .catch((err) => {
          toast.error("Üzgünüz İşlem Gerçekleşmedi");
        });
    }
  };
  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{new Date(job.date).toLocaleDateString("tr")}</p>
        </div>
        <div className="status">
          <p
            style={{
              background: colors[job.status],
            }}
          >
            {job.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
