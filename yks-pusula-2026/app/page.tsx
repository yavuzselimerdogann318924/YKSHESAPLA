"use client";

import { useMemo, useState } from "react";
import {
  calculateYks,
  emptyNets,
  SCORE_LABELS,
  type ScoreType,
  type SubjectId,
} from "./yks-engine";

type TargetType = Exclude<ScoreType, "TYT">;
type EntryMode = "answers" | "net";
type AnswerValue = { correct: string; wrong: string; net: string };
type AnswerMap = Record<SubjectId, AnswerValue>;

interface SubjectDefinition {
  id: SubjectId;
  label: string;
  questions: number;
  note?: string;
}

const SUBJECTS: Record<SubjectId, SubjectDefinition> = {
  tytTurkce: { id: "tytTurkce", label: "Türkçe", questions: 40 },
  tytSosyal: { id: "tytSosyal", label: "Sosyal Bilimler", questions: 20 },
  tytMatematik: { id: "tytMatematik", label: "Temel Matematik", questions: 40 },
  tytFen: { id: "tytFen", label: "Fen Bilimleri", questions: 20 },
  aytEdebiyat: {
    id: "aytEdebiyat",
    label: "Türk Dili ve Edebiyatı",
    questions: 23,
    note: "1 soru iptal",
  },
  aytTarih1: { id: "aytTarih1", label: "Tarih-1", questions: 10 },
  aytCografya1: { id: "aytCografya1", label: "Coğrafya-1", questions: 6 },
  aytTarih2: { id: "aytTarih2", label: "Tarih-2", questions: 11 },
  aytCografya2: { id: "aytCografya2", label: "Coğrafya-2", questions: 11 },
  aytFelsefe: { id: "aytFelsefe", label: "Felsefe Grubu", questions: 12 },
  aytDin: { id: "aytDin", label: "Din Kültürü / Ek Felsefe", questions: 6 },
  aytMatematik: { id: "aytMatematik", label: "AYT Matematik", questions: 40 },
  aytFizik: { id: "aytFizik", label: "Fizik", questions: 14 },
  aytKimya: { id: "aytKimya", label: "Kimya", questions: 13 },
  aytBiyoloji: { id: "aytBiyoloji", label: "Biyoloji", questions: 13 },
  ydtDil: { id: "ydtDil", label: "Yabancı Dil (İngilizce)", questions: 80 },
};

const TYT_SUBJECTS: SubjectId[] = ["tytTurkce", "tytSosyal", "tytMatematik", "tytFen"];

const TARGET_SUBJECTS: Record<TargetType, SubjectId[]> = {
  SAY: ["aytMatematik", "aytFizik", "aytKimya", "aytBiyoloji"],
  EA: ["aytEdebiyat", "aytTarih1", "aytCografya1", "aytMatematik"],
  SOZ: [
    "aytEdebiyat",
    "aytTarih1",
    "aytCografya1",
    "aytTarih2",
    "aytCografya2",
    "aytFelsefe",
    "aytDin",
  ],
  DIL: ["ydtDil"],
};

const TARGET_SHORT: Record<TargetType, string> = {
  SAY: "SAY",
  EA: "EA",
  SOZ: "SÖZ",
  DIL: "DİL",
};

const ALL_SUBJECT_IDS = Object.keys(SUBJECTS) as SubjectId[];

function makeEmptyAnswers(): AnswerMap {
  return Object.fromEntries(
    ALL_SUBJECT_IDS.map((id) => [id, { correct: "", wrong: "", net: "" }]),
  ) as AnswerMap;
}

