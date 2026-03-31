import React, { useMemo, useState } from "react";

const rows = [
  ...[1.0,1.1,1.2,1.3,1.4].flatMap((p) => [100,150].map((l) => ({ type: "EPN", p, l }))),
  ...[1.5].flatMap((p) => [100,150,200].map((l) => ({ type: "EPN", p, l }))),
  ...[1.6,1.7,1.8,1.9].flatMap((p) => [100,150,200].map((l) => ({ type: "EPN", p, l }))),
  ...[2.0].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[2.1,2.2,2.3,2.4].flatMap((p) => [100,150,200,250,300].map((l) => ({ type: "EPN", p, l }))),
  ...[2.5].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[2.6,2.7,2.8,2.9].flatMap((p) => [100,150,200,250,300].map((l) => ({ type: "EPN", p, l }))),
  ...[3.0].flatMap((p) => [100,150,200,250,300,350,400,450,500].map((l) => ({ type: "EPN", p, l }))),
  ...[3.1,3.2,3.3,3.4].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[3.5].flatMap((p) => [100,150,200,250,300,350,400,450,500].map((l) => ({ type: "EPN", p, l }))),
  ...[3.6,3.7,3.8,3.9].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[4.0].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[4.1,4.2,4.3,4.4].flatMap((p) => [200,300,400].map((l) => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[4.5].flatMap((p) => [100,150,200,250,300,350,400].map((l) => ({ type: "EPN", p, l }))),
  ...[4.6,4.7,4.8,4.9].flatMap((p) => [200,300,400].map((l) => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[5.0].flatMap((p) => [100,150,200,250,300,350,400,500].map((l) => ({ type: "EPN", p, l }))),
  ...[5.1,5.2,5.3,5.4].flatMap((p) => [200,300,400].map((l) => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[5.5].flatMap((p) => [100,150,200,250,300,350,400,500].map((l) => ({ type: "EPN", p, l }))),
  ...[5.6,5.7,5.8,5.9].flatMap((p) => [200,300,400].map((l) => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[6.0].flatMap((p) => [100,150,200,250,300,350,400,500,600,700,800].map((l) => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[6.1,6.2,6.3,6.4].flatMap((p) => [200,300,400].map((l) => ({ type: "EPJ", p, l, pBracketed: true }))),
  ...[6.5].flatMap((p) => [100,150,200,250,300,350,400,500,600,700].map((l) => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[7.0].flatMap((p) => [100,150,200,250,300,350,400,500,600,700,800,900,1000].map((l) => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[8.0,10.0,12.0,15.0].flatMap((p) => [100,150,200,250,300,350,400,450,500,600,700,800,900,1000].map((l) => ({ type: "EPJ", p, l, lBracketed: [450,600,700,800,900,1000].includes(l) }))),
  ...[13.0].flatMap((p) => [100,150,200,250,300,350,400,500].map((l) => ({ type: "EPN", p, l, pBracketed: true }))),
  ...[16.0].flatMap((p) => [100,150,200,250,300,350,400,500,600,700,800,900,1000].map((l) => ({ type: "EPJ", p, l, lBracketed: l >= 600 }))),
  ...[20.0].flatMap((p) => [150,200,250,300,400,500,600,700,800,900,1000].map((l) => ({ type: "EPJ", p, l }))),
  ...[25.0].flatMap((p) => [200,300,400,500,600,700,800,900,1000].map((l) => ({ type: "EPJ", p, l }))),
];

const grouped = Object.values(
  rows.reduce((acc, row) => {
    const key = `${row.type}-${row.p}`;
    if (!acc[key]) {
      acc[key] = { type: row.type, p: row.p, pBracketed: !!row.pBracketed, lengths: [] };
    }
    acc[key].lengths.push({ l: row.l, lBracketed: !!row.lBracketed });
    return acc;
  }, {})
).sort((a, b) => a.type.localeCompare(b.type) || a.p - b.p);

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function LengthBadge({ value, marked }) {
  return <span className={marked ? "badge badge-marked" : "badge"}>{value}{marked ? "*" : ""}</span>;
}

export default function App() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [pFilter, setPFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lengthFilter, setLengthFilter] = useState("");

  const pOptions = useMemo(() => {
    const list = typeFilter === "all" ? grouped : grouped.filter((item) => item.type === typeFilter);
    return [...new Set(list.map((item) => item.p))];
  }, [typeFilter]);

  const filtered = useMemo(() => {
    return grouped.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesP = pFilter === "all" || String(item.p) === pFilter;
      const matchesLength = !lengthFilter || item.lengths.some((x) => String(x.l).includes(lengthFilter));
      const haystack = `${item.type} ${item.p} ${item.lengths.map((x) => x.l).join(" ")}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      return matchesType && matchesP && matchesLength && matchesSearch;
    });
  }, [typeFilter, pFilter, search, lengthFilter]);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <div className="hero-tag">Catalog lookup tool</div>
          <h1>Tra cứu Ejector Pins chuyên nghiệp</h1>
          <p>
            Tìm nhanh mã <strong>EPN</strong> và <strong>EPJ</strong> theo đường kính P, chiều dài L,
            đồng thời đối chiếu trực tiếp với hình minh họa kỹ thuật.
          </p>
          <div className="hero-stats">
            <StatCard label="Số đường kính" value={grouped.length} />
            <StatCard label="Tổ hợp P-L" value={rows.length} />
            <StatCard label="Chiều dài lớn nhất" value={Math.max(...rows.map((r) => r.l))} />
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-card">
            <div className="panel-title">Kích thước chính</div>
            <div className="dimension-grid">
              <div><strong>P</strong><span>Đường kính</span></div>
              <div><strong>L</strong><span>Chiều dài</span></div>
              <div><strong>T</strong><span>Độ dày đầu</span></div>
              <div><strong>H</strong><span>Chiều cao đầu</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="diagram-section card">
        <div className="section-header">
          <div>
            <div className="eyebrow">Hình minh họa kỹ thuật</div>
            <h2>Cấu tạo và kích thước cơ bản</h2>
            <p>Quan sát hình để hiểu nhanh vị trí đầu chốt, thân chốt và cách đọc các kích thước trước khi tra bảng.</p>
          </div>
        </div>
        <div className="diagram-wrap">
          <img src="/diagram.png" alt="Sơ đồ cấu tạo ejector pin" />
        </div>
      </section>

      <section className="filters card">
        <div className="section-header">
          <div>
            <div className="eyebrow">Bộ lọc</div>
            <h2>Tìm đúng kích thước trong vài giây</h2>
          </div>
        </div>
        <div className="filter-grid">
          <div className="field">
            <label>Tìm nhanh</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ví dụ: EPJ 8 600" />
          </div>
          <div className="field">
            <label>Loại</label>
            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPFilter("all"); }}>
              <option value="all">Tất cả</option>
              <option value="EPN">EPN</option>
              <option value="EPJ">EPJ</option>
            </select>
          </div>
          <div className="field">
            <label>Đường kính P</label>
            <select value={pFilter} onChange={(e) => setPFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              {pOptions.map((p) => <option key={p} value={String(p)}>{p}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Chiều dài L</label>
            <input value={lengthFilter} onChange={(e) => setLengthFilter(e.target.value)} placeholder="Ví dụ: 500" />
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="section-header">
            <div>
              <div className="eyebrow">Kết quả</div>
              <h2>Danh sách kích thước</h2>
              <p>{filtered.length} dòng phù hợp với bộ lọc hiện tại.</p>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>P</th>
                  <th>Chiều dài khả dụng</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={`${item.type}-${item.p}`}>
                    <td><span className={item.type === "EPN" ? "type-pill type-epn" : "type-pill type-epj"}>{item.type}</span></td>
                    <td className="p-cell">{item.p}</td>
                    <td><div className="badge-row">{item.lengths.map((x) => <LengthBadge key={`${item.type}-${item.p}-${x.l}`} value={x.l} marked={x.lBracketed} />)}</div></td>
                    <td className="note-cell">
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

        <aside className="side-column">
          <div className="card">
            <div className="section-header">
              <div>
                <div className="eyebrow">Ghi chú</div>
                <h2>Hiểu nhanh ký hiệu</h2>
              </div>
            </div>
            <ul className="notes-list">
              <li><strong>*</strong> là chiều dài nằm trong ngoặc ở catalog gốc.</li>
              <li>Một số giá trị <strong>P</strong> trong ngoặc được giữ lại để tránh mất dữ liệu.</li>
              <li>Phù hợp để tra cứu nội bộ, chọn size, hoặc gửi khách xem nhanh.</li>
            </ul>
          </div>

          <div className="card">
            <div className="section-header">
              <div>
                <div className="eyebrow">Ví dụ</div>
                <h2>Mã đặt hàng</h2>
              </div>
            </div>
            <div className="code-samples">
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
