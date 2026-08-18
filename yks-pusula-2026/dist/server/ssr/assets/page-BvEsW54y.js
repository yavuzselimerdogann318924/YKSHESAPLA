import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as estimateRank } from "./yks-engine-BFGuSsLL.js";
//#region app/programlar/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var SCORE_LABELS = [
	"TYT",
	"SAY",
	"EA",
	"SÖZ",
	"DİL"
];
var SCORE_ENGINE_TYPES = [
	"TYT",
	"SAY",
	"EA",
	"SOZ",
	"DIL"
];
var UNIVERSITY_TYPES = [
	"Devlet",
	"Vakıf",
	"KKTC",
	"Yurtdışı Kamu",
	"Yurtdışı Vakıf"
];
var QUOTA_LABELS = [
	"Genel kontenjan",
	"Okul birincisi",
	"34+ kadın",
	"Şehit / gazi yakını"
];
function numeric(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function normalizeSearch(value) {
	return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll("ı", "i").replace(/[^a-z0-9]+/g, " ").trim();
}
function formatScore(value) {
	return value.toLocaleString("tr-TR", {
		minimumFractionDigits: 5,
		maximumFractionDigits: 5
	});
}
function formatRank(value) {
	return value.toLocaleString("tr-TR");
}
function quotaFromRow(row, quotaIndex) {
	const start = 7 + quotaIndex * 4;
	return {
		quota: numeric(row[start]),
		placed: numeric(row[start + 1]),
		min: numeric(row[start + 2]),
		max: numeric(row[start + 3])
	};
}
function scoreRank(scoreCode, score) {
	if (score === null) return null;
	return estimateRank(SCORE_ENGINE_TYPES[scoreCode], score, true);
}
function QuotaLine({ item, label, scoreCode }) {
	const minRank = scoreRank(scoreCode, item.min);
	const maxRank = scoreRank(scoreCode, item.max);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "quota-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.quota === null ? "Kontenjan yok" : `${item.placed ?? 0} / ${item.quota} yerleşen` })] }), item.min !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "quota-line-values",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatScore(item.min) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "taban puan" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["#", formatRank(minRank ?? 0)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "tahmini taban sıra" })] }),
				item.max !== null && maxRank !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["#", formatRank(maxRank)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "tahmini en iyi sıra" })] })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "quota-empty",
			children: "Puan oluşmadı"
		})]
	});
}
function ProgramCard({ item }) {
	const general = quotaFromRow(item.row, 0);
	const minRank = scoreRank(item.scoreCode, general.min);
	const maxRank = scoreRank(item.scoreCode, general.max);
	const specialQuotas = [
		1,
		2,
		3
	].map((quotaIndex) => ({
		quotaIndex,
		value: quotaFromRow(item.row, quotaIndex)
	})).filter(({ value }) => value.quota !== null || value.min !== null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `program-card ${general.min === null ? "score-missing" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "program-card-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-card-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `score-badge score-${item.scoreCode}`,
								children: SCORE_LABELS[item.scoreCode]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.level === 4 ? "Lisans" : "Ön lisans" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: UNIVERSITY_TYPES[item.universityType] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", item.code] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.program }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "program-university",
						children: item.university
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "program-faculty",
						children: item.faculty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-capacity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Genel kontenjan" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								general.placed ?? 0,
								" / ",
								general.quota ?? 0
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "yerleşen" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "program-rank-panel",
				children: general.min !== null && minRank !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tahmini taban sıra" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatRank(minRank)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [formatScore(general.min), " taban puandan"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-score-range",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tavan puan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: general.max === null ? "—" : formatScore(general.max) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tahmini en iyi sıra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: maxRank === null ? "—" : `#${formatRank(maxRank)}` })] })]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "program-no-score",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sıralama oluşmadı" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bu kontenjanda taban puan yayımlanmamış." })
					]
				})
			}),
			specialQuotas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "special-quotas",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["Diğer kontenjanları göster ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: specialQuotas.length })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: specialQuotas.map(({ quotaIndex, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotaLine, {
					item: value,
					label: QUOTA_LABELS[quotaIndex],
					scoreCode: item.scoreCode
				}, quotaIndex)) })]
			})
		]
	});
}
function ProgramsPage() {
	const [dataset, setDataset] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	const [universityQuery, setUniversityQuery] = (0, import_react.useState)("");
	const [programQuery, setProgramQuery] = (0, import_react.useState)("");
	const [levelFilter, setLevelFilter] = (0, import_react.useState)("all");
	const [scoreFilter, setScoreFilter] = (0, import_react.useState)("all");
	const [universityTypeFilter, setUniversityTypeFilter] = (0, import_react.useState)("all");
	const [sortMode, setSortMode] = (0, import_react.useState)("score");
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(18);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetch("/data/programs-2026.json").then((response) => {
			if (!response.ok) throw new Error("Program verisi yüklenemedi");
			return response.json();
		}).then((payload) => {
			if (active) setDataset(payload);
		}).catch(() => {
			if (active) setLoadError(true);
		});
		return () => {
			active = false;
		};
	}, []);
	const indexedPrograms = (0, import_react.useMemo)(() => {
		if (!dataset) return [];
		return dataset.rows.map((row, index) => {
			const university = dataset.universities[Number(row[3])] ?? "";
			const faculty = dataset.faculties[Number(row[4])] ?? "";
			const program = dataset.programs[Number(row[5])] ?? "";
			return {
				row,
				index,
				code: String(row[0]),
				level: Number(row[1]),
				universityType: Number(row[2]),
				university,
				faculty,
				program,
				scoreCode: Number(row[6]),
				universitySearch: normalizeSearch(university),
				programSearch: normalizeSearch(`${program} ${faculty}`),
				generalMin: numeric(row[9])
			};
		});
	}, [dataset]);
	const universityOptions = (0, import_react.useMemo)(() => dataset?.universities.toSorted((a, b) => a.localeCompare(b, "tr")) ?? [], [dataset]);
	const filteredPrograms = (0, import_react.useMemo)(() => {
		const universityNeedle = normalizeSearch(universityQuery);
		const programNeedle = normalizeSearch(programQuery);
		return indexedPrograms.filter((item) => {
			if (levelFilter !== "all" && item.level !== levelFilter) return false;
			if (scoreFilter !== "all" && item.scoreCode !== scoreFilter) return false;
			if (universityTypeFilter !== "all" && item.universityType !== Number(universityTypeFilter)) return false;
			if (universityNeedle && !item.universitySearch.includes(universityNeedle)) return false;
			if (programNeedle && !item.programSearch.includes(programNeedle)) return false;
			return true;
		}).toSorted((a, b) => {
			if (sortMode === "name") return `${a.university} ${a.program}`.localeCompare(`${b.university} ${b.program}`, "tr");
			return (b.generalMin ?? -1) - (a.generalMin ?? -1);
		});
	}, [
		indexedPrograms,
		levelFilter,
		programQuery,
		scoreFilter,
		sortMode,
		universityQuery,
		universityTypeFilter
	]);
	(0, import_react.useEffect)(() => {
		setVisibleCount(18);
	}, [
		levelFilter,
		programQuery,
		scoreFilter,
		sortMode,
		universityQuery,
		universityTypeFilter
	]);
	const clearFilters = () => {
		setUniversityQuery("");
		setProgramQuery("");
		setLevelFilter("all");
		setScoreFilter("all");
		setUniversityTypeFilter("all");
		setSortMode("score");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "program-page",
		children: [
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							children: "Puan hesapla"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "active",
							href: "/programlar",
							children: "Program bul"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "data-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), " ÖSYM Tablo 3 + 4"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "program-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "2026 tercih pusulası"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Puan yazılı.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Sırası bizde." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Üniversiteyi ve bölümü ara; listedeki taban ve tavan puanın 2026 yerleştirme dağılımında hangi sıraya denk geldiğini anında gör." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "program-stats",
					"aria-label": "Program verisi özeti",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "21.493" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "program" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "228" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "üniversite" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "puan türü" })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "program-search-shell",
				"aria-labelledby": "program-search-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-search-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Program seç"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "program-search-title",
							children: "Okulunu ve bölümünü bul"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearFilters,
							children: "Filtreleri temizle"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-search-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "search-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Üniversite" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									list: "university-options",
									placeholder: "Örn. Hacettepe Üniversitesi",
									type: "search",
									value: universityQuery,
									onChange: (event) => setUniversityQuery(event.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "university-options",
									children: universityOptions.map((university) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: university }, university))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "search-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bölüm veya fakülte" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Örn. Tıp, Psikoloji, Bilgisayar...",
								type: "search",
								value: programQuery,
								onChange: (event) => setProgramQuery(event.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-filter-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "filter-group",
								"aria-label": "Öğrenim düzeyi",
								children: [
									"all",
									4,
									2
								].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: levelFilter === value ? "active" : "",
									type: "button",
									onClick: () => setLevelFilter(value),
									children: value === "all" ? "Tümü" : value === 4 ? "Lisans" : "Ön lisans"
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "filter-group score-filter",
								"aria-label": "Puan türü",
								children: [
									"all",
									0,
									1,
									2,
									3,
									4
								].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: scoreFilter === value ? "active" : "",
									type: "button",
									onClick: () => setScoreFilter(value),
									children: value === "all" ? "Tüm puanlar" : SCORE_LABELS[value]
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "compact-select",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Üniversite türü"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: universityTypeFilter,
									onChange: (event) => setUniversityTypeFilter(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "Tüm üniversiteler"
									}), UNIVERSITY_TYPES.map((type, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: index,
										children: type
									}, type))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "compact-select",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Sıralama biçimi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortMode,
									onChange: (event) => setSortMode(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "score",
										children: "Taban puanı yüksek"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "name",
										children: "Üniversite / bölüm A–Z"
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "program-results",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-results-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "2026 sonuçları"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: dataset ? `${filteredPrograms.length.toLocaleString("tr-TR")} program bulundu` : "Programlar hazırlanıyor" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "placement-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "i" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Belgelerdeki puanlar yerleştirme puanıdır. Sıralamalar aynı türün 2026 yerleştirme dağılımından tahmin edilir." })]
						})]
					}),
					!dataset && !loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-loading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						]
					}),
					loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-state",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Liste yüklenemedi." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sayfayı yenileyip tekrar deneyebilirsin." })]
					}),
					dataset && filteredPrograms.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-state",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Eşleşen program yok." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Okul veya bölüm adını kısaltarak yeniden ara." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearFilters,
								children: "Tüm programları göster"
							})
						]
					}),
					dataset && filteredPrograms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "program-list",
						children: filteredPrograms.slice(0, visibleCount).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramCard, { item }, `${item.code}-${item.index}`))
					}), visibleCount < filteredPrograms.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "load-more",
						type: "button",
						onClick: () => setVisibleCount((count) => count + 18),
						children: ["18 program daha göster ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [(filteredPrograms.length - visibleCount).toLocaleString("tr-TR"), " kaldı"] })]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "Y"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "YKS Pusula" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "2026 program ve sıralama rehberi" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Taban ve tavan puanlar yüklenen 2026 ÖSYM Tablo 3 ve Tablo 4 listelerinden alınmıştır. Başarı sıraları tahminidir; resmi tercih verisi yerine geçmez." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-links",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						children: "Puan hesapla"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/programlar",
						children: "Program bul"
					})]
				})
			] })
		]
	});
}
//#endregion
export { ProgramsPage as default };
