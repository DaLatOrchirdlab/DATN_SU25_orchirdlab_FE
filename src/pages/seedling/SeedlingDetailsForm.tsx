import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useSeedlingForm } from "../../context/SeedlingFormContext";

const parentOptions = ["Dendrobium Nobile", "Phalaenopsis White"];
const parent1Options = ["Dendrobium Biggibum", "Phalaenopsis Pink"];

export default function SeedlingDetailsForm() {
  const navigate = useNavigate();
  const { form, setForm } = useSeedlingForm();
  const [touched, setTouched] = useState(false);

  const isValid =
    form.name &&
    form.parent &&
    form.parent1 &&
    form.description &&
    form.dateOfBirth;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNext() {
    setTouched(true);
    if (isValid) navigate("/seedlings/new/characteristics");
  }

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 ">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Thêm cây giống mới
      </h2>
      <div className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-green-800 mb-6">
          Chi tiết cây giống
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Tên *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Nhập tên cây giống"
            />
            {touched && !form.name && (
              <div className="text-red-500 text-sm">Bắt buộc</div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Cây bố *</label>
              <select
                name="parent"
                value={form.parent}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Chọn cây bố</option>
                {parentOptions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              {touched && !form.parent && (
                <div className="text-red-500 text-sm">Bắt buộc</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Cây mẹ *</label>
              <select
                name="parent1"
                value={form.parent1}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Chọn cây mẹ</option>
                {parent1Options.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              {touched && !form.parent1 && (
                <div className="text-red-500 text-sm">Bắt buộc</div>
              )}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Miêu tả *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Nhập mô tả chi tiết về cây giống..."
            />
            {touched && !form.description && (
              <div className="text-red-500 text-sm">Bắt buộc</div>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Ngày sinh *</label>
            <div className="flex items-center gap-2">
              <input
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="border rounded px-4 py-2 flex-1"
              />
            </div>
            {touched && !form.dateOfBirth && (
              <div className="text-red-500 text-sm">Bắt buộc</div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
            onClick={() => navigate("/seedlings")}
          >
            Hủy
          </button>
          <button
            type="button"
            className="bg-green-800 cursor-pointer text-white px-8 py-2 rounded font-semibold hover:bg-green-900 transition"
            onClick={handleNext}
          >
            Tiếp theo
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-2">* Các trường bắt buộc</div>
      </div>
    </main>
  );
}
