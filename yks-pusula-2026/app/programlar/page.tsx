"use client";

import { useEffect, useMemo, useState } from "react";
import { estimateRank, type ScoreType } from "../yks-engine";

type CompactCell = string | number | null;
type CompactRow = CompactCell[];
type LevelFilter = "all" | 2 | 4;
type ScoreFilter = "all" | 0 | 1 | 2 | 3 | 4;

interface ProgramDataset {
  version: number;
  year: number;
  universities: string[];
  faculties: string[];
  programs: string[];
  rows: CompactRow[];
}

interface IndexedProgram {
  row: CompactRow;
  index: number;
  code: string;
  level: 2 | 4;
  universityType: number;
  university: string;
  faculty: string;
  program: string;
  scoreCode: 0 | 1 | 2 | 3 | 4;
  universitySearch: string;
  programSearch: string;
  generalMin: number | null;
}

interface QuotaResult {
  quota: number | null;
  placed: number | null;
  min: number | null;
  max: number | null;
}

const SCORE_LABELS = ["TYT", "SAY", "EA", "SÖZ", "DİL"] as const;
const SCORE_ENGINE_TYPES: ScoreType[] = ["TYT", "SAY", "EA", "SOZ", "DIL"];
const UNIVERSITY_TYPES = ["Devlet", "Vakıf", "KKTC", "Yurtdışı Kamu", "Yurtdışı Vakıf"];
const QUOTA_LABELS = ["Genel kontenjan", "Okul birincisi", "34+ kadın", "Şehit / gazi yakını"];

function numeric(value: CompactCell) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replaceAll("ı", "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function formatScore(value: number) {
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  });
}

function formatRank(value: number) {
  return value.toLocaleString("tr-TR");
}

function quotaFromRow(row: CompactRow, quotaIndex: number): QuotaResult {
  const start = 7 + quotaIndex * 4;
  return {
    quota: numeric(row[start]),
    placed: numeric(row[start + 1]),
    min: numeric(row[start + 2]),
    max: numeric(row[start + 3]),
  };
}

function scoreRank(scoreCode: number, score: number | null) {
  if (score === null) return null;
  return estimateRank(SCORE_ENGINE_TYPES[scoreCode], score, true);
}

function QuotaLine({
  item,
  label,
  scoreCode,
}: {
  item: QuotaResult;
  label: string;
  scoreCode: number;
}) {
  const minRank = scoreRank(scoreCode, item.min);
  const maxRank = scoreRank(scoreCode, item.max);

  return (
    <div className="quota-line">
      <div>
        <strong>{label}</strong>
        <small>
          {item.quota === null ? "Kontenjan yok" : `${item.placed ?? 0} / ${item.quota} yerleşen`}
        </small>
      </div>
      {item.min !== null ? (
        <div className="quota-line-values">
          <span><b>{formatScore(item.min)}</b><small>taban puan</small></span>
          <span><b>#{formatRank(minRank ?? 0)}</b><small>tahmini taban sıra</small></span>
          {item.max !== null && maxRank !== null && (
            <span><b>#{formatRank(maxRank)}</b><small>tahmini en iyi sıra</small></span>
          )}
        </div>
      ) : (
        <span className="quota-empty">Puan oluşmadı</span>
      )}
    </div>
  );
}

function ProgramCard({ item }: { item: IndexedProgram }) {
  const general = quotaFromRow(item.row, 0);
  const minRank = scoreRank(item.scoreCode, general.min);
  const maxRank = scoreRank(item.scoreCode, general.max);
  const specialQuotas = [1, 2, 3]
    .map((quotaIndex) => ({ quotaIndex, value: quotaFromRow(item.row, quotaIndex) }))
    .filter(({ value }) => value.quota !== null || value.min !== null);

  return (
    <article className={`program-card ${general.min === null ? "score-missing" : ""}`}>
      <div className="program-card-copy">
        <div className="program-card-meta">
          <span className={`score-badge score-${item.scoreCode}`}>{SCORE_LABELS[item.scoreCode]}</span>
          <span>{item.level === 4 ? "Lisans" : "Ön lisans"}</span>
          <span>{UNIVERSITY_TYPES[item.universityType]}</span>
          <span>#{item.code}</span>
        </div>
        <h2>{item.program}</h2>
        <p className="program-university">{item.university}</p>
        <p className="program-faculty">{item.faculty}</p>
        <div className="program-capacity">
          <span>Genel kontenjan</span>
          <strong>{general.placed ?? 0} / {general.quota ?? 0}</strong>
          <small>yerleşen</small>
        </div>
      </div>

      <div className="program-rank-panel">
        {general.min !== null && minRank !== null ? (
          <>
            <span>Tahmini taban sıra</span>
            <strong>#{formatRank(minRank)}</strong>
            <small>{formatScore(general.min)} taban puandan</small>
            <div className="program-score-range">
              <div><span>Tavan puan</span><b>{general.max === null ? "—" : formatScore(general.max)}</b></div>
              <div><span>Tahmini en iyi sıra</span><b>{maxRank === null ? "—" : `#${formatRank(maxRank)}`}</b></div>
            </div>
          </>
        ) : (
          <div className="program-no-score">
            <span>—</span>
            <strong>Sıralama oluşmadı</strong>
            <p>Bu kontenjanda taban puan yayımlanmamış.</p>
          </div>
        )}
      </div>

      {specialQuotas.length > 0 && (
        <details className="special-quotas">
          <summary>Diğer kontenjanları göster <span>{specialQuotas.length}</span></summary>
          <div>
            {specialQuotas.map(({ quotaIndex, value }) => (
              <QuotaLine
                item={value}
                key={quotaIndex}
                label={QUOTA_LABELS[quotaIndex]}
                scoreCode={item.scoreCode}
              />
            ))}
          </div>
        </details>
      )}
    </article>
  );
}

