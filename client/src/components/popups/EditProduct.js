import { useEffect, useState } from "react";
import { api, get } from "../api";
import ErrorsBox from "../form/ErrorsBox";
import MessagesBox from "../form/MessagesBox";
import TextInput from "../form/TextInput";
import UploadBtn from "../form/UploadBtn";
import { useAuthContext } from "../hooks/useAuthContext";

const AddDoctor = ({ closePopup, product }) => {
  const { user } = useAuthContext();

  const defaultProductName = product.product_name;
  const defaultDescription = product.description;

  const [messages, setmessages] = useState();
  const [errors, setErrors] = useState();

  const [productName, setProductName] = useState(defaultProductName);
  const [description, setDescription] = useState(defaultDescription);

  const [file, setFile] = useState("");

  const handelFileBtn = async (e) => {
    setFile(e.target.files[0]);
    setProductName(e.target.files[0].name.split(".")[0]);
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setmessages("");
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);

    try {
      const res = await api.patch(
        `/api/products/${product.product_id}`,
        {
          headers: {
            Authorization: `Basic ${user.token}`,
          },
        },
        formData
      );
      setmessages(res.data["message"]);
      window.location.reload(false);
    } catch (error) {
      setErrors("المحاضرة موجودة بالفعل");
    }
  };

  async function handelDel(e) {
    e.preventDefault();
    setErrors("");
    setmessages("");

    try {
      const res = await api.delete(`/api/products/${product.product_id}`, {
        headers: {
          Authorization: `Basic ${user.token}`,
        },
      });
      setmessages(res.data["message"]);
      window.location.reload(false);
    } catch (error) {
      setErrors("المحاضرة موجودة بالفعل");
    }
  }

  const handelClose = () => {
    closePopup();
  };

  return (
    <>
      <div className="bg-white w-[50rem] rounded-lg py-4 px-8 shadow-xl">
        {/*----- Title ----- */}
        <h1 className="text-center text-5xl mx-6 my-5">إضافة محاضرة</h1>
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
                حذف المحاضرة
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
