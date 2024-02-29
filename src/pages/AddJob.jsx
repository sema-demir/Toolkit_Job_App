import { useNavigate } from "react-router-dom";
import { statusOptions, typeOptions } from "../constants";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jobState = useSelector((store) => store.jobReducer);
  console.log(jobState);

  //form gönderilince calısır
  const handleSubmit = (e) => {
    e.preventDefault();
    // inputlardaki verilerden bir nesne oluştur
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    // tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString("tr");
    newJobData.id = v4();
    //console.log(newJobData);

    // api'a veriyi ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      // başarılı olursa
      .then(() => {
        toast.success("Yeni iş eklendi");
        //anasayfaya yönlendir

        //store ahaber ver
        dispatch(createJob(newJobData));
        navigate("/");
      })
      // başarısız olursa
      .catch(() => {
        toast.error("Ekleme işleminde sorun oluştu.");
      });
  };
  // dizideki değerleri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    //1. sadece pozisyonlardan oluşan bir dizi tanımla
    const arr = jobState.jobs.map((job) => job[key]);

    //2. dizi içinde tekrar eden elemanı kaldır
    //dizi içerisindeki tekrar eden elemanı indexof ile bulup filter et
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);
    return filtred;
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni iş ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position_list" name="position" type="text" required />
            {/* pozisyonların her birini öneri olaraklistelemek için kullandık */}
            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="company_list" name="company" type="text" required />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="location_list" name="location" type="text" required />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" id="" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" id="" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Submit</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
