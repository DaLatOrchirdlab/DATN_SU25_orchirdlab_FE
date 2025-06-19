import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Giả lập fetch API, sau này thay bằng call API thực tế
async function fetchMethodDetail(id: string) {
  // Dữ liệu mẫu, sau này lấy từ backend
  if (id === "1") {
    return {
      id: 1,
      name: "Nhân giống từ lá",
      type: "Nhân giống vô tính",
      description: "Nhân giống lan từ lá non bằng nuôi cấy mô.",
      steps: [
        {
          title: "1. Chọn mẫu mô (Explant Selection)",
          content: (
            <>
              <b>Tiêu chí:</b> Cây mẹ khỏe mạnh, không sâu bệnh, có đặc tính di
              truyền tốt.
              <br />
              <b>Loại mẫu:</b> chồi non, lá non, thân non, mô non đang phát
              triển.
              <br />
              <b>Khử trùng sơ bộ:</b> ngâm trong nước rửa, thuốc trừ
              nấm/bactericide.
            </>
          ),
        },
        {
          title: "2. Khử trùng mẫu (Sterilization)",
          content: (
            <>
              <b>Dụng cụ cần:</b> tủ cấy vô trùng (Laminar Air Flow), cồn 70%,
              NaClO (Javel), HgCl₂ (ít dùng do độc hại).
              <br />
              <b>Quy trình:</b>
              <ul className="list-disc ml-6">
                <li>Rửa sạch mẫu bằng xà phòng nhẹ/nước ấm.</li>
                <li>Ngâm NaClO 0.5–1% trong 10–15 phút.</li>
                <li>Rửa lại bằng nước cất vô trùng nhiều lần.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Cấy mẫu vào môi trường cảm ứng (Induction)",
          content: (
            <>
              <b>Môi trường dùng:</b> MS (Murashige & Skoog) + cytokinin (BA,
              kinetin) + auxin (NAA, IAA).
              <br />
              <b>Mục tiêu:</b> Gây sự hình thành chồi, protocorm hoặc callus (mô
              sẹo).
              <br />
              <b>Cách làm:</b>
              <ul className="list-disc ml-6">
                <li>
                  Cấy từng mẫu nhỏ lên môi trường thạch trong ống nghiệm/lọ.
                </li>
                <li>
                  Đặt trong điều kiện ánh sáng nhân tạo 25–27°C, 12h sáng/ngày.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Nhân chồi (Multiplication)",
          content: (
            <>
              <ul className="list-disc ml-6">
                <li>
                  Tiếp tục cấy chuyền các chồi nhỏ hoặc mô sẹo sang môi trường
                  có hormone tăng sinh.
                </li>
                <li>Lặp lại nhiều lần để tăng số lượng chồi.</li>
                <li>Nếu chồi quá to, cắt nhỏ ra và tiếp tục nhân.</li>
                <li>Lưu ý: Không để tạo biến dị soma (nếu không mong muốn).</li>
              </ul>
            </>
          ),
        },
        {
          title: "5. Tạo rễ và chuẩn bị ra vườn (Rooting & Acclimatization)",
          content: (
            <>
              <b>Môi trường tạo rễ:</b> Giảm cytokinin, tăng auxin (NAA, IBA).
              <br />
              Khi chồi đã có rễ ≥2–3cm và khỏe:
              <ul className="list-disc ml-6">
                <li>Chuyển sang bầu ẩm sơ dừa, rêu rừng để thích nghi.</li>
                <li>Điều kiện ánh sáng thấp, độ ẩm cao (~80–90%).</li>
                <li>Sau 2–3 tuần, cây sẽ ra lá thật, chuyển sang vườn ươm.</li>
              </ul>
            </>
          ),
        },
      ],
    };
  } else {
    // Phương pháp hữu tính
    return {
      id: 4,
      name: "Thụ phấn chéo",
      type: "Nhân giống hữu tính",
      description: "Thụ phấn chéo giữa các cây lan để tạo giống mới.",
      steps: [
        {
          title: "1. Chọn cây bố – mẹ (Parent Selection)",
          content: (
            <>
              <b>Cây mẹ:</b> hoa to, nhiều, thân khỏe, sinh sản mạnh.
              <br />
              <b>Cây bố:</b> đặc điểm cải thiện mong muốn (màu sắc, dáng hoa…).
              <br />
              Đảm bảo cây đang ra hoa cùng thời điểm (hoặc bảo quản bằng tủ lạnh
              phấn hoa).
            </>
          ),
        },
        {
          title: "2. Lấy phấn hoa & thụ phấn (Pollination)",
          content: (
            <>
              <ul className="list-disc ml-6">
                <li>Dùng nhíp/cọ lấy pollinia từ cây bố.</li>
                <li>Nhẹ nhàng đặt vào stigma (đầu nhụy) của cây mẹ.</li>
                <li>Ghi nhãn ngày phối giống và bố mẹ.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Quả hình thành & chín",
          content: (
            <>
              <ul className="list-disc ml-6">
                <li>Quả lan thường mất 3–12 tháng để chín.</li>
                <li>Khi quả chuyển nâu hoặc bắt đầu nứt, thu hoạch.</li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Xử lý hạt & cấy in vitro",
          content: (
            <>
              Lan không có nội nhũ, hạt rất nhỏ, không tự nảy mầm.
              <br />
              Cần gieo hạt trong môi trường vô trùng (symbiotic hoặc
              asymbiotic):
              <ul className="list-disc ml-6">
                <li>
                  <b>Asymbiotic:</b> môi trường MS có đường, vitamin, agar.
                </li>
                <li>
                  <b>Symbiotic:</b> thêm nấm cộng sinh (mycorrhiza).
                </li>
              </ul>
              Hạt sau 1–2 tuần sẽ hình thành protocorm, rồi chồi, rồi rễ.
            </>
          ),
        },
        {
          title: "5. Cấy chuyền và ra cây con",
          content: (
            <>
              <ul className="list-disc ml-6">
                <li>
                  Khi cây con phát triển: chuyển qua môi trường mới để nhân.
                </li>
                <li>
                  Tương tự quy trình tissue culture, cây được ra rễ, ra lá và ra
                  vườn ươm.
                </li>
              </ul>
            </>
          ),
        },
      ],
    };
  }
}

export default function MethodDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [method, setMethod] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMethodDetail(id || "1").then((data) => {
      setMethod(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (!method) return <div>Không tìm thấy phương pháp.</div>;

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 ">
      <div className="max-w-full mx-auto bg-white rounded shadow p-6">
        <button
          className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-4 hover:bg-green-800 hover:text-white transition"
          onClick={() => navigate(-1)}
        >
          ← Trở về
        </button>
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
        <ol className="list-decimal ml-6 space-y-3">
          {method.steps.map((step: any, idx: number) => (
            <li key={idx}>
              <div className="font-semibold">{step.title}</div>
              <div className="text-gray-700">{step.content}</div>
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
