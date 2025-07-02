import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Method } from "../../types/Method";

const methods = [
  {
    id: "093ae940-df97-41e5-9302-f1d7c8667285",
    name: "Subculturing",
    description: "Transfer to new media",
    type: "Maintenance",
    status: true,
    stages: [
      {
        name: "Media Preparation",
        description: "Prepare fresh media for transfer",
        dateOfProcessing: 1,
      },
      {
        name: "Transfer Samples",
        description: "Move samples to new containers",
        dateOfProcessing: 2,
      },
    ],
  },
  {
    id: "7280dae3-03c1-4f92-a18d-cfac60887790",
    name: "Sterilization",
    description: "Disinfect material",
    type: "Preparation",
    status: true,
    stages: [
      {
        name: "Surface Cleaning",
        description: "Initial rinse with water",
        dateOfProcessing: 1,
      },
      {
        name: "Disinfecting",
        description: "Using alcohol or bleach",
        dateOfProcessing: 2,
      },
    ],
  },
];

export default function MethodDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // fetchMethodDetail(id || "1").then((data) => {
    //   setMethod(data);
    //   setLoading(false);
    // });
    const found = methods.find((m) => String(m.id) === String(id));
    setMethod(found ?? null);
    setLoading(false);
  }, [id]);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (!method) return <div>Không tìm thấy phương pháp.</div>;

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <button
        type="button"
        className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-4 hover:bg-green-800 hover:text-white transition"
        onClick={() => void navigate(-1)}
      >
        ← Trở về
      </button>
      <div className="max-w-full mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-2 text-green-800">
          {method.name}
        </h2>
        <div className="mb-2">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {method.type}
          </span>
        </div>
        <div className="mb-4 text-gray-700">{method.description}</div>
        <h3 className="text-lg font-semibold mb-2">Quy trình chi tiết:</h3>
        <ol className="ml-6 space-y-3">
          {method.stages?.map((stage, idx) => (
            // eslint-disable-next-line react-x/no-array-index-key
            <li key={stage.name + idx} className="mb-4 list-decimal">
              <div className="font-semibold">{stage.name}</div>
              <div className="text-gray-700">{stage.description}</div>
              <div className="text-gray-700">
                Ngày xử lý: {stage.dateOfProcessing} ngày
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
        >
          Sửa
        </button>
        <button
          type="button"
          className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
        >
          Xóa
        </button>
      </div>
    </main>
  );
}
