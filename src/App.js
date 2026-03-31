import React, { useMemo, useState } from "react";
import springs from "./data/springs";

function NavButton({ active, children, onClick }) {
  return <button className={active ? "navBtn active" : "navBtn"} onClick={onClick}>{children}</button>;
}

function CoverCard({ title, text, image, label, tone, onClick }) {
  return (
    <button className={`coverCard ${tone}`} onClick={onClick}>
      <div className="coverImageWrap">
        <img src={image} alt={title} />
      </div>
      <div className="coverText">
        <span className="tagLabel">{label}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </button>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="stack">
      <section className="heroHome">
        <div className="heroCopy">
          <div className="tinyTag">ONC Mold Components</div>
          <h1>Trang bìa kiểu catalog cao cấp, ưu tiên hình ảnh thật</h1>
          <p>
            Bản này tập trung vào cảm giác trưng bày sản phẩm: ảnh lớn, bố cục sạch, ít chữ hơn và
            phân nhóm theo dòng linh kiện. Nó phù hợp hơn để giới thiệu cho khách hoặc dùng như thư viện nội bộ.
          </p>
          <div className="heroActions">
            <button className="primaryBtn" onClick={() => setPage("springs")}>Xem Coil Springs</button>
            <button className="ghostBtn" onClick={() => setPage("pins")}>Xem Ejector Pins</button>
          </div>
          <div className="heroNumbers">
            <div className="numberCard"><span>Nhóm sản phẩm</span><strong>2</strong></div>
            <div className="numberCard"><span>Dòng lò xo</span><strong>2</strong></div>
            <div className="numberCard"><span>Mã lò xo</span><strong>{springs.length}</strong></div>
          </div>
        </div>

        <div className="heroVisual heroVisualThree">
          <div className="springShowcase swb">
            <div className="badgeTop heavy">SWB • Heavy Load</div>
            <img src="/spring-swb.png" alt="SWB spring" />
          </div>
          <div className="springShowcase swl">
            <div className="badgeTop medium">SWL • Medium Load</div>
            <img src="/spring-swl.png" alt="SWL spring" />
          </div>
          <div className="springShowcase pinsShowcase">
            <div className="badgeTop medium">Ejector Pins</div>
            <img src="/pins-real.png" alt="Ejector pins" />
          </div>
        </div>
      </section>

      <section className="sectionShell">
        <div className="sectionHeading">
          <div>
            <div className="tinyTag">Featured Library</div>
            <h2>Danh mục sản phẩm nổi bật</h2>
          </div>
          <p>Trang chủ ưu tiên hình sản phẩm thật để tạo cảm giác như catalog online thay vì bảng dữ liệu.</p>
        </div>

        <div className="coverGrid">
          <CoverCard
            title="SWB Coil Springs"
            text="Dòng tải nặng với ảnh thật nổi bật ngay trên trang bìa."
            image="/spring-swb.png"
            label="Coil Springs"
            tone="brownTone"
            onClick={() => setPage("springs")}
          />
          <CoverCard
            title="SWL Coil Springs"
            text="Dòng tải trung bình với hình ảnh riêng để phân biệt theo màu tải."
            image="/spring-swl.png"
            label="Coil Springs"
            tone="blueTone"
            onClick={() => setPage("springs")}
          />
          <CoverCard
            title="Ejector Pins"
            text="Nhóm chốt đẩy với ảnh thật sản phẩm để đồng bộ cùng SWB và SWL trên trang bìa."
            image="/pins-real.png"
            label="Ejector Pins"
            tone="lightTone"
            onClick={() => setPage("pins")}
          />
        </div>
      </section>

      <section className="sectionShell">
        <div className="sectionHeading">
          <div>
            <div className="tinyTag">Layout Direction</div>
            <h2>Điểm nâng cấp kiểu pro</h2>
          </div>
          <p>Thiết kế này đã chuyển trọng tâm từ dữ liệu sang trải nghiệm xem sản phẩm.</p>
        </div>
        <div className="featureGrid">
          <div className="featureCard"><strong>Ảnh thật ở trang bìa</strong><span>SWB và SWL được đưa lên vị trí chính thay vì chỉ để sơ đồ kỹ thuật.</span></div>
          <div className="featureCard"><strong>Phân màu tải trọng</strong><span>Người xem nhìn phát biết ngay SWB và SWL là hai dòng khác nhau.</span></div>
          <div className="featureCard"><strong>Điều hướng rõ ràng</strong><span>Trang chủ đến nhóm sản phẩm đến trang chi tiết, cảm giác giống catalog điện tử.</span></div>
          <div className="featureCard"><strong>Dễ mở rộng tiếp</strong><span>Sau này có thể thêm guide pins, bushings, date stamps bằng cùng cấu trúc.</span></div>
        </div>
      </section>
    </div>
  );
}

