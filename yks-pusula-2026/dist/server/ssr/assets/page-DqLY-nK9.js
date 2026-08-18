import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as calculateYks, r as emptyNets, t as SCORE_LABELS } from "./yks-engine-BFGuSsLL.js";
//#region app/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var SUBJECTS = {
	tytTurkce: {
		id: "tytTurkce",
		label: "Türkçe",
		questions: 40
	},
	tytSosyal: {
		id: "tytSosyal",
		label: "Sosyal Bilimler",
		questions: 20
	},
	tytMatematik: {
		id: "tytMatematik",
		label: "Temel Matematik",
		questions: 40
	},
	tytFen: {
		id: "tytFen",
		label: "Fen Bilimleri",
		questions: 20
	},
	aytEdebiyat: {
		id: "aytEdebiyat",
		label: "Türk Dili ve Edebiyatı",
		questions: 23,
		note: "1 soru iptal"
	},
	aytTarih1: {
		id: "aytTarih1",
		label: "Tarih-1",
		questions: 10
	},
	aytCografya1: {
		id: "aytCografya1",
		label: "Coğrafya-1",
		questions: 6
	},
	aytTarih2: {
		id: "aytTarih2",
		label: "Tarih-2",
		questions: 11
	},
	aytCografya2: {
		id: "aytCografya2",
		label: "Coğrafya-2",
		questions: 11
	},
	aytFelsefe: {
		id: "aytFelsefe",
		label: "Felsefe Grubu",
		questions: 12
	},
	aytDin: {
		id: "aytDin",
		label: "Din Kültürü / Ek Felsefe",
		questions: 6
	},
	aytMatematik: {
		id: "aytMatematik",
		label: "AYT Matematik",
		questions: 40
	},
	aytFizik: {
		id: "aytFizik",
		label: "Fizik",
		questions: 14
	},
	aytKimya: {
		id: "aytKimya",
		label: "Kimya",
		questions: 13
	},
	aytBiyoloji: {
		id: "aytBiyoloji",
		label: "Biyoloji",
		questions: 13
	},
	ydtDil: {
		id: "ydtDil",
		label: "Yabancı Dil (İngilizce)",
		questions: 80
	}
};
var TYT_SUBJECTS = [
	"tytTurkce",
	"tytSosyal",
	"tytMatematik",
	"tytFen"
];
var TARGET_SUBJECTS = {
	SAY: [
		"aytMatematik",
		"aytFizik",
		"aytKimya",
		"aytBiyoloji"
	],
	EA: [
		"aytEdebiyat",
		"aytTarih1",
		"aytCografya1",
		"aytMatematik"
	],
	SOZ: [
		"aytEdebiyat",
		"aytTarih1",
		"aytCografya1",
		"aytTarih2",
		"aytCografya2",
		"aytFelsefe",
		"aytDin"
	],
	DIL: ["ydtDil"]
};
var TARGET_SHORT = {
	SAY: "SAY",
	EA: "EA",
	SOZ: "SÖZ",
	DIL: "DİL"
};
var ALL_SUBJECT_IDS = Object.keys(SUBJECTS);
function makeEmptyAnswers() {
	return Object.fromEntries(ALL_SUBJECT_IDS.map((id) => [id, {
		correct: "",
		wrong: "",
		net: ""
	}]));
}
function parseNumeric(value) {
	const parsed = Number(value.replace(",", "."));
	return Number.isFinite(parsed) ? parsed : 0;
}
function formatScore(value) {
	return value.toLocaleString("tr-TR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
function formatPreciseScore(value) {
	return value.toLocaleString("tr-TR", {
		minimumFractionDigits: 5,
		maximumFractionDigits: 5
	});
}
function formatRank(value) {
	return value.toLocaleString("tr-TR");
}
function formatNet(value) {
	return value.toLocaleString("tr-TR", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	});
}
function formatPercent(value) {
	return value.toLocaleString("tr-TR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
function SubjectRow({ subject, value, net, mode, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "subject-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "subject-name",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: subject.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					subject.questions,
					" soru",
					subject.note ? ` · ${subject.note}` : ""
				] })]
			}),
			mode === "answers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "answer-inputs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "sr-only",
					children: [subject.label, " doğru"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": `${subject.label} doğru`,
					inputMode: "numeric",
					min: "0",
					max: subject.questions,
					placeholder: "0",
					type: "number",
					value: value.correct,
					onChange: (event) => onChange("correct", event.target.value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "sr-only",
					children: [subject.label, " yanlış"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": `${subject.label} yanlış`,
					inputMode: "numeric",
					min: "0",
					max: subject.questions,
					placeholder: "0",
					type: "number",
					value: value.wrong,
					onChange: (event) => onChange("wrong", event.target.value)
				})] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "net-input-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "sr-only",
					children: [subject.label, " net"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": `${subject.label} net`,
					inputMode: "decimal",
					min: -subject.questions / 4,
					max: subject.questions,
					placeholder: "0,00",
					step: "0.25",
					type: "number",
					value: value.net,
					onChange: (event) => onChange("net", event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
				className: "net-chip",
				"aria-label": `${subject.label} net sonucu`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatNet(net) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "net" })]
			})
		]
	});
}
function Toggle({ checked, onChange, label, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "toggle-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked,
				onChange: (event) => onChange(event.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "toggle-control",
				"aria-hidden": "true"
			})
		]
	});
}
function Home() {
	const [target, setTarget] = (0, import_react.useState)("SAY");
	const [entryMode, setEntryMode] = (0, import_react.useState)("answers");
	const [answers, setAnswers] = (0, import_react.useState)(() => makeEmptyAnswers());
	const [obpMode, setObpMode] = (0, import_react.useState)("diploma");
	const [obpValue, setObpValue] = (0, import_react.useState)("");
	const [previousPlacement, setPreviousPlacement] = (0, import_react.useState)(false);
	const [vocationalExtra, setVocationalExtra] = (0, import_react.useState)(false);
	const [detailsOpen, setDetailsOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const nets = (0, import_react.useMemo)(() => {
		const next = emptyNets();
		for (const id of ALL_SUBJECT_IDS) {
			const subject = SUBJECTS[id];
			const answer = answers[id];
			if (entryMode === "net") next[id] = Math.max(-subject.questions / 4, Math.min(subject.questions, parseNumeric(answer.net)));
			else {
				const correct = Math.max(0, Math.min(subject.questions, parseNumeric(answer.correct)));
				next[id] = correct - Math.max(0, Math.min(subject.questions - correct, parseNumeric(answer.wrong))) / 4;
			}
		}
		return next;
	}, [answers, entryMode]);
	const parsedObp = obpValue.trim() === "" ? null : parseNumeric(obpValue);
	const obpMin = obpMode === "diploma" ? 50 : 250;
	const obpMax = obpMode === "diploma" ? 100 : 500;
	const obpInvalid = parsedObp !== null && (parsedObp < obpMin || parsedObp > obpMax);
	const calculation = (0, import_react.useMemo)(() => calculateYks({
		nets,
		obpValue: parsedObp,
		obpMode,
		previousPlacement,
		vocationalExtra
	}), [
		nets,
		parsedObp,
		obpMode,
		previousPlacement,
		vocationalExtra
	]);
	const targetResult = calculation.results[target];
	const visibleAytSubjects = TARGET_SUBJECTS[target];
	const tytTotal = TYT_SUBJECTS.reduce((total, id) => total + nets[id], 0);
	const fieldTotal = visibleAytSubjects.reduce((total, id) => total + nets[id], 0);
	const placementActive = calculation.obp !== null;
	const changeEntryMode = (nextMode) => {
		if (nextMode === entryMode) return;
		if (nextMode === "net") setAnswers((current) => Object.fromEntries(ALL_SUBJECT_IDS.map((id) => [id, {
			...current[id],
			net: nets[id] === 0 ? "" : String(Number(nets[id].toFixed(2)))
		}])));
		setEntryMode(nextMode);
	};
	const changeObpMode = (nextMode) => {
		if (nextMode === obpMode) return;
		if (parsedObp !== null && !obpInvalid) {
			const converted = nextMode === "obp" ? parsedObp * 5 : parsedObp / 5;
			setObpValue(String(Number(converted.toFixed(2))));
		}
		setObpMode(nextMode);
	};
	const updateAnswer = (id, field, rawValue) => {
		const subject = SUBJECTS[id];
		const normalized = rawValue.replace(",", ".");
		if (normalized !== "" && !/^-?\d*\.?\d*$/.test(normalized)) return;
		setAnswers((current) => {
			const nextValue = { ...current[id] };
			if (normalized === "") nextValue[field] = "";
			else {
				let numeric = Number(normalized);
				if (field === "net") numeric = Math.max(-subject.questions / 4, Math.min(subject.questions, numeric));
				else {
					numeric = Math.max(0, Math.min(subject.questions, Math.trunc(numeric)));
					const other = parseNumeric(nextValue[field === "correct" ? "wrong" : "correct"]);
					numeric = Math.min(numeric, subject.questions - other);
				}
				nextValue[field] = String(numeric);
			}
			return {
				...current,
				[id]: nextValue
			};
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
		for (const [id, pair] of Object.entries({
			tytTurkce: [32, 8],
			tytSosyal: [15, 5],
			tytMatematik: [25, 10],
			tytFen: [12, 4],
			aytMatematik: [30, 8],
			aytFizik: [10, 4],
			aytKimya: [9, 4],
			aytBiyoloji: [10, 3]
		})) example[id] = {
			correct: String(pair?.[0] ?? ""),
			wrong: String(pair?.[1] ?? ""),
			net: ""
		};
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "brand",
					href: "/",
					"aria-label": "YKS Pusula ana sayfa",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "Y"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "YKS Pusula" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "2026" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Sayfa menüsü",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#hesapla",
							children: "Puan hesapla"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/programlar",
							children: "Program bul"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#metod",
							children: "Nasıl çalışır?"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "data-status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), " 2026 verisi"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-kicker",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2026 YKS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TYT · AYT · YDT" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"Netini gir.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Yerini gör." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "2026 test istatistikleri ve resmi puan dağılımı ile ham puanını, yerleştirme puanını ve tahmini başarı sıranı tek ekranda hesapla." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-proof",
					"aria-label": "Hesaplama özellikleri",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "01" }), " 2026 katsayıları"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "02" }), " OBP dahil"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "03" }), " Anlık sıralama"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "hero-program-link",
					href: "/programlar",
					children: ["21.493 program içinde okul ve bölüm ara ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "calculator-shell",
			id: "hesapla",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "calculator-main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Hedef puan türü"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Alanını seç" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "quiet-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: loadExample,
								children: "Örnek yükle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: reset,
								children: "Temizle"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "target-tabs",
						role: "tablist",
						"aria-label": "Puan türü",
						children: [
							"SAY",
							"EA",
							"SOZ",
							"DIL"
						].map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"aria-selected": target === type,
							className: target === type ? "active" : "",
							role: "tab",
							type: "button",
							onClick: () => setTarget(type),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: TARGET_SHORT[type] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: SCORE_LABELS[type] })]
						}, type))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "entry-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Netlerini ekle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yanlışların ¼’ü doğrulardan düşer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mode-switch",
							"aria-label": "Giriş biçimi",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: entryMode === "answers" ? "active" : "",
								type: "button",
								onClick: () => changeEntryMode("answers"),
								children: "Doğru / Yanlış"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: entryMode === "net" ? "active" : "",
								type: "button",
								onClick: () => changeEntryMode("net"),
								children: "Net gir"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "exam-block",
						"aria-labelledby": "tyt-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "exam-block-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "exam-index",
								children: "01"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "tyt-title",
								children: "Temel Yeterlilik Testi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "TYT · Tüm puan türleri için ortak" })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "section-total",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatNet(tytTotal) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/ 120 net" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `subject-table ${entryMode === "net" ? "net-mode" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "subject-table-head",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ders" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entryMode === "answers" ? "Doğru     Yanlış" : "Net" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sonuç" })
								]
							}), TYT_SUBJECTS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectRow, {
								subject: SUBJECTS[id],
								value: answers[id],
								net: nets[id],
								mode: entryMode,
								onChange: (field, value) => updateAnswer(id, field, value)
							}, id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "exam-block",
						"aria-labelledby": "field-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "exam-block-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "exam-index accent",
								children: "02"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "field-title",
								children: target === "DIL" ? "Yabancı Dil Testi" : "Alan Yeterlilik Testi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [TARGET_SHORT[target], " için hesaba katılan testler"] })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "section-total",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatNet(fieldTotal) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "net" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `subject-table ${entryMode === "net" ? "net-mode" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "subject-table-head",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ders" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entryMode === "answers" ? "Doğru     Yanlış" : "Net" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sonuç" })
								]
							}), visibleAytSubjects.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectRow, {
								subject: SUBJECTS[id],
								value: answers[id],
								net: nets[id],
								mode: entryMode,
								onChange: (field, value) => updateAnswer(id, field, value)
							}, id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "obp-block",
						"aria-labelledby": "obp-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "obp-copy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "exam-index dark",
								children: "03"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "obp-title",
								children: "Okul puanını ekle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Boş bırakırsan yalnızca ham puan hesaplanır." })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "obp-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "obp-input-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mini-tabs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: obpMode === "diploma" ? "active" : "",
											type: "button",
											onClick: () => changeObpMode("diploma"),
											children: "Diploma notu"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: obpMode === "obp" ? "active" : "",
											type: "button",
											onClick: () => changeObpMode("obp"),
											children: "OBP"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: obpMode === "diploma" ? "50–100 arası" : "250–500 arası" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										"aria-label": obpMode === "diploma" ? "Diploma notu" : "OBP",
										inputMode: "decimal",
										max: obpMode === "diploma" ? 100 : 500,
										min: obpMode === "diploma" ? 50 : 250,
										"aria-invalid": obpInvalid,
										placeholder: obpMode === "diploma" ? "Örn. 85" : "Örn. 425",
										step: "0.01",
										type: "number",
										value: obpValue,
										onChange: (event) => setObpValue(event.target.value)
									})] }),
									calculation.obp !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "obp-live",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OBP" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatPreciseScore(calculation.obp) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Katkı +", formatPreciseScore(calculation.obpContribution)] })
										]
									}),
									obpInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "obp-error",
										children: [
											obpMin,
											"–",
											obpMax,
											" arasında bir değer gir."
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "obp-options",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									checked: previousPlacement,
									onChange: setPreviousPlacement,
									label: "Geçen yıl yerleştim",
									detail: "OBP katsayısını yarıya indirir"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									checked: vocationalExtra,
									onChange: setVocationalExtra,
									label: "Mesleki ek puan",
									detail: "Uygunsa 0,06 ek katsayı uygular"
								})]
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "result-column",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `result-card ${targetResult ? "ready" : "empty"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "result-card-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "result-type",
								children: [TARGET_SHORT[target], " · 2026"]
							}), targetResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: copyResult,
								children: copied ? "Kopyalandı" : "Kopyala"
							})]
						}),
						targetResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "primary-result",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: placementActive ? "Yerleştirme puanın" : "Ham puanın" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatScore(targetResult.placementScore ?? targetResult.score) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["kesin değer ", formatPreciseScore(targetResult.placementScore ?? targetResult.score)] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rank-result",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tahmini başarı sıran" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatRank(targetResult.placementRank ?? targetResult.rank)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rank-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["İlk %", formatPercent(targetResult.placementPercentile ?? targetResult.percentile)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatRank(targetResult.totalCandidates), " aday"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rank-track",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Math.max(2, 100 - (targetResult.placementPercentile ?? targetResult.percentile))}%` } })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "score-split",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ham ", TARGET_SHORT[target]] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatPreciseScore(targetResult.score) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["#", formatRank(targetResult.rank)] })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: !placementActive ? "muted" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yerleştirme" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: placementActive && targetResult.placementScore !== null ? formatPreciseScore(targetResult.placementScore) : "OBP bekliyor" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: placementActive && targetResult.placementRank !== null ? `#${formatRank(targetResult.placementRank)}` : "Diploma notunu ekle" })
									]
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "result-empty-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-orbit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: TARGET_SHORT[target] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Sonucun burada belirecek" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Önce TYT Türkçe veya Matematikten, ardından seçtiğin alan testlerinden en az 0,5 net gir." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "result-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "i"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Başarı sırası, ÖSYM’nin 2026 yığılımsal dağılımı üzerinden tahmin edilir." })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "quick-results",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "quick-results-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Hesaplanan puanlar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Canlı" })]
					}), [
						"TYT",
						"SAY",
						"EA",
						"SOZ",
						"DIL"
					].map((type) => {
						const result = calculation.results[type];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: type === target ? "selected" : "",
							disabled: !result || type === "TYT",
							type: "button",
							onClick: () => type !== "TYT" && setTarget(type),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: type === "SOZ" ? "SÖZ" : type === "DIL" ? "DİL" : type }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: result ? formatScore(result.placementScore ?? result.score) : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: result ? `#${formatRank(result.placementRank ?? result.rank)}` : "Net bekliyor" })
							]
						}, type);
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "method-section",
			id: "metod",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "method-intro",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Şeffaf hesaplama"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sadece sonucu değil, mantığını da gösteriyoruz." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Puan ve sıralama aynı şey değildir. Motor önce netlerinden 2026 sınav puanını, sonra resmi aday dağılımından yaklaşık sıranı bulur." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDetailsOpen((open) => !open),
							children: [detailsOpen ? "Teknik ayrıntıyı kapat" : "Teknik ayrıntıyı aç", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: detailsOpen ? "−" : "+"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "method-steps",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Net" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Doğru − yanlış ÷ 4" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Puan" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "2026 test katsayıları" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Sıra" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Monoton kübik dağılım eğrisi" })
						] })
					]
				}),
				detailsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "method-details",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Neden sıralama tahmini?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ÖSYM, aday sayılarını 20 puanlık eşiklerde yayımlar. Aradaki değerler şekli koruyan monoton kübik interpolasyonla hesaplanır; böylece sıralama her puanda düzenli ilerler ve yayımlanan eşiklerle birebir kesişir." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2026’ya özel ne var?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Testlerin 2026 ortalama ve standart sapmaları, iptal edilen AYT TDE–Sosyal-1 sorusu ve güncel aday sayıları hesaba katılır." })] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-mark",
					children: "Y"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "YKS Pusula" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "2026 puan ve sıra hesaplama" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bu araç tahmin amaçlıdır; resmi sonuç belgesi yerine geçmez. Veriler 21 Temmuz 2026 tarihli ÖSYM sayısal bilgilerine dayanır." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-links",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/programlar",
						children: "Program bul"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://cdn.osym.gov.tr/pdfdokuman/2026/YKS/SB/sayisal_ykdd21072026.pdf",
						target: "_blank",
						rel: "noreferrer",
						children: "ÖSYM verisi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://yks-puan.hesaplama.net/",
						target: "_blank",
						rel: "noreferrer",
						children: "Referans araç"
					})
				]
			})
		] })
	] });
}
//#endregion
export { Home as default };
