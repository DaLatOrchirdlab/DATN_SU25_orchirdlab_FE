import { useNavigate } from "react-router-dom";

import { useSeedlingForm } from "../../context/SeedlingFormContext";
import type { SeedlingCharacteristic } from "../../types/Seedling";
export default function SeedlingSummary() {
  const navigate = useNavigate();
  const { form } = useSeedlingForm();

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Thêm cây giống mới
      </h2>
      <div className="bg-white rounded-xl shadow p-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-green-800 mb-6">
          Chi tiết cây giống
        </h3>
        <div className="mb-6">
          <div className="mb-2">
            <span className="font-semibold">Tên:</span> {form.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cây bố:</span> {form.parent}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cây mẹ:</span> {form.parent1}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mô tả:</span> {form.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Ngày sinh:</span> {form.dateOfBirth}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Đặc trưng</h3>
        <div className="overflow-x-auto">
          <table className="w-full border rounded">
            <thead>
              <tr className="bg-green-50 text-green-800 font-semibold">
                <th className="py-2">Thuộc tính</th>
                <th className="py-2">Giá trị</th>
                <th className="py-2">Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              {form.characteristics.map(
                (c: SeedlingCharacteristic, idx: number) => (
                  <tr key={idx} className="border-t text-center">
                    <td className="py-2 px-4">{c.attribute}</td>
                    <td className="py-2 px-4">{c.value}</td>
                    <td className="py-2 px-4">{c.unit}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
            onClick={() => navigate("/seedlings/new/characteristics")}
          >
            Trở về
          </button>
          <button
            type="button"
            className="bg-green-800 cursor-pointer text-white px-8 py-2 rounded font-semibold hover:bg-green-900 transition"
            onClick={() => navigate("/seedlings")}
          >
            Tạo
          </button>
        </div>
      </div>
    </main>
  );
}
