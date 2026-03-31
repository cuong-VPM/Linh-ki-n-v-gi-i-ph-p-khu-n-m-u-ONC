import React, { useMemo, useState } from "react";
import pins from "./data/pins";
import springs from "./data/springs";

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}

function Overview({ setSection }) {
  const springFamilies = [...new Set(springs.map((x) => x.family))].length;
  return (
    <div className="stack">
      <section className="hero">
        <div className="heroText">
          <div className="tag">ONC Parts Library</div>
          <h1>Thư viện nhiều loại chi tiết trong một website</h1>
          <p>
            Website hiện tại đã được định hướng thành một bộ thư viện sản phẩm. Mỗi nhóm chi tiết có
            khu tra cứu riêng, bộ lọc riêng và có thể mở rộng tiếp cho guide pins, bushings, date stamp
            hoặc các nhóm khác sau này.
          </p>
          <div className="heroActions">
            <button className="primaryBtn" onClick={() => setSection("pins")}>Xem Ejector Pins</button>
            <button className="ghostBtn" onClick={() => setSection("springs")}>Xem Coil Springs</button>
          </div>
        </div>
        <div className="heroStats">
          <Stat label="Nhóm sản phẩm hiện có" value="2" />
          <Stat label="Dòng lò xo" value={springFamilies} />
          <Stat label="Mã lò xo" value={springs.length} />
        </div>
      </section>

      <section className="categoryGrid">
        <article className="categoryCard" onClick={() => setSection("pins")}>
          <div className="eyebrow">Category 01</div>
          <h3>Ejector Pins</h3>
          <p>Tra cứu theo Type, đường kính P và chiều dài L. Có hình minh họa kỹ thuật để đối chiếu nhanh.</p>
          <div className="miniMeta">{pins.length} đường kính / type</div>
        </article>

        <article className="categoryCard" onClick={() => setSection("springs")}>
          <div className="eyebrow">Category 02</div>
          <h3>Coil Springs</h3>
          <p>Tra cứu SWL / SWB theo mã catalog, kích thước D-d-L, hằng số lò xo và tải ở từng mức nén.</p>
          <div className="miniMeta">{springs.length} mã catalog</div>
        </article>
      </section>

      <section className="roadmap card">
        <div>
          <div className="eyebrow">Kiến trúc mở rộng</div>
          <h2>Web này đã có thể phát triển thành thư viện chi tiết hoàn chỉnh</h2>
          <p>
            Mỗi loại chi tiết chỉ cần thêm một dataset mới và một màn hình tra cứu mới. Kiểu tổ chức này
            phù hợp để sau này thêm nhiều sản phẩm hơn mà không phải làm lại website từ đầu.
          </p>
        </div>
        <div className="roadmapList">
          <span>Guide Pins</span>
          <span>Guide Bushings</span>
          <span>Date Stamps</span>
          <span>Coil Springs</span>
          <span>Ejector Pins</span>
          <span>Custom Parts</span>
        </div>
      </section>
    </div>
  );
}

