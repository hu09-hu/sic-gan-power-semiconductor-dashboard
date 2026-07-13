"use client";

import { useMemo, useState } from "react";

type Tech = "全部" | "SiC" | "GaN";
type Period = 5 | 20 | 60;

const periodData = {
  5: { score: 58, label: "中性偏多", demand: 61, supply: 48, tech: 72, price: 51 },
  20: { score: 67, label: "趨勢轉強", demand: 73, supply: 55, tech: 76, price: 62 },
  60: { score: 63, label: "結構成長", demand: 69, supply: 59, tech: 71, price: 56 },
};

const segments = [
  { name: "基板／晶圓", tech: "SiC", score: 62, change: 4, signal: "供給改善", driver: "8 吋轉換、良率與長約價格", risk: "中國擴產造成價格壓力" },
  { name: "磊晶", tech: "SiC", score: 66, change: 7, signal: "需求回溫", driver: "車用認證與高壓平台導入", risk: "庫存去化進度分化" },
  { name: "功率元件", tech: "SiC", score: 74, change: 9, signal: "領先", driver: "EV 逆變器、AI 電源與工業驅動", risk: "車市成長低於預期" },
  { name: "功率元件", tech: "GaN", score: 78, change: 12, signal: "加速", driver: "AI 伺服器、快充、800V DC 架構", risk: "成本與可靠性驗證" },
  { name: "模組／封裝", tech: "SiC", score: 69, change: 6, signal: "轉強", driver: "高功率密度與散熱升級", risk: "車用價格年降" },
  { name: "設備／材料", tech: "全部", score: 64, change: 3, signal: "觀察", driver: "8 吋與 12 吋產線資本支出", risk: "擴產延後與稼動率不足" },
  { name: "終端應用", tech: "GaN", score: 76, change: 10, signal: "加速", driver: "資料中心電力轉換與消費快充", risk: "設計導入週期拉長" },
];

const companies = [
  { company: "Infineon", market: "DE", tech: "SiC + GaN", position: "IDM／元件／模組", strength: 86, catalyst: "Kulim 200mm、AI 電源", risk: "新產能利用率" },
  { company: "STMicroelectronics", market: "EU", tech: "SiC", position: "垂直整合 IDM", strength: 81, catalyst: "Catania SiC Campus", risk: "車用需求波動" },
  { company: "onsemi", market: "US", tech: "SiC", position: "基板至模組", strength: 77, catalyst: "EliteSiC 車用平台", risk: "客戶集中" },
  { company: "Wolfspeed", market: "US", tech: "SiC", position: "基板／晶圓／元件", strength: 59, catalyst: "8 吋良率爬坡", risk: "財務與量產執行" },
  { company: "Navitas", market: "US", tech: "GaN + SiC", position: "Fabless 功率 IC", strength: 68, catalyst: "AI 資料中心與高功率 GaN", risk: "營收規模與現金流" },
  { company: "漢磊", market: "TW", tech: "SiC + GaN", position: "晶圓代工／磊晶", strength: 64, catalyst: "第三代半導體在地供應鏈", risk: "稼動率與價格競爭" },
  { company: "嘉晶", market: "TW", tech: "SiC + GaN", position: "磊晶／材料", strength: 61, catalyst: "車用與工業應用驗證", risk: "需求放量時點" },
  { company: "朋程", market: "TW", tech: "SiC", position: "車用功率模組", strength: 71, catalyst: "車用整流與模組升級", risk: "車市庫存循環" },
];

const events = [
  { date: "2026-07-13", type: "每日檢查", tech: "全部", title: "更新報價、庫存、稼動率與公司公告", impact: "待填", level: "neutral" },
  { date: "2026-06", type: "應用", tech: "SiC / GaN", title: "AI 資料中心電力架構持續提高寬能隙元件能見度", impact: "正向", level: "up" },
  { date: "2026-05", type: "產能", tech: "SiC", title: "全球 IDM 持續推進 200mm SiC 產能與垂直整合", impact: "供給增加", level: "watch" },
  { date: "追蹤中", type: "價格", tech: "SiC", title: "中國供給擴張與長約重談可能壓低基板／晶圓價格", impact: "風險", level: "down" },
];

function Ring({ value }: { value: number }) {
  return <div className="ring" style={{ "--value": `${value * 3.6}deg` } as React.CSSProperties}><div><strong>{value}</strong><span>/ 100</span></div></div>;
}

