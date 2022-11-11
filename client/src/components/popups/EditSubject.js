import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { api, get } from "../api";
import DropDown from "../form/DropDown";
import ErrorsBox from "../form/ErrorsBox";
import MessagesBox from "../form/MessagesBox";
import TextInput from "../form/TextInput";

const yearsList = [
  { year_id: 2, year_name: 2 },
  { year_id: 3, year_name: 3 },
  { year_id: 4, year_name: 4 },
  { year_id: 5, year_name: 5 },
];
const seasonList = [
  { season_id: 1, season_name: 1 },
  { season_id: 2, season_name: 2 },
];
const universitiesList = [{ university_id: 1, university_name: "جامعة تشرين" }];
const facultiesList = [
  { faculty_id: 1, faculty_name: "الطب البشري" },
  { faculty_id: 4, faculty_name: "الصيدلة" },
];

const AddDoctor = ({ closePopup, subject }) => {
  const { user } = useAuthContext();
  const defaultYear = subject.year;
  const defaultSeason = subject.season;
  const dafaultFaculty = subject.faculty_id;
  const defaultName = subject.subject_name;
  const [messages, setmessages] = useState();
  const [errors, setErrors] = useState();

  const [subjectName, setSubjectName] = useState(defaultName);

  const [selectedFaculty, selectFaculty] = useState(dafaultFaculty);
  const [selectedYear, SelectYear] = useState(defaultYear);
  const [selectedSeason, selectSeason] = useState(defaultSeason);

  const handelFacultyDropdown = async (e) => {
    const thisFaculty = e.target.value;
    selectFaculty(thisFaculty);
  };
  const handelYearDropdown = async (e) => {
    SelectYear(e.target.value);
  };
  const handelSeasonDropdown = async (e) => {
    selectSeason(e.target.value);
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setmessages("");
    const formData = new FormData();
    formData.append("subject_name", subjectName);
    formData.append("year", selectedYear);
    formData.append("season", selectedSeason);
    formData.append("faculty_id", selectedFaculty);

    try {
      const res = await api.patch(
        `/api/subjects/${subject.subject_id}`,
        formData,
        {
          headers: {
            Authorization: `Basic ${user.token}`,
          },
        }
      );
      setmessages(res.data.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      setErrors(error.res.data.error);
    }
  };

  const handelClose = () => {
    closePopup();
  };
  async function handelDel(e) {
    e.preventDefault();
    setErrors("");
    setmessages("");

    try {
      console.log(subject.subject_id);
      const res = await api.delete(`/api/subjects/${subject.subject_id}`, {
        headers: {
          Authorization: `Basic ${user.token}`,
        },
      });
      setmessages(res.data["message"]);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  return (
    <>
      <div className="bg-white w-[50rem] rounded-lg py-4 px-8 shadow-xl">
        {/*----- Title ----- */}
        <h1 className="text-center text-5xl mx-6 my-5">إضافة مادة</h1>
        {/*----- form ----- */}
        <form onSubmit={onsubmit}>
          <div className="flex gap-3">
            <div className="flex-1">
              <TextInput
                label="اسم المادةة"
                placeholder="مثلا: الفيزيولوجيا 3"
                value={subjectName}
                onChange={(e) => {
                  setSubjectName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <DropDown
                label={"الجامعة"}
                name="university"
                options={universitiesList}
              />
            </div>
            <div className="flex-1">
              <DropDown
                label={"الكلية"}
                value={selectedFaculty}
                options={facultiesList}
                name="faculty"
                onChange={handelFacultyDropdown}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <DropDown
                label={"السنة"}
                value={selectedYear}
                options={yearsList}
                name="year"
                onChange={handelYearDropdown}
              />
            </div>
            <div className="flex-1">
              <DropDown
                label={"الفصل"}
                value={selectedSeason}
                options={seasonList}
                name="season"
                onChange={handelSeasonDropdown}
              />
            </div>
          </div>
          <MessagesBox messages={messages} />
          <ErrorsBox errors={errors} />

          {/*----- buttons ----- */}
          <div className="flex justify-between gap-8 mx-6 my-3">
            <div className="flex gap-4">
              <input
                type="submit"
                value="حفظ التعديلات"
                className="px-4 py-2 bg-green-600 rounded-lg text-white cursor-pointer"
              />

              <div
                className="px-4 py-2 bg-red-600 rounded-lg text-white cursor-pointer"
                onClick={handelDel}
              >
                حذف المادة
              </div>
            </div>

            <div
              className="px-4 py-2 bg-red-600 rounded-lg text-white cursor-pointer"
              onClick={handelClose}
            >
              إلغاء
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDoctor;
