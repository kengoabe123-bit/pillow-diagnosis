import { services, Service } from './services';

export interface Question {
    id: number;
    text: string;
    subtext?: string;
    icon: string;
    options: Option[];
}

export interface Option {
    label: string;
    icon: string;
    scores: Record<string, number>;
}

export interface DiagnosisResult {
    service: Service;
    score: number;
    matchRate: number;
    reason: string;
}

interface ConditionalReason {
    condition: (answers: number[]) => boolean;
    text: string;
}

// === 診断質問（7問）===

export const questions: Question[] = [
    {
        id: 1,
        text: 'いつもどんな姿勢で寝ていますか？',
        subtext: '一番多い寝姿勢を教えてください',
        icon: '🛏️',
        options: [
            {
                label: '仰向け',
                icon: '🙆',
                scores: { 'brain-sleep': 5, hitsuji: 4, nishikawa: 5, tempur: 3, motton: 5, 'oyasumi-shop': 3 },
            },
            {
                label: '横向き',
                icon: '🤲',
                scores: { 'brain-sleep': 3, hitsuji: 3, nishikawa: 4, tempur: 5, motton: 4, 'oyasumi-shop': 4 },
            },
            {
                label: 'うつ伏せ',
                icon: '🙇',
                scores: { 'brain-sleep': 4, hitsuji: 5, nishikawa: 2, tempur: 2, motton: 3, 'oyasumi-shop': 4 },
            },
            {
                label: '寝返りが多い',
                icon: '🔄',
                scores: { 'brain-sleep': 5, hitsuji: 4, nishikawa: 3, tempur: 2, motton: 4, 'oyasumi-shop': 3 },
            },
        ],
    },
    {
        id: 2,
        text: '首・肩の悩みはありますか？',
        subtext: '最も当てはまるものを選んでください',
        icon: '💪',
        options: [
            {
                label: '首こりがひどい',
                icon: '😣',
                scores: { 'brain-sleep': 3, hitsuji: 2, nishikawa: 5, tempur: 4, motton: 5, 'oyasumi-shop': 3 },
            },
            {
                label: '肩こりがひどい',
                icon: '😩',
                scores: { 'brain-sleep': 3, hitsuji: 2, nishikawa: 5, tempur: 4, motton: 4, 'oyasumi-shop': 3 },
            },
            {
                label: 'ストレートネック気味',
                icon: '📱',
                scores: { 'brain-sleep': 2, hitsuji: 1, nishikawa: 4, tempur: 3, motton: 5, 'oyasumi-shop': 3 },
            },
            {
                label: '特に悩みはない',
                icon: '😊',
                scores: { 'brain-sleep': 5, hitsuji: 5, nishikawa: 3, tempur: 3, motton: 3, 'oyasumi-shop': 4 },
            },
        ],
    },
    {
        id: 3,
        text: '寝ている時の暑さ・蒸れは気になりますか？',
        subtext: '',
        icon: '🌡️',
        options: [
            {
                label: 'とても気になる',
                icon: '🥵',
                scores: { 'brain-sleep': 5, hitsuji: 5, nishikawa: 3, tempur: 1, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: '少し気になる',
                icon: '😅',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 4, tempur: 2, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: 'あまり気にならない',
                icon: '😌',
                scores: { 'brain-sleep': 3, hitsuji: 3, nishikawa: 4, tempur: 5, motton: 4, 'oyasumi-shop': 3 },
            },
            {
                label: '冷え性で寒いくらい',
                icon: '🥶',
                scores: { 'brain-sleep': 2, hitsuji: 2, nishikawa: 3, tempur: 5, motton: 4, 'oyasumi-shop': 3 },
            },
        ],
    },
    {
        id: 4,
        text: '枕の硬さはどれくらいが好み？',
        subtext: '',
        icon: '🤔',
        options: [
            {
                label: '柔らかめが好き',
                icon: '☁️',
                scores: { 'brain-sleep': 2, hitsuji: 3, nishikawa: 2, tempur: 5, motton: 2, 'oyasumi-shop': 4 },
            },
            {
                label: '普通がいい',
                icon: '⚖️',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 4, tempur: 3, motton: 4, 'oyasumi-shop': 3 },
            },
            {
                label: '硬めが好き',
                icon: '🪨',
                scores: { 'brain-sleep': 4, hitsuji: 3, nishikawa: 5, tempur: 1, motton: 5, 'oyasumi-shop': 3 },
            },
            {
                label: 'こだわりはない',
                icon: '🤷',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 3, tempur: 3, motton: 3, 'oyasumi-shop': 5 },
            },
        ],
    },
    {
        id: 5,
        text: '枕の高さはどれくらいが理想？',
        subtext: '',
        icon: '📏',
        options: [
            {
                label: '低めがいい',
                icon: '⬇️',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 3, tempur: 3, motton: 4, 'oyasumi-shop': 4 },
            },
            {
                label: '普通がいい',
                icon: '➡️',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 4, tempur: 4, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: '高めがいい',
                icon: '⬆️',
                scores: { 'brain-sleep': 3, hitsuji: 3, nishikawa: 4, tempur: 4, motton: 4, 'oyasumi-shop': 3 },
            },
            {
                label: '自分で細かく調整したい',
                icon: '🔧',
                scores: { 'brain-sleep': 2, hitsuji: 1, nishikawa: 4, tempur: 2, motton: 5, 'oyasumi-shop': 3 },
            },
        ],
    },
    {
        id: 6,
        text: '枕にかけられる予算は？',
        subtext: '',
        icon: '💰',
        options: [
            {
                label: '〜1万円くらい',
                icon: '💴',
                scores: { 'brain-sleep': 1, hitsuji: 3, nishikawa: 1, tempur: 2, motton: 5, 'oyasumi-shop': 5 },
            },
            {
                label: '1〜2万円くらい',
                icon: '💵',
                scores: { 'brain-sleep': 2, hitsuji: 5, nishikawa: 3, tempur: 4, motton: 4, 'oyasumi-shop': 4 },
            },
            {
                label: '2〜3万円くらい',
                icon: '💶',
                scores: { 'brain-sleep': 4, hitsuji: 4, nishikawa: 5, tempur: 5, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: '3万円以上でもOK',
                icon: '💎',
                scores: { 'brain-sleep': 5, hitsuji: 4, nishikawa: 5, tempur: 5, motton: 2, 'oyasumi-shop': 2 },
            },
        ],
    },
    {
        id: 7,
        text: '枕選びで最も重視するポイントは？',
        subtext: 'これだけは譲れない！というものを選んでください',
        icon: '⭐',
        options: [
            {
                label: '睡眠の質を上げたい',
                icon: '😴',
                scores: { 'brain-sleep': 5, hitsuji: 3, nishikawa: 4, tempur: 4, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: '肩こり・首こりを改善したい',
                icon: '🏥',
                scores: { 'brain-sleep': 3, hitsuji: 2, nishikawa: 5, tempur: 4, motton: 5, 'oyasumi-shop': 3 },
            },
            {
                label: '通気性・清潔さ重視',
                icon: '🌬️',
                scores: { 'brain-sleep': 5, hitsuji: 5, nishikawa: 3, tempur: 1, motton: 3, 'oyasumi-shop': 3 },
            },
            {
                label: 'コスパ重視',
                icon: '🏷️',
                scores: { 'brain-sleep': 1, hitsuji: 3, nishikawa: 2, tempur: 3, motton: 5, 'oyasumi-shop': 5 },
            },
        ],
    },
];

// === 条件付きマッチ理由 ===

const conditionalReasons: Record<string, ConditionalReason[]> = {
    'brain-sleep': [
        {
            condition: (a) => a[2] === 0,
            text: '暑さ・蒸れが気になるあなたに最適。ブレインスリープは90%以上がエアーで構成された超通気性素材で、頭の深部体温を下げて最速で深い眠りへ導きます。',
        },
        {
            condition: (a) => a[6] === 0,
            text: '睡眠の質を最重視するあなたにぴったり。スタンフォード大学の睡眠研究から生まれた独自の3層構造が、科学的に入眠を速め、深い睡眠をサポートします。',
        },
        {
            condition: (a) => a[0] === 3,
            text: '寝返りが多いあなたに。ブレインスリープの3層構造は寝返りにもしなやかにフィットし、どの体勢でも頭をしっかりサポートします。',
        },
        {
            condition: () => true,
            text: 'スタンフォード大学の睡眠研究に基づく次世代枕。独自の超通気性素材が、入眠時の深部体温を下げて最速で深い眠りへ導きます。',
        },
    ],
    hitsuji: [
        {
            condition: (a) => a[2] === 0,
            text: '暑さ・蒸れが最も気になるあなたに。ヒツジのいらない枕は活性炭配合の3D構造で、抜群の通気性と消臭効果を実現。汗をかいても快適に眠れます。',
        },
        {
            condition: (a) => a[6] === 2,
            text: '清潔さを重視するあなたにぴったり。活性炭の消臭効果と丸洗いOKの素材で、いつでも清潔な状態を保てます。',
        },
        {
            condition: (a) => a[0] === 2,
            text: 'うつ伏せ寝のあなたに相性抜群。3Dポリマー構造が頭を点で支えるので、うつ伏せでも圧迫感が少なく快適です。',
        },
        {
            condition: () => true,
            text: '活性炭×3D構造の革新的な枕。通気性と消臭効果に優れ、水洗い可能で清潔。独特のハマる寝心地が新感覚です。',
        },
    ],
    nishikawa: [
        {
            condition: (a) => a[1] === 0 || a[1] === 1,
            text: '首こり・肩こりに悩むあなたに。西川エアー4Dの特殊構造が頭・首・肩を点で支え、負担を分散。大谷翔平選手も愛用する実力派です。',
        },
        {
            condition: (a) => a[6] === 1,
            text: '肩こり改善を最優先するあなたにぴったり。450年の歴史を持つ西川の独自4D構造が、首と肩への圧力を的確に分散してくれます。',
        },
        {
            condition: (a) => a[4] === 3,
            text: '高さをカスタマイズしたいあなたに。西川エアー4Dは高さ調整シート付きで、自分にぴったりの高さを見つけられます。',
        },
        {
            condition: () => true,
            text: '450年の歴史ある東京西川のエアーブランド。4D構造が頭と首をピンポイントで支え、自然な寝姿勢をサポートします。',
        },
    ],
    tempur: [
        {
            condition: (a) => a[0] === 1,
            text: '横向き寝のあなたに最適。テンピュールの低反発素材が体温と体圧に反応して完璧にフィットし、横向きでも肩や首への負担を最小限にします。',
        },
        {
            condition: (a) => a[3] === 0,
            text: '柔らかい枕が好きなあなたにぴったり。テンピュールのNASA由来の低反発素材が、包み込むような至福の寝心地を提供します。',
        },
        {
            condition: (a) => a[2] === 3,
            text: '冷え性のあなたに。テンピュールは体温に反応して形が変わる素材で、適度な保温性があり、冬でも心地よく眠れます。',
        },
        {
            condition: () => true,
            text: 'NASA由来の低反発素材のパイオニア。世界98カ国、1億個以上の販売実績が証明する、唯一無二のフィット感をお試しください。',
        },
    ],
    motton: [
        {
            condition: (a) => a[1] === 2,
            text: 'ストレートネック対策ならモットン枕。50通りの高さ調整で自然な首のカーブを維持し、スマホ首によるお悩みの改善をサポートします。90日間返金保証付き。',
        },
        {
            condition: (a) => a[4] === 3,
            text: '高さを自分で調整したいあなたに最適。モットン枕は6枚の調整シートで50通りの高さに対応。あなたにぴったりの高さが必ず見つかります。',
        },
        {
            condition: (a) => a[6] === 3,
            text: 'コスパを重視するあなたにぴったり。1万円台で50通りの高さ調整＋90日間返金保証。リスクゼロで最高の枕が手に入ります。',
        },
        {
            condition: () => true,
            text: '50通りの高さ調整×高反発素材×90日間返金保証。自分に合う枕に出会えなかった方にこそ試してほしい、日本人の体型に合わせた枕です。',
        },
    ],
    'oyasumi-shop': [
        {
            condition: (a) => a[3] === 3,
            text: '好みのこだわりが定まっていないあなたにぴったり。枕専門店なら素材・高さ・硬さ別に豊富なラインナップから、実際に比較しながらベストな一品を見つけられます。',
        },
        {
            condition: (a) => a[5] === 0,
            text: '予算を抑えたいあなたに。枕専門店なら1,000円台から高級枕まで幅広い価格帯の枕が揃っており、予算に合わせてぴったりの枕を選べます。',
        },
        {
            condition: (a) => a[6] === 3,
            text: 'コスパを重視するあなたに最適。専門店だからこそ、同じ価格帯でもこだわりの品質の枕が揃っています。用途別に探せるので無駄なく選べます。',
        },
        {
            condition: () => true,
            text: '枕に特化した専門店だからこその豊富な品揃え。素材・高さ・硬さ・用途別にあなたに合う枕を探せます。抱き枕や足枕など特殊な枕もラインナップ。',
        },
    ],
};

// === スコアリングロジック ===

function selectReason(serviceId: string, answers: number[], fallbackReason: string): string {
    const reasons = conditionalReasons[serviceId];
    if (reasons) {
        for (const r of reasons) {
            if (r.condition(answers)) return r.text;
        }
    }
    return fallbackReason;
}

export function calculateResults(answers: number[]): DiagnosisResult[] {
    const scoreMap: Record<string, number> = {};
    services.forEach((s) => {
        scoreMap[s.id] = 0;
    });

    answers.forEach((optionIndex, questionIndex) => {
        const question = questions[questionIndex];
        if (question && question.options[optionIndex]) {
            const option = question.options[optionIndex];
            Object.entries(option.scores).forEach(([serviceId, score]) => {
                if (scoreMap[serviceId] !== undefined) {
                    scoreMap[serviceId] += score;
                }
            });
        }
    });

    const results: DiagnosisResult[] = services
        .map((service) => {
            const score = scoreMap[service.id] || 0;
            const reason = selectReason(service.id, answers, service.tagline);
            return { service, score, matchRate: 0, reason };
        })
        .sort((a, b) => b.score - a.score);

    const top3 = results.slice(0, 3);
    const topScore = top3[0]?.score || 1;

    return top3.map((r, i) => {
        const scoreRatio = topScore > 0 ? r.score / topScore : 0.5;
        let displayRate: number;
        if (i === 0) displayRate = 73 + Math.round(scoreRatio * 12);
        else if (i === 1) displayRate = 67 + Math.round(scoreRatio * 11);
        else displayRate = 60 + Math.round(scoreRatio * 12);
        return { ...r, matchRate: displayRate };
    });
}
