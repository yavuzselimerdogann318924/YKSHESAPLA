//#region app/yks-engine.ts
var SCORE_LABELS = {
	TYT: "TYT",
	SAY: "Sayısal",
	SOZ: "Sözel",
	EA: "Eşit Ağırlık",
	DIL: "Dil"
};
var TOTAL_CANDIDATES = {
	TYT: 2187743,
	SAY: 1135718,
	SOZ: 1085698,
	EA: 1421290,
	DIL: 132826
};
var COEFFICIENTS = {
	TYT: {
		base: 150.67857,
		subjects: {
			tytTurkce: 2.7138,
			tytSosyal: 3.13278,
			tytMatematik: 3.24835,
			tytFen: 2.5786
		}
	},
	SAY: {
		base: 121.6530555,
		subjects: {
			tytTurkce: 1.23004,
			tytSosyal: 1.41994,
			tytMatematik: 1.47233,
			tytFen: 1.16876,
			aytMatematik: 3.0214728,
			aytFizik: 2.5347243,
			aytKimya: 2.5159743,
			aytBiyoloji: 2.6141571
		}
	},
	SOZ: {
		base: 122.7210459,
		subjects: {
			tytTurkce: 1.14394,
			tytSosyal: 1.32055,
			tytMatematik: 1.36926,
			tytFen: 1.08695,
			aytEdebiyat: 3.1329109,
			aytTarih1: 2.258254,
			aytCografya1: 2.4290233,
			aytTarih2: 3.236065,
			aytCografya2: 2.9326417,
			aytFelsefe: 4.203,
			aytDin: 1.9917033
		}
	},
	EA: {
		base: 123.346778,
		subjects: {
			tytTurkce: 1.19867,
			tytSosyal: 1.38373,
			tytMatematik: 1.43478,
			tytFen: 1.13895,
			aytEdebiyat: 3.28283,
			aytTarih1: 2.366316,
			aytCografya1: 2.54526,
			aytMatematik: 2.9442056
		}
	},
	DIL: {
		base: 109.767142,
		subjects: {
			tytTurkce: 1.42478,
			tytSosyal: 1.64475,
			tytMatematik: 1.70543,
			tytFen: 1.3538,
			ydtDil: 2.5854272
		}
	}
};
var RAW_SCORE_POINTS = [
	500,
	480,
	460,
	440,
	420,
	400,
	380,
	360,
	340,
	320,
	300,
	280,
	260,
	240,
	220,
	200,
	180,
	160,
	140,
	120,
	100
];
var RAW_RANKS = {
	TYT: [
		1,
		822,
		5524,
		17050,
		37770,
		67394,
		106404,
		155008,
		218156,
		302758,
		417935,
		577094,
		787244,
		1045340,
		1332391,
		1630698,
		1914717,
		2125244,
		2184873,
		2187723,
		2187743
	],
	SAY: [
		1,
		1453,
		8786,
		22370,
		39624,
		58728,
		78806,
		100553,
		125045,
		153304,
		187034,
		228643,
		279885,
		344536,
		430074,
		549793,
		721488,
		923753,
		1078515,
		1134006,
		1135718
	],
	SOZ: [
		1,
		10,
		74,
		214,
		560,
		1418,
		3936,
		10259,
		23653,
		47292,
		86560,
		148959,
		238848,
		360487,
		515916,
		699304,
		873860,
		998826,
		1065157,
		1084720,
		1085698
	],
	EA: [
		1,
		52,
		307,
		874,
		2097,
		4545,
		9486,
		23452,
		50608,
		89520,
		140784,
		210499,
		308127,
		440752,
		615366,
		832251,
		1069239,
		1272506,
		1391240,
		1420558,
		1421290
	],
	DIL: [
		1,
		118,
		628,
		1795,
		3632,
		6683,
		11576,
		18265,
		26469,
		35020,
		43883,
		52590,
		61992,
		72025,
		82982,
		94735,
		107579,
		120099,
		128950,
		132443,
		132826
	]
};
var PLACEMENT_SCORE_POINTS = [
	560,
	550,
	530,
	510,
	490,
	470,
	450,
	430,
	410,
	390,
	370,
	350,
	330,
	310,
	290,
	270,
	250,
	230,
	210,
	190,
	170,
	150,
	130,
	115
];
var PLACEMENT_RANKS = {
	TYT: [
		1,
		112,
		2045,
		8638,
		22600,
		45313,
		76021,
		115071,
		163211,
		225038,
		305570,
		412011,
		553526,
		735519,
		961261,
		1219171,
		1499060,
		1782951,
		2033331,
		2166477,
		2186977,
		2187734,
		2187742,
		2187743
	],
	SAY: [
		1,
		154,
		3500,
		12887,
		27402,
		44919,
		63669,
		83511,
		105112,
		129485,
		157778,
		191247,
		232317,
		282213,
		344726,
		425443,
		533920,
		681176,
		858167,
		1019046,
		1117304,
		1135198,
		1135713,
		1135718
	],
	SOZ: [
		1,
		4,
		14,
		69,
		221,
		606,
		1566,
		4058,
		10184,
		22750,
		45237,
		82479,
		140496,
		223004,
		333238,
		474443,
		642816,
		814264,
		953036,
		1040347,
		1078859,
		1085505,
		1085697,
		1085698
	],
	EA: [
		1,
		12,
		98,
		394,
		1118,
		2482,
		5299,
		12363,
		29700,
		58772,
		97839,
		148570,
		215631,
		307918,
		429479,
		585271,
		775922,
		990764,
		1196809,
		1347025,
		1412649,
		1421093,
		1421289,
		1421290
	],
	DIL: [
		1,
		14,
		231,
		942,
		2252,
		4241,
		7472,
		12254,
		18566,
		26352,
		34585,
		43129,
		51784,
		60948,
		70670,
		81109,
		92274,
		104127,
		116152,
		125789,
		131233,
		132714,
		132825,
		132826
	]
};
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function round5(value) {
	return Math.round((value + Number.EPSILON) * 1e5) / 1e5;
}
function pchip(pointsDescending, valuesDescending, query) {
	const x = [...pointsDescending].reverse();
	const y = [...valuesDescending].reverse();
	const n = x.length;
	if (query <= x[0]) return y[0];
	if (query >= x[n - 1]) return y[n - 1];
	const h = new Array(n - 1);
	const delta = new Array(n - 1);
	const slopes = new Array(n);
	for (let index = 0; index < n - 1; index += 1) {
		h[index] = x[index + 1] - x[index];
		delta[index] = (y[index + 1] - y[index]) / h[index];
	}
	const endpointSlope = (h0, h1, d0, d1) => {
		let result = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
		if (Math.sign(result) !== Math.sign(d0)) result = 0;
		else if (Math.sign(d0) !== Math.sign(d1) && Math.abs(result) > Math.abs(3 * d0)) result = 3 * d0;
		return result;
	};
	slopes[0] = endpointSlope(h[0], h[1], delta[0], delta[1]);
	slopes[n - 1] = endpointSlope(h[n - 2], h[n - 3], delta[n - 2], delta[n - 3]);
	for (let index = 1; index < n - 1; index += 1) if (delta[index - 1] * delta[index] <= 0) slopes[index] = 0;
	else {
		const w1 = 2 * h[index] + h[index - 1];
		const w2 = h[index] + 2 * h[index - 1];
		slopes[index] = (w1 + w2) / (w1 / delta[index - 1] + w2 / delta[index]);
	}
	let interval = 0;
	while (interval < n - 2 && query > x[interval + 1]) interval += 1;
	const t = (query - x[interval]) / h[interval];
	const t2 = t * t;
	const t3 = t2 * t;
	return (2 * t3 - 3 * t2 + 1) * y[interval] + (t3 - 2 * t2 + t) * h[interval] * slopes[interval] + (-2 * t3 + 3 * t2) * y[interval + 1] + (t3 - t2) * h[interval] * slopes[interval + 1];
}
function estimateRank(type, score, placement = false) {
	const total = TOTAL_CANDIDATES[type];
	const value = placement ? pchip(PLACEMENT_SCORE_POINTS, PLACEMENT_RANKS[type], score) : pchip(RAW_SCORE_POINTS, RAW_RANKS[type], score);
	return clamp(Math.round(value + (type === "DIL" && !placement ? .15 : 0)), 1, total);
}
function percentile(rank, total) {
	return Math.max(.01, rank / total * 100);
}
function isEligible(type, nets) {
	if (!(nets.tytTurkce >= .5 || nets.tytMatematik >= .5)) return false;
	if (type === "TYT") return true;
	if (type === "SAY") return nets.aytMatematik >= .5 || nets.aytFizik + nets.aytKimya + nets.aytBiyoloji >= .5;
	if (type === "EA") return nets.aytMatematik >= .5 || nets.aytEdebiyat + nets.aytTarih1 + nets.aytCografya1 >= .5;
	if (type === "SOZ") return nets.aytEdebiyat + nets.aytTarih1 + nets.aytCografya1 >= .5 || nets.aytTarih2 + nets.aytCografya2 + nets.aytFelsefe + nets.aytDin >= .5;
	return nets.ydtDil >= .5;
}
function scoreFor(type, nets) {
	const config = COEFFICIENTS[type];
	let value = config.base;
	for (const [subject, coefficient] of Object.entries(config.subjects)) value += nets[subject] * (coefficient ?? 0);
	return round5(clamp(value, 100, 500));
}
function normalizeObp(value, mode) {
	if (value === null || Number.isNaN(value)) return null;
	if (mode === "diploma") return value >= 50 && value <= 100 ? value * 5 : null;
	return value >= 250 && value <= 500 ? value : null;
}
function calculateYks({ nets, obpValue, obpMode, previousPlacement, vocationalExtra }) {
	const obp = normalizeObp(obpValue, obpMode);
	const obpContribution = obp !== null ? obp * (previousPlacement ? .06 : .12) + (vocationalExtra ? obp * .06 : 0) : 0;
	const results = {};
	for (const type of [
		"TYT",
		"SAY",
		"SOZ",
		"EA",
		"DIL"
	]) {
		if (!isEligible(type, nets)) continue;
		const score = scoreFor(type, nets);
		const totalCandidates = TOTAL_CANDIDATES[type];
		const rank = estimateRank(type, score);
		const placementScore = obp === null ? null : round5(score + obpContribution);
		const placementRank = placementScore === null ? null : estimateRank(type, placementScore, true);
		results[type] = {
			type,
			score,
			rank,
			percentile: percentile(rank, totalCandidates),
			placementScore,
			placementRank,
			placementPercentile: placementRank === null ? null : percentile(placementRank, totalCandidates),
			totalCandidates
		};
	}
	return {
		obp,
		obpContribution: round5(obpContribution),
		results
	};
}
function emptyNets() {
	return {
		tytTurkce: 0,
		tytSosyal: 0,
		tytMatematik: 0,
		tytFen: 0,
		aytEdebiyat: 0,
		aytTarih1: 0,
		aytCografya1: 0,
		aytTarih2: 0,
		aytCografya2: 0,
		aytFelsefe: 0,
		aytDin: 0,
		aytMatematik: 0,
		aytFizik: 0,
		aytKimya: 0,
		aytBiyoloji: 0,
		ydtDil: 0
	};
}
//#endregion
export { estimateRank as i, calculateYks as n, emptyNets as r, SCORE_LABELS as t };