function parseNumeric(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatScore(value: number) {
  return value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPreciseScore(value: number) {
  return value.toLocaleString("tr-TR", { minimumFractionDigits: 5, maximumFractionDigits: 5 });
}

function formatRank(value: number) {
  return value.toLocaleString("tr-TR");
}

function formatNet(value: number) {
  return value.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatPercent(value: number) {
  return value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SubjectRow({
  subject,
  value,
  net,
  mode,
  onChange,
}: {
  subject: SubjectDefinition;
  value: AnswerValue;
  net: number;
  mode: EntryMode;
  onChange: (field: keyof AnswerValue, value: string) => void;
}) {
  return (
    <div className="subject-row">
      <div className="subject-name">
        <strong>{subject.label}</strong>
        <span>
          {subject.questions} soru{subject.note ? ` · ${subject.note}` : ""}
        </span>
      </div>

      {mode === "answers" ? (
        <div className="answer-inputs">
          <label>
            <span className="sr-only">{subject.label} doğru</span>
            <input
              aria-label={`${subject.label} doğru`}
              inputMode="numeric"
              min="0"
              max={subject.questions}
              placeholder="0"
              type="number"
              value={value.correct}
              onChange={(event) => onChange("correct", event.target.value)}
            />
          </label>
          <label>
            <span className="sr-only">{subject.label} yanlış</span>
            <input
              aria-label={`${subject.label} yanlış`}
              inputMode="numeric"
              min="0"
              max={subject.questions}
              placeholder="0"
              type="number"
              value={value.wrong}
              onChange={(event) => onChange("wrong", event.target.value)}
            />
          </label>
        </div>
      ) : (
        <label className="net-input-wrap">
          <span className="sr-only">{subject.label} net</span>
          <input
            aria-label={`${subject.label} net`}
            inputMode="decimal"
            min={-subject.questions / 4}
            max={subject.questions}
            placeholder="0,00"
            step="0.25"
            type="number"
            value={value.net}
            onChange={(event) => onChange("net", event.target.value)}
          />
        </label>
      )}

      <output className="net-chip" aria-label={`${subject.label} net sonucu`}>
        <span>{formatNet(net)}</span>
        <small>net</small>
      </output>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  detail,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  detail: string;
}) {
  return (
    <label className="toggle-row">
      <span>
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="toggle-control" aria-hidden="true" />
    </label>
  );
}

export default function Home() {
  const [target, setTarget] = useState<TargetType>("SAY");
  const [entryMode, setEntryMode] = useState<EntryMode>("answers");
  const [answers, setAnswers] = useState<AnswerMap>(() => makeEmptyAnswers());
  const [obpMode, setObpMode] = useState<"diploma" | "obp">("diploma");
  const [obpValue, setObpValue] = useState("");
  const [previousPlacement, setPreviousPlacement] = useState(false);
  const [vocationalExtra, setVocationalExtra] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const nets = useMemo(() => {
    const next = emptyNets();
    for (const id of ALL_SUBJECT_IDS) {
      const subject = SUBJECTS[id];
      const answer = answers[id];
      if (entryMode === "net") {
        next[id] = Math.max(
          -subject.questions / 4,
          Math.min(subject.questions, parseNumeric(answer.net)),
        );
      } else {
        const correct = Math.max(0, Math.min(subject.questions, parseNumeric(answer.correct)));
        const wrong = Math.max(
          0,
          Math.min(subject.questions - correct, parseNumeric(answer.wrong)),
        );
        next[id] = correct - wrong / 4;
      }
    }
    return next;
  }, [answers, entryMode]);

  const parsedObp = obpValue.trim() === "" ? null : parseNumeric(obpValue);
  const obpMin = obpMode === "diploma" ? 50 : 250;
  const obpMax = obpMode === "diploma" ? 100 : 500;
  const obpInvalid = parsedObp !== null && (parsedObp < obpMin || parsedObp > obpMax);

  const calculation = useMemo(
    () =>
      calculateYks({
        nets,
        obpValue: parsedObp,
        obpMode,
        previousPlacement,
        vocationalExtra,
      }),
    [nets, parsedObp, obpMode, previousPlacement, vocationalExtra],
  );

  const targetResult = calculation.results[target];
  const visibleAytSubjects = TARGET_SUBJECTS[target];
  const tytTotal = TYT_SUBJECTS.reduce((total, id) => total + nets[id], 0);
  const fieldTotal = visibleAytSubjects.reduce((total, id) => total + nets[id], 0);
  const placementActive = calculation.obp !== null;

  const changeEntryMode = (nextMode: EntryMode) => {
    if (nextMode === entryMode) return;
    if (nextMode === "net") {
      setAnswers((current) =>
        Object.fromEntries(
          ALL_SUBJECT_IDS.map((id) => [
            id,
            {
              ...current[id],
              net: nets[id] === 0 ? "" : String(Number(nets[id].toFixed(2))),
            },
          ]),
        ) as AnswerMap,
      );
    }
    setEntryMode(nextMode);
  };

  const changeObpMode = (nextMode: "diploma" | "obp") => {
    if (nextMode === obpMode) return;
    if (parsedObp !== null && !obpInvalid) {
      const converted = nextMode === "obp" ? parsedObp * 5 : parsedObp / 5;
      setObpValue(String(Number(converted.toFixed(2))));
    }
    setObpMode(nextMode);
  };

  const updateAnswer = (id: SubjectId, field: keyof AnswerValue, rawValue: string) => {
    const subject = SUBJECTS[id];
    const normalized = rawValue.replace(",", ".");
    if (normalized !== "" && !/^-?\d*\.?\d*$/.test(normalized)) return;

    setAnswers((current) => {
      const nextValue = { ...current[id] };
      if (normalized === "") {
        nextValue[field] = "";
      } else {
        let numeric = Number(normalized);
        if (field === "net") {
          numeric = Math.max(-subject.questions / 4, Math.min(subject.questions, numeric));
        } else {
          numeric = Math.max(0, Math.min(subject.questions, Math.trunc(numeric)));
          const otherField = field === "correct" ? "wrong" : "correct";
          const other = parseNumeric(nextValue[otherField]);
          numeric = Math.min(numeric, subject.questions - other);
        }
        nextValue[field] = String(numeric);
      }
      return { ...current, [id]: nextValue };
    });
  };

  const reset = () => {
    setAnswers(makeEmptyAnswers());
    setObpValue("");
    setPreviousPlacement(false);
    setVocationalExtra(false);
    setCopied(false);
  };

  const loadExample = () => {
    const example = makeEmptyAnswers();
    const values: Partial<Record<SubjectId, [number, number]>> = {
      tytTurkce: [32, 8],
      tytSosyal: [15, 5],
      tytMatematik: [25, 10],
      tytFen: [12, 4],
      aytMatematik: [30, 8],
      aytFizik: [10, 4],
      aytKimya: [9, 4],
      aytBiyoloji: [10, 3],
    };
    for (const [id, pair] of Object.entries(values)) {
      example[id as SubjectId] = {
        correct: String(pair?.[0] ?? ""),
        wrong: String(pair?.[1] ?? ""),
        net: "",
      };
    }
    setTarget("SAY");
    setEntryMode("answers");
    setAnswers(example);
    setObpMode("diploma");
    setObpValue("85");
    setPreviousPlacement(false);
    setVocationalExtra(false);
  };

  const copyResult = async () => {
    if (!targetResult) return;
    const activeScore = targetResult.placementScore ?? targetResult.score;
    const activeRank = targetResult.placementRank ?? targetResult.rank;
    const text = `2026 ${TARGET_SHORT[target]}: ${formatPreciseScore(activeScore)} puan · ${formatRank(activeRank)} sıralama`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="YKS Pusula ana sayfa">
          <span className="brand-mark">Y</span>
          <span>
            <strong>YKS Pusula</strong>
            <small>2026</small>
          </span>
        </a>
        <nav aria-label="Sayfa menüsü">
          <a href="#hesapla">Puan hesapla</a>
          <a href="/programlar">Program bul</a>
          <a href="#metod">Nasıl çalışır?</a>
        </nav>
        <span className="data-status"><i aria-hidden="true" /> 2026 verisi</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>2026 YKS</span><span>TYT · AYT · YDT</span></div>
        <h1>Netini gir.<br /><em>Yerini gör.</em></h1>
        <p>
          2026 test istatistikleri ve resmi puan dağılımı ile ham puanını, yerleştirme
          puanını ve tahmini başarı sıranı tek ekranda hesapla.
        </p>
        <div className="hero-proof" aria-label="Hesaplama özellikleri">
          <span><b>01</b> 2026 katsayıları</span>
          <span><b>02</b> OBP dahil</span>
          <span><b>03</b> Anlık sıralama</span>
        </div>
        <a className="hero-program-link" href="/programlar">21.493 program içinde okul ve bölüm ara <span>→</span></a>
      </section>

      <section className="calculator-shell" id="hesapla">
        <div className="calculator-main">
          <div className="panel-heading">
            <div><span className="eyebrow">Hedef puan türü</span><h2>Alanını seç</h2></div>
            <div className="quiet-actions">
              <button type="button" onClick={loadExample}>Örnek yükle</button>
              <button type="button" onClick={reset}>Temizle</button>
            </div>
          </div>

          <div className="target-tabs" role="tablist" aria-label="Puan türü">
            {(["SAY", "EA", "SOZ", "DIL"] as TargetType[]).map((type) => (
              <button
                aria-selected={target === type}
                className={target === type ? "active" : ""}
                key={type}
                role="tab"
                type="button"
                onClick={() => setTarget(type)}
              >
                <strong>{TARGET_SHORT[type]}</strong><span>{SCORE_LABELS[type]}</span>
              </button>
            ))}
          </div>

          <div className="entry-toolbar">
            <div><strong>Netlerini ekle</strong><span>Yanlışların ¼’ü doğrulardan düşer.</span></div>
            <div className="mode-switch" aria-label="Giriş biçimi">
              <button className={entryMode === "answers" ? "active" : ""} type="button" onClick={() => changeEntryMode("answers")}>Doğru / Yanlış</button>
              <button className={entryMode === "net" ? "active" : ""} type="button" onClick={() => changeEntryMode("net")}>Net gir</button>
            </div>
          </div>

          <section className="exam-block" aria-labelledby="tyt-title">
            <div className="exam-block-title">
              <div><span className="exam-index">01</span><div><h3 id="tyt-title">Temel Yeterlilik Testi</h3><p>TYT · Tüm puan türleri için ortak</p></div></div>
              <div className="section-total"><strong>{formatNet(tytTotal)}</strong><span>/ 120 net</span></div>
            </div>
            <div className={`subject-table ${entryMode === "net" ? "net-mode" : ""}`}>
              <div className="subject-table-head" aria-hidden="true">
                <span>Ders</span><span>{entryMode === "answers" ? "Doğru     Yanlış" : "Net"}</span><span>Sonuç</span>
              </div>
              {TYT_SUBJECTS.map((id) => (
                <SubjectRow key={id} subject={SUBJECTS[id]} value={answers[id]} net={nets[id]} mode={entryMode} onChange={(field, value) => updateAnswer(id, field, value)} />
              ))}
            </div>
          </section>

          <section className="exam-block" aria-labelledby="field-title">
            <div className="exam-block-title">
              <div><span className="exam-index accent">02</span><div><h3 id="field-title">{target === "DIL" ? "Yabancı Dil Testi" : "Alan Yeterlilik Testi"}</h3><p>{TARGET_SHORT[target]} için hesaba katılan testler</p></div></div>
              <div className="section-total"><strong>{formatNet(fieldTotal)}</strong><span>net</span></div>
            </div>
            <div className={`subject-table ${entryMode === "net" ? "net-mode" : ""}`}>
              <div className="subject-table-head" aria-hidden="true">
                <span>Ders</span><span>{entryMode === "answers" ? "Doğru     Yanlış" : "Net"}</span><span>Sonuç</span>
              </div>
              {visibleAytSubjects.map((id) => (
                <SubjectRow key={id} subject={SUBJECTS[id]} value={answers[id]} net={nets[id]} mode={entryMode} onChange={(field, value) => updateAnswer(id, field, value)} />
              ))}
            </div>
          </section>

          <section className="obp-block" aria-labelledby="obp-title">
            <div className="obp-copy"><span className="exam-index dark">03</span><div><h3 id="obp-title">Okul puanını ekle</h3><p>Boş bırakırsan yalnızca ham puan hesaplanır.</p></div></div>
            <div className="obp-grid">
              <div className="obp-input-card">
                <div className="mini-tabs">
                  <button className={obpMode === "diploma" ? "active" : ""} type="button" onClick={() => changeObpMode("diploma")}>Diploma notu</button>
                  <button className={obpMode === "obp" ? "active" : ""} type="button" onClick={() => changeObpMode("obp")}>OBP</button>
                </div>
                <label>
                  <span>{obpMode === "diploma" ? "50–100 arası" : "250–500 arası"}</span>
                  <input
                    aria-label={obpMode === "diploma" ? "Diploma notu" : "OBP"}
                    inputMode="decimal"
                    max={obpMode === "diploma" ? 100 : 500}
                    min={obpMode === "diploma" ? 50 : 250}
                    aria-invalid={obpInvalid}
                    placeholder={obpMode === "diploma" ? "Örn. 85" : "Örn. 425"}
                    step="0.01" type="number" value={obpValue}
                    onChange={(event) => setObpValue(event.target.value)}
                  />
                </label>
                {calculation.obp !== null && (
                  <div className="obp-live"><span>OBP</span><strong>{formatPreciseScore(calculation.obp)}</strong><span>Katkı +{formatPreciseScore(calculation.obpContribution)}</span></div>
                )}
                {obpInvalid && <p className="obp-error">{obpMin}–{obpMax} arasında bir değer gir.</p>}
              </div>
              <div className="obp-options">
                <Toggle checked={previousPlacement} onChange={setPreviousPlacement} label="Geçen yıl yerleştim" detail="OBP katsayısını yarıya indirir" />
                <Toggle checked={vocationalExtra} onChange={setVocationalExtra} label="Mesleki ek puan" detail="Uygunsa 0,06 ek katsayı uygular" />
              </div>
            </div>
          </section>
        </div>

        <aside className="result-column" aria-live="polite">
          <div className={`result-card ${targetResult ? "ready" : "empty"}`}>
            <div className="result-card-top">
              <span className="result-type">{TARGET_SHORT[target]} · 2026</span>
              {targetResult && <button type="button" onClick={copyResult}>{copied ? "Kopyalandı" : "Kopyala"}</button>}
            </div>
            {targetResult ? (
              <>
                <div className="primary-result">
                  <span>{placementActive ? "Yerleştirme puanın" : "Ham puanın"}</span>
                  <strong>{formatScore(targetResult.placementScore ?? targetResult.score)}</strong>
                  <small>kesin değer {formatPreciseScore(targetResult.placementScore ?? targetResult.score)}</small>
                </div>
                <div className="rank-result">
                  <span>Tahmini başarı sıran</span>
                  <strong>#{formatRank(targetResult.placementRank ?? targetResult.rank)}</strong>
                  <div className="rank-meta"><span>İlk %{formatPercent(targetResult.placementPercentile ?? targetResult.percentile)}</span><span>{formatRank(targetResult.totalCandidates)} aday</span></div>
                  <div className="rank-track" aria-hidden="true"><i style={{ width: `${Math.max(2, 100 - (targetResult.placementPercentile ?? targetResult.percentile))}%` }} /></div>
                </div>
                <div className="score-split">
                  <div><span>Ham {TARGET_SHORT[target]}</span><strong>{formatPreciseScore(targetResult.score)}</strong><small>#{formatRank(targetResult.rank)}</small></div>
                  <div className={!placementActive ? "muted" : ""}>
                    <span>Yerleştirme</span>
                    <strong>{placementActive && targetResult.placementScore !== null ? formatPreciseScore(targetResult.placementScore) : "OBP bekliyor"}</strong>
                    <small>{placementActive && targetResult.placementRank !== null ? `#${formatRank(targetResult.placementRank)}` : "Diploma notunu ekle"}</small>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-empty-state">
                <div className="empty-orbit"><span>{TARGET_SHORT[target]}</span></div>
                <h3>Sonucun burada belirecek</h3>
                <p>Önce TYT Türkçe veya Matematikten, ardından seçtiğin alan testlerinden en az 0,5 net gir.</p>
              </div>
            )}
            <div className="result-note"><span aria-hidden="true">i</span><p>Başarı sırası, ÖSYM’nin 2026 yığılımsal dağılımı üzerinden tahmin edilir.</p></div>
          </div>

          <div className="quick-results">
            <div className="quick-results-head"><h3>Hesaplanan puanlar</h3><span>Canlı</span></div>
            {(["TYT", "SAY", "EA", "SOZ", "DIL"] as ScoreType[]).map((type) => {
              const result = calculation.results[type];
              return (
                <button className={type === target ? "selected" : ""} disabled={!result || type === "TYT"} key={type} type="button" onClick={() => type !== "TYT" && setTarget(type as TargetType)}>
                  <span>{type === "SOZ" ? "SÖZ" : type === "DIL" ? "DİL" : type}</span>
                  <strong>{result ? formatScore(result.placementScore ?? result.score) : "—"}</strong>
                  <small>{result ? `#${formatRank(result.placementRank ?? result.rank)}` : "Net bekliyor"}</small>
                </button>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="method-section" id="metod">
        <div className="method-intro">
          <span className="eyebrow">Şeffaf hesaplama</span>
          <h2>Sadece sonucu değil, mantığını da gösteriyoruz.</h2>
          <p>Puan ve sıralama aynı şey değildir. Motor önce netlerinden 2026 sınav puanını, sonra resmi aday dağılımından yaklaşık sıranı bulur.</p>
          <button type="button" onClick={() => setDetailsOpen((open) => !open)}>{detailsOpen ? "Teknik ayrıntıyı kapat" : "Teknik ayrıntıyı aç"}<span aria-hidden="true">{detailsOpen ? "−" : "+"}</span></button>
        </div>
        <div className="method-steps">
          <article><span>01</span><h3>Net</h3><p>Doğru − yanlış ÷ 4</p></article>
          <article><span>02</span><h3>Puan</h3><p>2026 test katsayıları</p></article>
          <article><span>03</span><h3>Sıra</h3><p>Monoton kübik dağılım eğrisi</p></article>
        </div>
        {detailsOpen && (
          <div className="method-details">
            <div><strong>Neden sıralama tahmini?</strong><p>ÖSYM, aday sayılarını 20 puanlık eşiklerde yayımlar. Aradaki değerler şekli koruyan monoton kübik interpolasyonla hesaplanır; böylece sıralama her puanda düzenli ilerler ve yayımlanan eşiklerle birebir kesişir.</p></div>
            <div><strong>2026’ya özel ne var?</strong><p>Testlerin 2026 ortalama ve standart sapmaları, iptal edilen AYT TDE–Sosyal-1 sorusu ve güncel aday sayıları hesaba katılır.</p></div>
          </div>
        )}
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">Y</span><div><strong>YKS Pusula</strong><small>2026 puan ve sıra hesaplama</small></div></div>
        <p>Bu araç tahmin amaçlıdır; resmi sonuç belgesi yerine geçmez. Veriler 21 Temmuz 2026 tarihli ÖSYM sayısal bilgilerine dayanır.</p>
        <div className="footer-links">
          <a href="/programlar">Program bul</a>
          <a href="https://cdn.osym.gov.tr/pdfdokuman/2026/YKS/SB/sayisal_ykdd21072026.pdf" target="_blank" rel="noreferrer">ÖSYM verisi</a>
          <a href="https://yks-puan.hesaplama.net/" target="_blank" rel="noreferrer">Referans araç</a>
        </div>
      </footer>
    </main>
  );
}
