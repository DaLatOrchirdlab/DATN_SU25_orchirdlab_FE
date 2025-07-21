import { useNavigate } from "react-router-dom";

import { useSeedlingForm } from "../../context/SeedlingFormContext";
import type {
  Seedling,
  SeedlingApiResponse,
  SeedlingCharacteristic,
} from "../../types/Seedling";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
export default function SeedlingSummary() {
  const navigate = useNavigate();
  const { form } = useSeedlingForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchSeedlings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://net-api.orchid-lab.systems/api/seedling?pageNumber=1&pageSize=100"
        );
        const data = (await res.json()) as SeedlingApiResponse;
        setSeedlings(data.value.data || []);
      } catch {
        setSeedlings([]);
      } finally {
        setLoading(false);
      }
    };
    void fetchSeedlings();
  }, []);

  const father = seedlings.find((s) => String(s.id) === String(form.fatherID));
  const mother = seedlings.find((s) => String(s.id) === String(form.motherID));

  async function handleCreate() {
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      motherID: mother?.localName,
      fatherID: father?.localName,
      doB: form.doB,
      characteristics: (form.characteristics || []).map(
        (c: SeedlingCharacteristic) => ({
          value: isNaN(Number(c.value)) ? c.value : Number(c.value),
          seedlingAttribute: {
            name: c.seedlingAttribute.name,
            description: c.seedlingAttribute.description ?? "",
          },
        })
      ),
    };
    try {
      const res = await fetch(
        "https://net-api.orchid-lab.systems/api/seedling",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Tạo cây giống thất bại");
      setShowSuccess(true);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Có lỗi xảy ra";
      setError(errMsg ?? "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

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
            <span className="font-semibold">Cây giống 1:</span>{" "}
            {father ? father.localName : form.fatherID}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cây giống 2:</span>{" "}
            {mother ? mother.localName : form.motherID}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mô tả:</span> {form.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Ngày sinh:</span> {form.doB}
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
                    <td className="py-2 px-4">{c.seedlingAttribute.name}</td>
                    <td className="py-2 px-4">{c.value}</td>
                    <td className="py-2 px-4">
                      {c.seedlingAttribute.description}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
            onClick={() => void navigate("/seedlings/new/characteristics")}
          >
            Trở về
          </button>
          <button
            type="button"
            className="bg-green-800 cursor-pointer text-white px-8 py-2 rounded font-semibold hover:bg-green-900 transition"
            onClick={() => void handleCreate()}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo"}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[320px] flex flex-col items-center">
            <FaCheckCircle className="text-green-600 text-5xl mb-4" />
            <div className="text-green-700 text-2xl font-bold mb-4">
              Tạo cây giống thành công!
            </div>
            <button
              type="button"
              className="bg-green-800 text-white px-6 py-2 rounded font-semibold hover:bg-green-900 transition"
              onClick={() => void navigate("/seedlings")}
            >
              Trở về danh sách
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
