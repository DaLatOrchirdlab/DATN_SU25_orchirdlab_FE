import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Method } from "../../../types/Method";
import axiosInstance from "../../../api/axiosInstance";

// const methods = [
//   {
//     id: "093ae940-df97-41e5-9302-f1d7c8667285",
//     name: "Subculturing",
//     description: "Transfer to new media",
//     type: "Maintenance",
//     status: true,
//     stages: [
//       {
//         name: "Media Preparation",
//         description: "Prepare fresh media for transfer",
//         dateOfProcessing: 1,
//         step: 1,
//         status: true,
//         elementDTO: [],
//       },
//       {
//         name: "Transfer Samples",
//         description: "Move samples to new containers",
//         dateOfProcessing: 2,
//         step: 1,
//         status: true,
//         elementDTO: [],
//       },
//     ],
//   },
//   {
//     id: "7280dae3-03c1-4f92-a18d-cfac60887790",
//     name: "Sterilization",
//     description: "Disinfect material",
//     type: "Preparation",
//     status: true,
//     stages: [
//       {
//         name: "Surface Cleaning",
//         description: "Initial rinse with water",
//         dateOfProcessing: 1,
//         step: 1,
//         status: true,
//         elementDTO: [],
//       },
//       {
//         name: "Disinfecting",
//         description: "Using alcohol or bleach",
//         dateOfProcessing: 2,
//         step: 1,
//         status: true,
//         elementDTO: [],
//       },
//     ],
//   },
//   {
//     id: "8ff46b2c-2fcd-45f2-a825-60841ee326d8",
//     name: "test1",
//     description: "test1",
//     type: "Subculturing",
//     status: true,
//     stages: [
//       {
//         name: "lay mau vat",
//         description: "string",
//         dateOfProcessing: 1,
//         step: 1,
//         status: true,
//         elementDTO: [
//           {
//             id: "c6100c8e-2c3c-4901-a708-a18851d6690b",
//             name: "Activated Charcoal",
//             description: "Than hoạt tính giúp hấp phụ chất ức chế",
//             status: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "d3e1b31f-1a86-4778-a5c4-a2992c8733d2",
//     name: "Test tạo",
//     description: "Test tạo",
//     type: "vo_tinh",
//     status: true,
//     stages: [
//       {
//         name: "Test tạo",
//         description: "Test tạo",
//         dateOfProcessing: 1,
//         step: 1,
//         status: true,
//         elementDTO: [
//           {
//             id: "0c4ae4af-8a53-4e7f-9585-c8419d8679ef",
//             name: "Ethanol 70%",
//             description: "Dùng để khử trùng dụng cụ và mẫu",
//             status: true,
//           },
//           {
//             id: "26e4dcc2-9c0c-4dd7-aacb-92d89da60f86",
//             name: "BA",
//             description:
//               "Benzyladenine - chất điều hòa sinh trưởng (cytokinin)",
//             status: true,
//           },
//           {
//             id: "0469c03f-14aa-4a79-84cd-b496c72cbefb",
//             name: "NAA",
//             description:
//               "Naphthaleneacetic acid - chất điều hòa sinh trưởng (auxin)",
//             status: true,
//           },
//         ],
//       },
//     ],
//   },
// ];

export default function MethodDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMethodDetail = async (
      methodId: string
    ): Promise<Method | null> => {
      try {
        const response = await axiosInstance.get<{ value?: Method }>(
          `/api/method/${methodId}`
        );
        if (response.data.value) {
          return response.data.value;
        }
        return null;
      } catch (error) {
        console.error("Lỗi khi tải phương pháp:", error);
        return null;
      }
    };
    void fetchMethodDetail(id ?? "1").then((data) => {
      setMethod(data);
      setLoading(false);
    });
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
              {stage.elementDTO && stage.elementDTO.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold">Nguyên liệu:</span>
                  <ul className="list-disc ml-4">
                    {stage.elementDTO.map((el) => (
                      <li key={el.id} className="text-gray-700">
                        {el.name} - {el.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