function PinsSection() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [pFilter, setPFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lengthFilter, setLengthFilter] = useState("");

  const pOptions = useMemo(() => {
    const list = typeFilter === "all" ? pins : pins.filter((item) => item.type === typeFilter);
    return [...new Set(list.map((item) => item.p))];
  }, [typeFilter]);

  const filtered = useMemo(() => {
    return pins.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesP = pFilter === "all" || String(item.p) === pFilter;
      const matchesLength = !lengthFilter || item.lengths.some((x) => String(x.l).includes(lengthFilter));
      const haystack = `${item.type} ${item.p} ${item.lengths.map((x) => x.l).join(" ")}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      return matchesType && matchesP && matchesLength && matchesSearch;
    });
  }, [typeFilter, pFilter, search, lengthFilter]);

  return (
    <div className="stack">
      <section className="splitHero card darkCard">
        <div>
          <div className="eyebrow light">Ejector Pins</div>
          <h2>Tra cứu nhanh EPN / EPJ</h2>
          <p>Chọn type, đường kính P và chiều dài L để tìm kích thước phù hợp.</p>
        </div>
        <div className="heroMetrics">
          <Stat label="Đường kính hiển thị" value={pins.length} />
          <Stat label="Tối đa chiều dài" value="1000" />
        </div>
      </section>

      <section className="card">
        <div className="filterGrid">
          <div className="field"><label>Tìm nhanh</label><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ví dụ: EPJ 8 600" /></div>
          <div className="field"><label>Loại</label>
            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPFilter("all"); }}>
              <option value="all">Tất cả</option><option value="EPN">EPN</option><option value="EPJ">EPJ</option>
            </select>
          </div>
          <div className="field"><label>Đường kính P</label>
            <select value={pFilter} onChange={(e) => setPFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              {pOptions.map((p) => <option key={p} value={String(p)}>{p}</option>)}
            </select>
          </div>
          <div className="field"><label>Chiều dài L</label><input value={lengthFilter} onChange={(e) => setLengthFilter(e.target.value)} placeholder="Ví dụ: 500" /></div>
        </div>
      </section>

      <section className="contentTwo">
        <div className="card">
          <div className="sectionHead">
            <div><div className="eyebrow">Danh sách</div><h2>Kích thước Ejector Pins</h2><p>{filtered.length} dòng phù hợp.</p></div>
          </div>
          <div className="tableWrap">
            <table>
              <thead><tr><th>Type</th><th>P</th><th>Chiều dài khả dụng</th><th>Ghi chú</th></tr></thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={`${item.type}-${item.p}`}>
                    <td><span className={item.type === "EPN" ? "pill blue" : "pill green"}>{item.type}</span></td>
                    <td className="strong">{item.p}</td>
                    <td>
                      <div className="badgeRow">
                        {item.lengths.map((x) => <span key={`${item.type}-${item.p}-${x.l}`} className={x.lBracketed ? "badge marked" : "badge"}>{x.l}{x.lBracketed ? "*" : ""}</span>)}
                      </div>
                    </td>
                    <td className="mutedText">
                      {item.pBracketed ? "P trong ngoặc" : ""}
                      {item.pBracketed && item.lengths.some((x) => x.lBracketed) ? ", " : ""}
                      {item.lengths.some((x) => x.lBracketed) ? "L trong ngoặc (*)" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="stack">
          <div className="card">
            <div className="sectionHead">
              <div><div className="eyebrow">Minh họa</div><h2>Cấu tạo cơ bản</h2></div>
            </div>
            <div className="imagePanel">
              <img src="/pins-diagram.png" alt="Sơ đồ ejector pins" />
            </div>
          </div>

          <div className="card">
            <div className="sectionHead"><div><div className="eyebrow">Ví dụ</div><h2>Mã đặt hàng</h2></div></div>
            <div className="codeList">
              <div>EPN 3 - 100</div>
              <div>EPJ 8 - 600</div>
              <div>EPN 16 - 500 - NC</div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function SpringsSection() {
  const [family, setFamily] = useState("all");
  const [search, setSearch] = useState("");
  const [outerD, setOuterD] = useState("all");
  const [length, setLength] = useState("all");

  const dOptions = useMemo(() => {
    const list = family === "all" ? springs : springs.filter((x) => x.family === family);
    return [...new Set(list.map((x) => String(x.D)))].sort((a, b) => Number(a) - Number(b));
  }, [family]);

  const lOptions = useMemo(() => {
    const list = family === "all" ? springs : springs.filter((x) => x.family === family);
    return [...new Set(list.map((x) => String(x.L)))].sort((a, b) => Number(a) - Number(b));
  }, [family]);

  const filtered = useMemo(() => {
    return springs.filter((item) => {
      const matchFamily = family === "all" || item.family === family;
      const matchD = outerD === "all" || String(item.D) === outerD;
      const matchL = length === "all" || String(item.L) === length;
      const text = `${item.catalog} ${item.family} ${item.D} ${item.d} ${item.L}`.toLowerCase();
      const matchSearch = !search || text.includes(search.toLowerCase());
      return matchFamily && matchD && matchL && matchSearch;
    });
  }, [family, outerD, length, search]);

  return (
    <div className="stack">
      <section className="splitHero card darkCard springBg">
        <div>
          <div className="eyebrow light">Coil Springs</div>
          <h2>Thêm mặt hàng lò xo vào cùng thư viện</h2>
          <p>Web hiện tại đã có thể chứa nhiều loại chi tiết. Phần này dùng dữ liệu SWL / SWB từ file Excel của bạn.</p>
        </div>
        <div className="heroMetrics">
          <Stat label="Mã lò xo" value={springs.length} />
          <Stat label="Dòng sản phẩm" value={[...new Set(springs.map((x) => x.family))].length} />
        </div>
      </section>

      <section className="card">
        <div className="filterGrid">
          <div className="field"><label>Tìm mã catalog</label><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ví dụ: SWL6-15" /></div>
          <div className="field"><label>Family</label>
            <select value={family} onChange={(e) => { setFamily(e.target.value); setOuterD("all"); setLength("all"); }}>
              <option value="all">Tất cả</option>
              {[...new Set(springs.map((x) => x.family))].map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="field"><label>D</label>
            <select value={outerD} onChange={(e) => setOuterD(e.target.value)}>
              <option value="all">Tất cả</option>
              {dOptions.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="field"><label>L</label>
            <select value={length} onChange={(e) => setLength(e.target.value)}>
              <option value="all">Tất cả</option>
              {lOptions.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="contentTwo">
        <div className="card">
          <div className="sectionHead">
            <div><div className="eyebrow">Danh sách</div><h2>Coil Springs SWL / SWB</h2><p>{filtered.length} mã phù hợp.</p></div>
          </div>
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Catalog No.</th>
                  <th>Family</th>
                  <th>D</th>
                  <th>d</th>
                  <th>L</th>
                  <th>Spring Constant (N/mm)</th>
                  <th>Load Stages</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.catalog}>
                    <td className="strong">{item.catalog}</td>
                    <td><span className={item.family === "SWL" ? "pill blue" : "pill violet"}>{item.family}</span></td>
                    <td>{item.D}</td>
                    <td>{item.d}</td>
                    <td>{item.L}</td>
                    <td>{item.springConstantN}</td>
                    <td>
                      <div className="badgeRow">
                        <span className="badge">{item.deflection1}: {item.load1N}N</span>
                        <span className="badge">{item.deflection2}: {item.load2N}N</span>
                        <span className="badge">{item.deflection3}: {item.load3N}N</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="stack">
          <div className="card">
            <div className="sectionHead">
              <div><div className="eyebrow">Minh họa</div><h2>Cấu tạo lò xo</h2><p>Hình này áp dụng để đọc nhanh các kích thước D, d và L cho toàn bộ nhóm lò xo.</p></div>
            </div>
            <div className="imagePanel">
              <img src="/spring-diagram.png" alt="Sơ đồ kích thước lò xo" />
            </div>
          </div>

          <div className="card">
            <div className="sectionHead">
              <div><div className="eyebrow">Giải thích nhanh</div><h2>Ký hiệu chính</h2></div>
            </div>
            <div className="codeList">
              <div>D = Đường kính ngoài</div>
              <div>d = Đường kính dây</div>
              <div>L = Chiều dài tự do</div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState("overview");

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <div className="tag">ONC Mold Components</div>
          <h1 className="siteTitle">Thư viện linh kiện khuôn</h1>
        </div>
        <nav className="topnav">
          <button className={section === "overview" ? "navBtn active" : "navBtn"} onClick={() => setSection("overview")}>Tổng quan</button>
          <button className={section === "pins" ? "navBtn active" : "navBtn"} onClick={() => setSection("pins")}>Ejector Pins</button>
          <button className={section === "springs" ? "navBtn active" : "navBtn"} onClick={() => setSection("springs")}>Coil Springs</button>
        </nav>
      </header>

      {section === "overview" && <Overview setSection={setSection} />}
      {section === "pins" && <PinsSection />}
      {section === "springs" && <SpringsSection />}
    </div>
  );
}
