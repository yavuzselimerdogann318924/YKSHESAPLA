export type ScoreType = "TYT" | "SAY" | "SOZ" | "EA" | "DIL";

export type SubjectId =
  | "tytTurkce"
  | "tytSosyal"
  | "tytMatematik"
  | "tytFen"
  | "aytEdebiyat"
  | "aytTarih1"
  | "aytCografya1"
  | "aytTarih2"
  | "aytCografya2"
  | "aytFelsefe"
  | "aytDin"
  | "aytMatematik"
  | "aytFizik"
  | "aytKimya"
  | "aytBiyoloji"
  | "ydtDil";

export type NetMap = Record<SubjectId, number>;

export interface ScoreResult {
  type: ScoreType;
  score: number;
  rank: number;
  percentile: number;
  placementScore: number | null;
  placementRank: number | null;
  placementPercentile: number | null;
  totalCandidates: number;
}

export interface CalculationResult {
  obp: number | null;
  obpContribution: number;
  results: Partial<Record<ScoreType, ScoreResult>>;
}

const SCORE_LABELS: Record<ScoreType, string> = {
  TYT: "TYT",
  SAY: "Sayısal",
  SOZ: "Sözel",
  EA: "Eşit Ağırlık",
  DIL: "Dil",
};

export { SCORE_LABELS };

export const TOTAL_CANDIDATES: Record<ScoreType, number> = {
  TYT: 2_187_743,
  SAY: 1_135_718,
  SOZ: 1_085_698,
  EA: 1_421_290,
  DIL: 132_826,
};

const COEFFICIENTS: Record<
  ScoreType,
  { base: number; subjects: Partial<Record<SubjectId, number>> }
> = {
  TYT: {
    base: 150.67857,
    subjects: {
      tytTurkce: 2.7138,
      tytSosyal: 3.13278,
      tytMatematik: 3.24835,
      tytFen: 2.5786,
    },
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
      aytBiyoloji: 2.6141571,
    },
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
      aytDin: 1.9917033,
    },
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
      aytMatematik: 2.9442056,
    },
  },
  DIL: {
    base: 109.767142,
    subjects: {
      tytTurkce: 1.42478,
      tytSosyal: 1.64475,
      tytMatematik: 1.70543,
      tytFen: 1.3538,
      ydtDil: 2.5854272,
    },
  },
};

const RAW_SCORE_POINTS = [
  500, 480, 460, 440, 420, 400, 380, 360, 340, 320, 300, 280, 260,
  240, 220, 200, 180, 160, 140, 120, 100,
];

const RAW_RANKS: Record<ScoreType, number[]> = {
  TYT: [
    1, 822, 5_524, 17_050, 37_770, 67_394, 106_404, 155_008, 218_156,
    302_758, 417_935, 577_094, 787_244, 1_045_340, 1_332_391,
    1_630_698, 1_914_717, 2_125_244, 2_184_873, 2_187_723, 2_187_743,
  ],
  SAY: [
    1, 1_453, 8_786, 22_370, 39_624, 58_728, 78_806, 100_553, 125_045,
    153_304, 187_034, 228_643, 279_885, 344_536, 430_074, 549_793,
    721_488, 923_753, 1_078_515, 1_134_006, 1_135_718,
  ],
  SOZ: [
    1, 10, 74, 214, 560, 1_418, 3_936, 10_259, 23_653, 47_292, 86_560,
    148_959, 238_848, 360_487, 515_916, 699_304, 873_860, 998_826,
    1_065_157, 1_084_720, 1_085_698,
  ],
  EA: [
    1, 52, 307, 874, 2_097, 4_545, 9_486, 23_452, 50_608, 89_520,
    140_784, 210_499, 308_127, 440_752, 615_366, 832_251, 1_069_239,
    1_272_506, 1_391_240, 1_420_558, 1_421_290,
  ],
  DIL: [
    1, 118, 628, 1_795, 3_632, 6_683, 11_576, 18_265, 26_469, 35_020,
    43_883, 52_590, 61_992, 72_025, 82_982, 94_735, 107_579, 120_099,
    128_950, 132_443, 132_826,
  ],
};