export default function ProgramsPage() {
  const [dataset, setDataset] = useState<ProgramDataset | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [universityQuery, setUniversityQuery] = useState("");
  const [programQuery, setProgramQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [universityTypeFilter, setUniversityTypeFilter] = useState("all");
  const [sortMode, setSortMode] = useState<"score" | "name">("score");
  const [visibleCount, setVisibleCount] = useState(18);

  useEffect(() => {
    let active = true;
    fetch("/data/programs-2026.json")
      .then((response) => {
        if (!response.ok) throw new Error("Program verisi yüklenemedi");
        return response.json() as Promise<ProgramDataset>;
      })
      .then((payload) => {
        if (active) setDataset(payload);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const indexedPrograms = useMemo<IndexedProgram[]>(() => {
    if (!dataset) return [];
    return dataset.rows.map((row, index) => {
      const university = dataset.universities[Number(row[3])] ?? "";
      const faculty = dataset.faculties[Number(row[4])] ?? "";
      const program = dataset.programs[Number(row[5])] ?? "";
      return {
        row,
        index,
        code: String(row[0]),
        level: Number(row[1]) as 2 | 4,
        universityType: Number(row[2]),
        university,
        faculty,
        program,
        scoreCode: Number(row[6]) as 0 | 1 | 2 | 3 | 4,
        universitySearch: normalizeSearch(university),
        programSearch: normalizeSearch(`${program} ${faculty}`),
        generalMin: numeric(row[9]),
      };
    });
  }, [dataset]);

  const universityOptions = useMemo(
    () => dataset?.universities.toSorted((a, b) => a.localeCompare(b, "tr")) ?? [],
    [dataset],
  );

  const filteredPrograms = useMemo(() => {
    const universityNeedle = normalizeSearch(universityQuery);
    const programNeedle = normalizeSearch(programQuery);
    const filtered = indexedPrograms.filter((item) => {
      if (levelFilter !== "all" && item.level !== levelFilter) return false;
      if (scoreFilter !== "all" && item.scoreCode !== scoreFilter) return false;
      if (universityTypeFilter !== "all" && item.universityType !== Number(universityTypeFilter)) return false;
      if (universityNeedle && !item.universitySearch.includes(universityNeedle)) return false;
      if (programNeedle && !item.programSearch.includes(programNeedle)) return false;
      return true;
    });

    return filtered.toSorted((a, b) => {
      if (sortMode === "name") {
        return `${a.university} ${a.program}`.localeCompare(`${b.university} ${b.program}`, "tr");
      }
      return (b.generalMin ?? -1) - (a.generalMin ?? -1);
    });
  }, [indexedPrograms, levelFilter, programQuery, scoreFilter, sortMode, universityQuery, universityTypeFilter]);

  useEffect(() => {
    setVisibleCount(18);
  }, [levelFilter, programQuery, scoreFilter, sortMode, universityQuery, universityTypeFilter]);

  const clearFilters = () => {
    setUniversityQuery("");
    setProgramQuery("");
    setLevelFilter("all");
    setScoreFilter("all");
    setUniversityTypeFilter("all");
    setSortMode("score");
  };

  return (
    <main className="program-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="YKS Pusula ana sayfa">
          <span className="brand-mark">Y</span>
          <span><strong>YKS Pusula</strong><small>2026</small></span>
        </a>
        <nav aria-label="Sayfa menüsü">
          <a href="/">Puan hesapla</a>
          <a className="active" href="/programlar">Program bul</a>
        </nav>
        <span className="data-status"><i aria-hidden="true" /> ÖSYM Tablo 3 + 4</span>
      </header>

      <section className="program-hero">
        <div>
          <span className="eyebrow">2026 tercih pusulası</span>
          <p>Üniversiteyi ve bölümü ara; listedeki taban ve tavan puanın 2026 yerleştirme dağılımında hangi sıraya denk geldiğini anında gör.</p>
        </div>
        <div className="program-stats" aria-label="Program verisi özeti">
          <div><strong>21.493</strong><span>program</span></div>
          <div><strong>228</strong><span>üniversite</span></div>
          <div><strong>5</strong><span>puan türü</span></div>
        </div>
      </section>

      <section className="program-search-shell" aria-labelledby="program-search-title">
        <div className="program-search-heading">
          <div><span className="eyebrow">Program seç</span><h2 id="program-search-title">Okulunu ve bölümünü bul</h2></div>
          <button type="button" onClick={clearFilters}>Filtreleri temizle</button>
        </div>

        <div className="program-search-grid">
          <label className="search-field">
            <span>Üniversite</span>
            <input
              list="university-options"
              placeholder="Örn. Hacettepe Üniversitesi"
              type="search"
              value={universityQuery}
              onChange={(event) => setUniversityQuery(event.target.value)}
            />
            <datalist id="university-options">
              {universityOptions.map((university) => <option key={university} value={university} />)}
            </datalist>
          </label>
          <label className="search-field">
            <span>Bölüm veya fakülte</span>
            <input
              placeholder="Örn. Tıp, Psikoloji, Bilgisayar..."
              type="search"
              value={programQuery}
              onChange={(event) => setProgramQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="program-filter-row">
          <div className="filter-group" aria-label="Öğrenim düzeyi">
            {(["all", 4, 2] as LevelFilter[]).map((value) => (
              <button className={levelFilter === value ? "active" : ""} key={value} type="button" onClick={() => setLevelFilter(value)}>
                {value === "all" ? "Tümü" : value === 4 ? "Lisans" : "Ön lisans"}
              </button>
            ))}
          </div>
          <div className="filter-group score-filter" aria-label="Puan türü">
            {(["all", 0, 1, 2, 3, 4] as ScoreFilter[]).map((value) => (
              <button className={scoreFilter === value ? "active" : ""} key={value} type="button" onClick={() => setScoreFilter(value)}>
                {value === "all" ? "Tüm puanlar" : SCORE_LABELS[value]}
              </button>
            ))}
          </div>
          <label className="compact-select">
            <span className="sr-only">Üniversite türü</span>
            <select value={universityTypeFilter} onChange={(event) => setUniversityTypeFilter(event.target.value)}>
              <option value="all">Tüm üniversiteler</option>
              {UNIVERSITY_TYPES.map((type, index) => <option key={type} value={index}>{type}</option>)}
            </select>
          </label>
          <label className="compact-select">
            <span className="sr-only">Sıralama biçimi</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as "score" | "name")}>
              <option value="score">Taban puanı yüksek</option>
              <option value="name">Üniversite / bölüm A–Z</option>
            </select>
          </label>
        </div>
      </section>

      <section className="program-results" aria-live="polite">
        <div className="program-results-heading">
          <div>
            <span className="eyebrow">2026 sonuçları</span>
            <h2>{dataset ? `${filteredPrograms.length.toLocaleString("tr-TR")} program bulundu` : "Programlar hazırlanıyor"}</h2>
          </div>
          <div className="placement-note"><span>i</span><p>Belgelerdeki puanlar yerleştirme puanıdır. Sıralamalar aynı türün 2026 yerleştirme dağılımından tahmin edilir.</p></div>
        </div>

        {!dataset && !loadError && (
          <div className="program-loading"><span /><span /><span /></div>
        )}
        {loadError && (
          <div className="program-state"><strong>Liste yüklenemedi.</strong><p>Sayfayı yenileyip tekrar deneyebilirsin.</p></div>
        )}
        {dataset && filteredPrograms.length === 0 && (
          <div className="program-state"><strong>Eşleşen program yok.</strong><p>Okul veya bölüm adını kısaltarak yeniden ara.</p><button type="button" onClick={clearFilters}>Tüm programları göster</button></div>
        )}
        {dataset && filteredPrograms.length > 0 && (
          <>
            <div className="program-list">
              {filteredPrograms.slice(0, visibleCount).map((item) => <ProgramCard item={item} key={`${item.code}-${item.index}`} />)}
            </div>
            {visibleCount < filteredPrograms.length && (
              <button className="load-more" type="button" onClick={() => setVisibleCount((count) => count + 18)}>
                18 program daha göster <span>{(filteredPrograms.length - visibleCount).toLocaleString("tr-TR")} kaldı</span>
              </button>
            )}
          </>
        )}
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">Y</span><div><strong>YKS Pusula</strong><small>2026 program ve sıralama rehberi</small></div></div>
        <p>Taban ve tavan puanlar yüklenen 2026 ÖSYM Tablo 3 ve Tablo 4 listelerinden alınmıştır. Başarı sıraları tahminidir; resmi tercih verisi yerine geçmez.</p>
        <div className="footer-links"><a href="/">Puan hesapla</a><a href="/programlar">Program bul</a></div>
      </footer>
    </main>
  );
}