export default function Home() {
  const [period, setPeriod] = useState<Period>(20);
  const [tech, setTech] = useState<Tech>("全部");
  const [companyQuery, setCompanyQuery] = useState("");
  const current = periodData[period];
  const filteredSegments = useMemo(() => segments.filter(s => tech === "全部" || s.tech === tech || s.tech === "全部"), [tech]);
  const filteredCompanies = useMemo(() => companies.filter(c => (tech === "全部" || c.tech.includes(tech)) && c.company.toLowerCase().includes(companyQuery.toLowerCase())), [tech, companyQuery]);

  return (
    <main>
      <header className="topbar">
        <div className="brand"><div className="mark">WBG</div><div><h1>SiC・GaN 功率半導體儀表板</h1><p>寬能隙功率半導體｜產業鏈、資金與事件追蹤</p></div></div>
        <div className="asof"><span>更新日</span><strong>2026 / 07 / 13</strong><em>示範基準資料</em></div>
      </header>

      <section className="controls" aria-label="儀表板篩選器">
        <div className="segmented"><span>觀察週期</span>{([5,20,60] as Period[]).map(p => <button key={p} className={period === p ? "active" : ""} onClick={() => setPeriod(p)}>{p} 日</button>)}</div>
        <div className="segmented"><span>技術</span>{(["全部","SiC","GaN"] as Tech[]).map(t => <button key={t} className={tech === t ? "active" : ""} onClick={() => setTech(t)}>{t}</button>)}</div>
      </section>

      <section className="hero-grid">
        <article className="score-card dark"><div><p className="eyebrow">WBG SECTOR PULSE</p><h2>{period} 日產業熱度</h2><p className="status"><span></span>{current.label}</p></div><Ring value={current.score} /></article>
        <article className="metric"><p>需求動能</p><strong>{current.demand}</strong><span className="positive">EV・AI 電源</span><div className="mini"><i style={{width:`${current.demand}%`}} /></div></article>
        <article className="metric"><p>供需健康度</p><strong>{current.supply}</strong><span className="amber">庫存仍分化</span><div className="mini amberbar"><i style={{width:`${current.supply}%`}} /></div></article>
        <article className="metric"><p>技術／產能</p><strong>{current.tech}</strong><span className="positive">200mm・高功率</span><div className="mini"><i style={{width:`${current.tech}%`}} /></div></article>
        <article className="metric"><p>價格／獲利</p><strong>{current.price}</strong><span className="negative">價格競爭</span><div className="mini redbar"><i style={{width:`${current.price}%`}} /></div></article>
      </section>

      <section className="panel thesis">
        <div className="panel-title"><div><p className="eyebrow">DAILY THESIS</p><h2>今日板塊結論</h2></div><span className="pill">{tech}｜{period} 日</span></div>
        <div className="thesis-grid">
          <div className="headline"><b>01</b><div><h3>GaN 看 AI 電源加速，SiC 看車用去庫存後的量價修復</h3><p>短線焦點從單一 EV 滲透率，轉向資料中心、工業電源與 800V 平台的多引擎需求。追蹤時須把出貨成長與價格壓力拆開判讀。</p></div></div>
          <div className="signals"><div><span>下一個轉強訊號</span><strong>稼動率回升＋庫存週數下降</strong></div><div><span>主要風險</span><strong>基板價格下滑快於成本改善</strong></div><div><span>今日必查</span><strong>法說、擴產、車廠平台與 AI PSU 訂單</strong></div></div>
        </div>
      </section>

      <section className="two-col">
        <article className="panel">
          <div className="panel-title"><div><p className="eyebrow">VALUE CHAIN</p><h2>供應鏈板塊強度</h2></div><span className="hint">分數可換成每日資料</span></div>
          <div className="segment-list">{filteredSegments.sort((a,b)=>b.score-a.score).map((s,i)=><div className="segment-row" key={`${s.name}-${s.tech}`}><span className="rank">{String(i+1).padStart(2,"0")}</span><div className="segment-main"><div><strong>{s.name}</strong><small>{s.tech}</small></div><div className="bar"><i style={{width:`${s.score}%`}} /></div><p>{s.driver}</p></div><div className="segment-score"><strong>{s.score}</strong><span>+{s.change}</span></div></div>)}</div>
        </article>
        <article className="panel matrix-panel">
          <div className="panel-title"><div><p className="eyebrow">TECH MATRIX</p><h2>SiC vs. GaN 應用定位</h2></div></div>
          <div className="matrix">
            <div className="axis y">功率／電壓 →</div><div className="zone gan"><b>GaN</b><span>高頻・高功率密度</span><em>AI PSU｜快充｜伺服器 DC/DC</em></div><div className="zone sic"><b>SiC</b><span>高壓・高溫・高功率</span><em>EV 逆變器｜儲能｜工業驅動</em></div><div className="axis x">開關頻率 →</div>
          </div>
          <div className="legend"><span><i className="dot gan-dot"/>GaN：速度與密度</span><span><i className="dot sic-dot"/>SiC：耐壓與效率</span></div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-title company-head"><div><p className="eyebrow">COMPANY MONITOR</p><h2>代表公司觀察清單</h2></div><input aria-label="搜尋公司" placeholder="搜尋公司…" value={companyQuery} onChange={e=>setCompanyQuery(e.target.value)} /></div>
        <div className="table-wrap"><table><thead><tr><th>公司</th><th>市場</th><th>技術</th><th>產業位置</th><th>強度</th><th>近期催化劑</th><th>關鍵風險</th></tr></thead><tbody>{filteredCompanies.map(c=><tr key={c.company}><td><strong>{c.company}</strong></td><td>{c.market}</td><td><span className="tech-tag">{c.tech}</span></td><td>{c.position}</td><td><div className="inline-score"><i style={{width:`${c.strength}%`}}/><b>{c.strength}</b></div></td><td>{c.catalyst}</td><td>{c.risk}</td></tr>)}</tbody></table></div>
      </section>

      <section className="panel">
        <div className="panel-title"><div><p className="eyebrow">EVENT LOG</p><h2>每日事件與催化劑</h2></div><button className="outline" onClick={()=>alert("每日更新欄位：日期、事件、技術、影響、來源、備註。下一版可接 Google Sheets 或資料庫。")}>＋ 新增事件說明</button></div>
        <div className="event-grid">{events.map((e,i)=><article className="event" key={i}><time>{e.date}</time><span className={`impact ${e.level}`}>{e.impact}</span><small>{e.type} · {e.tech}</small><h3>{e.title}</h3></article>)}</div>
      </section>

      <footer><p>資料框架：公司公告、法說資料、產業研究、終端需求與公開市場資訊。</p><p>此儀表板為研究模板，不構成投資建議。正式使用前請以原始來源核對。</p></footer>
    </main>
  );
}