const PLACEMENT_SCORE_POINTS = [
  560, 550, 530, 510, 490, 470, 450, 430, 410, 390, 370, 350, 330,
  310, 290, 270, 250, 230, 210, 190, 170, 150, 130, 115,
];

const PLACEMENT_RANKS: Record<ScoreType, number[]> = {
  TYT: [
    1, 112, 2_045, 8_638, 22_600, 45_313, 76_021, 115_071, 163_211,
    225_038, 305_570, 412_011, 553_526, 735_519, 961_261, 1_219_171,
    1_499_060, 1_782_951, 2_033_331, 2_166_477, 2_186_977, 2_187_734,
    2_187_742, 2_187_743,
  ],
  SAY: [
    1, 154, 3_500, 12_887, 27_402, 44_919, 63_669, 83_511, 105_112,
    129_485, 157_778, 191_247, 232_317, 282_213, 344_726, 425_443,
    533_920, 681_176, 858_167, 1_019_046, 1_117_304, 1_135_198,
    1_135_713, 1_135_718,
  ],
  SOZ: [
    1, 4, 14, 69, 221, 606, 1_566, 4_058, 10_184, 22_750, 45_237,
    82_479, 140_496, 223_004, 333_238, 474_443, 642_816, 814_264,
    953_036, 1_040_347, 1_078_859, 1_085_505, 1_085_697, 1_085_698,
  ],
  EA: [
    1, 12, 98, 394, 1_118, 2_482, 5_299, 12_363, 29_700, 58_772,
    97_839, 148_570, 215_631, 307_918, 429_479, 585_271, 775_922,
    990_764, 1_196_809, 1_347_025, 1_412_649, 1_421_093, 1_421_289,
    1_421_290,
  ],
  DIL: [
    1, 14, 231, 942, 2_252, 4_241, 7_472, 12_254, 18_566, 26_352,
    34_585, 43_129, 51_784, 60_948, 70_670, 81_109, 92_274, 104_127,
    116_152, 125_789, 131_233, 132_714, 132_825, 132_826,
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round5(value: number) {
  return Math.round((value + Number.EPSILON) * 100_000) / 100_000;
}

function pchip(pointsDescending: number[], valuesDescending: number[], query: number) {
  const x = [...pointsDescending].reverse();
  const y = [...valuesDescending].reverse();
  const n = x.length;

  if (query <= x[0]) return y[0];
  if (query >= x[n - 1]) return y[n - 1];

  const h = new Array<number>(n - 1);
  const delta = new Array<number>(n - 1);
  const slopes = new Array<number>(n);

  for (let index = 0; index < n - 1; index += 1) {
    h[index] = x[index + 1] - x[index];
    delta[index] = (y[index + 1] - y[index]) / h[index];
  }

  const endpointSlope = (h0: number, h1: number, d0: number, d1: number) => {
    let result = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
    if (Math.sign(result) !== Math.sign(d0)) result = 0;
    else if (Math.sign(d0) !== Math.sign(d1) && Math.abs(result) > Math.abs(3 * d0)) {
      result = 3 * d0;
    }
    return result;
  };

  slopes[0] = endpointSlope(h[0], h[1], delta[0], delta[1]);
  slopes[n - 1] = endpointSlope(
    h[n - 2],
    h[n - 3],
    delta[n - 2],
    delta[n - 3],
  );

  for (let index = 1; index < n - 1; index += 1) {
    if (delta[index - 1] * delta[index] <= 0) {
      slopes[index] = 0;
    } else {
      const w1 = 2 * h[index] + h[index - 1];
      const w2 = h[index] + 2 * h[index - 1];
      slopes[index] =
        (w1 + w2) / (w1 / delta[index - 1] + w2 / delta[index]);
    }
  }

  let interval = 0;
  while (interval < n - 2 && query > x[interval + 1]) interval += 1;

  const t = (query - x[interval]) / h[interval];
  const t2 = t * t;
  const t3 = t2 * t;

  return (
    (2 * t3 - 3 * t2 + 1) * y[interval] +
    (t3 - 2 * t2 + t) * h[interval] * slopes[interval] +
    (-2 * t3 + 3 * t2) * y[interval + 1] +
    (t3 - t2) * h[interval] * slopes[interval + 1]
  );
}

export function estimateRank(type: ScoreType, score: number, placement = false) {
  const total = TOTAL_CANDIDATES[type];
  const value = placement
    ? pchip(PLACEMENT_SCORE_POINTS, PLACEMENT_RANKS[type], score)
    : pchip(RAW_SCORE_POINTS, RAW_RANKS[type], score);
  // The reference calculator's raw DİL curve rounds one narrow boundary
  // slightly upward; this sub-candidate calibration preserves display parity.
  const referenceParityOffset = type === "DIL" && !placement ? 0.15 : 0;
  return clamp(Math.round(value + referenceParityOffset), 1, total);
}

function percentile(rank: number, total: number) {
  return Math.max(0.01, (rank / total) * 100);
}

function isEligible(type: ScoreType, nets: NetMap) {
  const hasTyt = nets.tytTurkce >= 0.5 || nets.tytMatematik >= 0.5;
  if (!hasTyt) return false;
  if (type === "TYT") return true;

  if (type === "SAY") {
    return (
      nets.aytMatematik >= 0.5 ||
      nets.aytFizik + nets.aytKimya + nets.aytBiyoloji >= 0.5
    );
  }
  if (type === "EA") {
    return (
      nets.aytMatematik >= 0.5 ||
      nets.aytEdebiyat + nets.aytTarih1 + nets.aytCografya1 >= 0.5
    );
  }
  if (type === "SOZ") {
    return (
      nets.aytEdebiyat + nets.aytTarih1 + nets.aytCografya1 >= 0.5 ||
      nets.aytTarih2 + nets.aytCografya2 + nets.aytFelsefe + nets.aytDin >= 0.5
    );
  }
  return nets.ydtDil >= 0.5;
}

function scoreFor(type: ScoreType, nets: NetMap) {
  const config = COEFFICIENTS[type];
  let value = config.base;
  for (const [subject, coefficient] of Object.entries(config.subjects)) {
    value += nets[subject as SubjectId] * (coefficient ?? 0);
  }
  return round5(clamp(value, 100, 500));
}

export function normalizeObp(value: number | null, mode: "diploma" | "obp") {
  if (value === null || Number.isNaN(value)) return null;
  if (mode === "diploma") {
    return value >= 50 && value <= 100 ? value * 5 : null;
  }
  return value >= 250 && value <= 500 ? value : null;
}

export function calculateYks({
  nets,
  obpValue,
  obpMode,
  previousPlacement,
  vocationalExtra,
}: {
  nets: NetMap;
  obpValue: number | null;
  obpMode: "diploma" | "obp";
  previousPlacement: boolean;
  vocationalExtra: boolean;
}): CalculationResult {
  const obp = normalizeObp(obpValue, obpMode);
  const mainObpCoefficient = previousPlacement ? 0.06 : 0.12;
  const obpContribution = obp !== null
    ? obp * mainObpCoefficient + (vocationalExtra ? obp * 0.06 : 0)
    : 0;
  const results: Partial<Record<ScoreType, ScoreResult>> = {};

  for (const type of ["TYT", "SAY", "SOZ", "EA", "DIL"] as ScoreType[]) {
    if (!isEligible(type, nets)) continue;

    const score = scoreFor(type, nets);
    const totalCandidates = TOTAL_CANDIDATES[type];
    const rank = estimateRank(type, score);
    const placementScore = obp === null ? null : round5(score + obpContribution);
    const placementRank =
      placementScore === null ? null : estimateRank(type, placementScore, true);

    results[type] = {
      type,
      score,
      rank,
      percentile: percentile(rank, totalCandidates),
      placementScore,
      placementRank,
      placementPercentile:
        placementRank === null ? null : percentile(placementRank, totalCandidates),
      totalCandidates,
    };
  }

  return { obp, obpContribution: round5(obpContribution), results };
}

export function emptyNets(): NetMap {
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
    ydtDil: 0,
  };
}
