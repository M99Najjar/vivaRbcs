import { useEffect, useState } from "react";
import { api, get } from "../api";
import ErrorsBox from "../form/ErrorsBox";
import MessagesBox from "../form/MessagesBox";
import TextInput from "../form/TextInput";
import { useAuthContext } from "../../hooks/useAuthContext";

const AddDoctor = ({ closePopup }) => {
  const { user } = useAuthContext();

  const [messages, setmessages] = useState("");
  const [errors, setErrors] = useState("");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setmessages("");
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);

    try {
      const res = await api.post("/api/products", formData, {
        headers: {
          Authorization: `Basic ${user.token}`,
        },
      });
      setmessages(res.data.message);

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const handelClose = () => {
    closePopup();
  };

  return (
    <>
      <div className="bg-white w-96 rounded-lg py-4 px-8 shadow-xl">
        {/*----- Title ----- */}
        <h1 className="text-center text-5xl mx-6 my-5">إضافة منتج</h1>
        {/*----- form ----- */}
        <form onSubmit={onsubmit}>
          <div className="flex gap-3">
            <div className="flex-1">
              <TextInput
                label="اسم المنتج"
                placeholder="مثلا: مرجع الوطني للنسائية"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
          </div>
          <TextInput
            label="الشرح"
            placeholder="مثلا: مرجع وطني راصور لطلاب الطب بطباعة ملونة"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <MessagesBox messages={messages} />
          <ErrorsBox errors={errors} />

          {/*----- buttons ----- */}
          <div className="flex justify-center gap-8 mx-6 my-3">
            <input
              type="submit"
              value="حفظ"
              className="px-4 py-2 bg-green-600 rounded-lg text-white cursor-pointer"
            />

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
