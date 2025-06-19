import { useState } from "react";
import { useNavigate } from "react-router-dom";

const methodTypes = [
  { label: "Nhân giống vô tính", value: "vo_tinh" },
  { label: "Nhân giống hữu tính", value: "huu_tinh" },
];

export default function MethodCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    parentMother: "",
    parentFather: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Gọi API tạo mới phương pháp ở đây
    // await api.createMethod(form);
    setTimeout(() => {
      setLoading(false);
      navigate("/method");
    }, 1000);
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 ">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <button
          className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-4 hover:bg-green-800 hover:text-white transition"
          onClick={() => navigate(-1)}
        >
          ← Trở về
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Thêm phương pháp mới
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Tên phương pháp</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded px-3 py-2"
              value={form.name}
              onChange={handleChange}
              placeholder="VD: Nhân giống từ lá, Thụ phấn chéo..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Loại phương pháp</label>
            <select
              name="type"
              required
              className="w-full border rounded px-3 py-2"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">-- Chọn loại --</option>
              {methodTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              rows={3}
              className="w-full border rounded px-3 py-2"
              value={form.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn về phương pháp..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-900 transition"
          >
            {loading ? "Đang lưu..." : "Lưu phương pháp"}
          </button>
        </form>
      </div>
    </main>
  );
}
