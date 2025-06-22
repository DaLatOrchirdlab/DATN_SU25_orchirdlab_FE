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
    steps: [{ title: "", content: "" }],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStepChange = (
    idx: number,
    field: "title" | "content",
    value: string
  ) => {
    const steps = [...form.steps];
    steps[idx][field] = value;
    setForm({ ...form, steps });
  };

  const handleAddStep = () => {
    setForm({ ...form, steps: [...form.steps, { title: "", content: "" }] });
  };

  const handleRemoveStep = (idx: number) => {
    const steps = form.steps.filter((_, i) => i !== idx);
    setForm({ ...form, steps });
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
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50">
      <button
        className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-4 hover:bg-green-800 hover:text-white transition"
        onClick={() => navigate(-1)}
      >
        ← Trở về
      </button>
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Thêm phương pháp mới
      </h2>
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
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
          {/* Quy trình chi tiết */}
          <div>
            <label className="block font-medium mb-2">Quy trình chi tiết</label>
            {form.steps.map((step, idx) => (
              <div
                key={idx}
                className="mb-4 border rounded p-3 relative bg-gray-50"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Tiêu đề bước
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(idx, "title", e.target.value)
                    }
                    placeholder={`Bước ${idx + 1}: ...`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nội dung
                  </label>
                  <textarea
                    className="w-full border rounded px-3 py-2"
                    value={step.content}
                    onChange={(e) =>
                      handleStepChange(idx, "content", e.target.value)
                    }
                    placeholder="Mô tả chi tiết bước này..."
                    required
                  />
                </div>
                {form.steps.length > 1 && (
                  <button
                    type="button"
                    className="absolute cursor-pointer top-2 right-2 text-red-600 hover:underline text-sm"
                    onClick={() => handleRemoveStep(idx)}
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-green-100 cursor-pointer text-green-800 px-4 py-1 rounded font-semibold hover:bg-green-200 transition"
              onClick={handleAddStep}
            >
              + Thêm bước
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-green-900 transition"
          >
            {loading ? "Đang lưu..." : "Lưu phương pháp"}
          </button>
        </form>
      </div>
    </main>
  );
}