function SpringsPage() {
  const [family, setFamily] = useState("all");
  const filtered = useMemo(() => springs.filter((x) => family === "all" || x.family === family), [family]);
  const topItems = filtered.slice(0, 12);

  return (
    <div className="stack">
      <section className="splitHero">
        <div className="splitText">
          <div className="tinyTag">Coil Springs Showcase</div>
          <h2>Trưng bày lò xo bằng ảnh thật và card sản phẩm</h2>
          <p>
            Thay vì chỉ có bảng dữ liệu, phần này ưu tiên ảnh thật của SWB và SWL, sau đó mới dẫn người xem
            xuống các card mã sản phẩm và thông số nổi bật.
          </p>
          <div className="familySwitch">
            <button className={family === "all" ? "smallBtn active" : "smallBtn"} onClick={() => setFamily("all")}>Tất cả</button>
            <button className={family === "SWB" ? "smallBtn active" : "smallBtn"} onClick={() => setFamily("SWB")}>SWB</button>
            <button className={family === "SWL" ? "smallBtn active" : "smallBtn"} onClick={() => setFamily("SWL")}>SWL</button>
          </div>
        </div>

        <div className="heroVisual">
          <div className="springShowcase swb">
            <div className="badgeTop heavy">SWB • Heavy Load</div>
            <img src="/spring-swb.png" alt="SWB spring" />
          </div>
          <div className="springShowcase swl">
            <div className="badgeTop medium">SWL • Medium Load</div>
            <img src="/spring-swl.png" alt="SWL spring" />
          </div>
        </div>
      </section>

      <section className="sectionShell">
        <div className="sectionHeading">
          <div>
            <div className="tinyTag">Product Cards</div>
            <h2>Các mã lò xo nổi bật</h2>
          </div>
          <p>{filtered.length} mã phù hợp với bộ lọc hiện tại.</p>
        </div>

        <div className="statsBand">
          <div className="statBox"><span>Mã hiển thị</span><strong>{filtered.length}</strong></div>
          <div className="statBox"><span>SWB / SWL</span><strong>{[...new Set(filtered.map((x) => x.family))].length}</strong></div>
          <div className="statBox"><span>Hiển thị kiểu card</span><strong>12</strong></div>
        </div>

        <div className="productCards">
          {topItems.map((item) => (
            <div className="productCard" key={item.catalog}>
              <div className="productPhoto">
                <img src={item.family === "SWB" ? "/spring-swb.png" : "/spring-swl.png"} alt={item.catalog} />
              </div>
              <div className="productBody">
                <div className="productMeta">
                  <span className={item.family === "SWB" ? "pill brownTone" : "pill blueTone"}>{item.family}</span>
                  <strong>{item.catalog}</strong>
                </div>
                <p>D: {item.D} · d: {item.d} · L: {item.L}</p>
                <p>K: {item.springConstantN} N/mm</p>
                <div className="loadRow">
                  <span>{item.load1N}N</span>
                  <span>{item.load2N}N</span>
                  <span>{item.load3N}N</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionShell">
        <div className="sectionHeading">
          <div>
            <div className="tinyTag">Technical Reference</div>
            <h2>Sơ đồ kỹ thuật cho toàn bộ nhóm lò xo</h2>
          </div>
          <p>Dùng khi cần giải thích nhanh các kích thước D, d và L.</p>
        </div>
        <div className="diagramPanel">
          <img src="/spring-diagram.png" alt="Spring diagram" />
        </div>
      </section>
    </div>
  );
}

function PinsPage() {
  return (
    <div className="stack">
      <section className="splitHero">
        <div className="splitText">
          <div className="tinyTag">Ejector Pins</div>
          <h2>Giữ nhóm pins theo hướng sạch và kỹ thuật</h2>
          <p>
            Không cần quá nhiều ảnh thật ở nhóm này. Một hình kỹ thuật lớn, sạch và rõ ràng là đủ để
            tạo cảm giác chuyên nghiệp.
          </p>
        </div>
        <div className="singleVisual">
          <img src="/pins-real.png" alt="Ejector pins" />
        </div>
      </section>

      <section className="sectionShell">
        <div className="sectionHeading">
          <div>
            <div className="tinyTag">Display Style</div>
            <h2>Hướng trình bày khuyên dùng cho pins</h2>
          </div>
          <p>Trang này nên làm gọn, kỹ thuật và rõ ràng hơn so với phần lò xo.</p>
        </div>
        <div className="featureGrid">
          <div className="featureCard"><strong>Ảnh kỹ thuật lớn</strong><span>Giữ ảnh cấu tạo là nội dung chính.</span></div>
          <div className="featureCard"><strong>Ít chữ hơn</strong><span>Trang đầu chỉ nên có vài ý chính, không dồn bảng quá sớm.</span></div>
          <div className="featureCard"><strong>Đi sâu sau</strong><span>Khi người xem cuộn xuống mới tới bảng size và mã đặt hàng.</span></div>
          <div className="featureCard"><strong>Cùng hệ thống</strong><span>Vẫn thuộc cùng thư viện nên nhìn đồng bộ với phần lò xo.</span></div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="page">
      <header className="topBar">
        <div>
          <div className="tinyTag">ONC Parts Library</div>
          <h1 className="mainTitle">Level Pro • Catalog điện tử thiên về hình ảnh</h1>
        </div>
        <div className="navRow">
          <NavButton active={page === "home"} onClick={() => setPage("home")}>Trang bìa</NavButton>
          <NavButton active={page === "springs"} onClick={() => setPage("springs")}>Coil Springs</NavButton>
          <NavButton active={page === "pins"} onClick={() => setPage("pins")}>Ejector Pins</NavButton>
        </div>
      </header>

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "springs" && <SpringsPage />}
      {page === "pins" && <PinsPage />}
    </div>
  );
}
