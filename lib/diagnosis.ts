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
// IDs: rokkaku, kenmin, curere, survaq, gokumin, mymakura, yokone3b, recovery-sleep, oyasumi-shop

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
                scores: { rokkaku: 4, kenmin: 5, curere: 5, survaq: 4, gokumin: 4, mymakura: 4, yokone3b: 1, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '横向き',
                icon: '🤲',
                scores: { rokkaku: 3, kenmin: 4, curere: 3, survaq: 3, gokumin: 3, mymakura: 4, yokone3b: 5, 'recovery-sleep': 3, 'oyasumi-shop': 3 },
            },
            {
                label: 'うつ伏せ',
                icon: '🙇',
                scores: { rokkaku: 3, kenmin: 3, curere: 2, survaq: 2, gokumin: 4, mymakura: 3, yokone3b: 2, 'recovery-sleep': 2, 'oyasumi-shop': 4 },
            },
            {
                label: '寝返りが多い',
                icon: '🔄',
                scores: { rokkaku: 5, kenmin: 5, curere: 3, survaq: 3, gokumin: 4, mymakura: 4, yokone3b: 2, 'recovery-sleep': 3, 'oyasumi-shop': 3 },
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
                scores: { rokkaku: 3, kenmin: 3, curere: 5, survaq: 5, gokumin: 2, mymakura: 4, yokone3b: 2, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '肩こりがひどい',
                icon: '😩',
                scores: { rokkaku: 4, kenmin: 3, curere: 5, survaq: 5, gokumin: 2, mymakura: 4, yokone3b: 3, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: 'ストレートネック気味',
                icon: '📱',
                scores: { rokkaku: 2, kenmin: 4, curere: 5, survaq: 3, gokumin: 2, mymakura: 5, yokone3b: 2, 'recovery-sleep': 2, 'oyasumi-shop': 3 },
            },
            {
                label: '特に悩みはない',
                icon: '😊',
                scores: { rokkaku: 4, kenmin: 4, curere: 2, survaq: 2, gokumin: 5, mymakura: 3, yokone3b: 4, 'recovery-sleep': 3, 'oyasumi-shop': 4 },
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
                scores: { rokkaku: 5, kenmin: 3, curere: 2, survaq: 1, gokumin: 3, mymakura: 3, yokone3b: 3, 'recovery-sleep': 1, 'oyasumi-shop': 3 },
            },
            {
                label: '少し気になる',
                icon: '😅',
                scores: { rokkaku: 4, kenmin: 4, curere: 3, survaq: 2, gokumin: 4, mymakura: 3, yokone3b: 3, 'recovery-sleep': 2, 'oyasumi-shop': 3 },
            },
            {
                label: 'あまり気にならない',
                icon: '😌',
                scores: { rokkaku: 3, kenmin: 4, curere: 4, survaq: 4, gokumin: 4, mymakura: 4, yokone3b: 4, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '冷え性で寒いくらい',
                icon: '🥶',
                scores: { rokkaku: 1, kenmin: 3, curere: 3, survaq: 5, gokumin: 3, mymakura: 3, yokone3b: 3, 'recovery-sleep': 5, 'oyasumi-shop': 3 },
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
                scores: { rokkaku: 3, kenmin: 3, curere: 2, survaq: 4, gokumin: 3, mymakura: 4, yokone3b: 3, 'recovery-sleep': 4, 'oyasumi-shop': 4 },
            },
            {
                label: '普通がいい',
                icon: '⚖️',
                scores: { rokkaku: 4, kenmin: 5, curere: 3, survaq: 3, gokumin: 5, mymakura: 4, yokone3b: 4, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '硬めが好き',
                icon: '🪨',
                scores: { rokkaku: 3, kenmin: 3, curere: 5, survaq: 2, gokumin: 3, mymakura: 4, yokone3b: 3, 'recovery-sleep': 2, 'oyasumi-shop': 3 },
            },
            {
                label: 'こだわりはない',
                icon: '🤷',
                scores: { rokkaku: 3, kenmin: 3, curere: 3, survaq: 3, gokumin: 4, mymakura: 5, yokone3b: 3, 'recovery-sleep': 3, 'oyasumi-shop': 5 },
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
                scores: { rokkaku: 4, kenmin: 3, curere: 3, survaq: 3, gokumin: 4, mymakura: 4, yokone3b: 3, 'recovery-sleep': 3, 'oyasumi-shop': 3 },
            },
            {
                label: '普通がいい',
                icon: '➡️',
                scores: { rokkaku: 4, kenmin: 4, curere: 4, survaq: 4, gokumin: 4, mymakura: 3, yokone3b: 4, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '高めがいい',
                icon: '⬆️',
                scores: { rokkaku: 3, kenmin: 4, curere: 4, survaq: 3, gokumin: 3, mymakura: 4, yokone3b: 4, 'recovery-sleep': 3, 'oyasumi-shop': 3 },
            },
            {
                label: '自分で細かく調整したい',
                icon: '🔧',
                scores: { rokkaku: 2, kenmin: 3, curere: 2, survaq: 2, gokumin: 3, mymakura: 5, yokone3b: 2, 'recovery-sleep': 2, 'oyasumi-shop': 4 },
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
                scores: { rokkaku: 2, kenmin: 3, curere: 1, survaq: 2, gokumin: 5, mymakura: 1, yokone3b: 2, 'recovery-sleep': 2, 'oyasumi-shop': 5 },
            },
            {
                label: '1〜2万円くらい',
                icon: '💵',
                scores: { rokkaku: 5, kenmin: 5, curere: 2, survaq: 4, gokumin: 4, mymakura: 2, yokone3b: 5, 'recovery-sleep': 4, 'oyasumi-shop': 4 },
            },
            {
                label: '2〜3万円くらい',
                icon: '💶',
                scores: { rokkaku: 4, kenmin: 4, curere: 4, survaq: 4, gokumin: 3, mymakura: 4, yokone3b: 4, 'recovery-sleep': 4, 'oyasumi-shop': 3 },
            },
            {
                label: '3万円以上でもOK',
                icon: '💎',
                scores: { rokkaku: 3, kenmin: 3, curere: 5, survaq: 3, gokumin: 2, mymakura: 5, yokone3b: 3, 'recovery-sleep': 4, 'oyasumi-shop': 2 },
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
                scores: { rokkaku: 4, kenmin: 4, curere: 4, survaq: 3, gokumin: 3, mymakura: 4, yokone3b: 3, 'recovery-sleep': 5, 'oyasumi-shop': 3 },
            },
            {
                label: '肩こり・首こりを改善したい',
                icon: '🏥',
                scores: { rokkaku: 3, kenmin: 3, curere: 5, survaq: 5, gokumin: 2, mymakura: 4, yokone3b: 3, 'recovery-sleep': 3, 'oyasumi-shop': 3 },
            },
            {
                label: '通気性・清潔さ重視',
                icon: '🌬️',
                scores: { rokkaku: 5, kenmin: 3, curere: 2, survaq: 1, gokumin: 4, mymakura: 3, yokone3b: 3, 'recovery-sleep': 1, 'oyasumi-shop': 4 },
            },
            {
                label: 'コスパ重視',
                icon: '🏷️',
                scores: { rokkaku: 3, kenmin: 4, curere: 1, survaq: 3, gokumin: 5, mymakura: 1, yokone3b: 3, 'recovery-sleep': 3, 'oyasumi-shop': 5 },
            },
        ],
    },
];

// === 条件付きマッチ理由 ===

const conditionalReasons: Record<string, ConditionalReason[]> = {
    rokkaku: [
        { condition: (a) => a[2] === 0, text: '暑さ・蒸れが気になるあなたに最適。六角脳枕のヒンヤリ冷感素材が頭を快適にクールダウンし、寝苦しさを解消します。' },
        { condition: (a) => a[0] === 3, text: '寝返りが多いあなたに。六角脳枕の独自六角形カット構造は寝返りがスムーズにでき、途中で目覚めることなく朝までぐっすり。' },
        { condition: (a) => a[6] === 2, text: '通気性を重視するあなたにぴったり。冷感素材と独自構造で、頭をひんやり快適に保ちます。' },
        { condition: () => true, text: 'ナイツも絶賛の冷感安眠枕。独自の六角形構造とヒンヤリ素材で、頭を快適にクールダウンし、寝返りもスムーズです。' },
    ],
    kenmin: [
        { condition: (a) => a[0] === 3, text: '寝返りが多いあなたにぴったり。健眠枕は「寝返りのしやすさ」を追求した設計で、スムーズな寝返りをサポートします。' },
        { condition: (a) => a[0] === 0, text: '仰向け寝のあなたに。健眠枕は正しい寝姿勢を維持する設計で、自然な首のカーブをキープしながら快適な仰向け寝をサポートします。' },
        { condition: (a) => a[6] === 3, text: 'コスパも品質も譲れないあなたに。健眠枕はワンランク上の寝心地をお手頃価格で実現した実力派です。' },
        { condition: () => true, text: '「寝返りのしやすさ」と「正しい寝姿勢」を両立したワンランク上の枕。人間工学に基づく設計で毎晩の睡眠を格上げします。' },
    ],
    curere: [
        { condition: (a) => a[1] === 0 || a[1] === 1, text: '首こり・肩こりに悩むあなたに。Cure:Re THE MAKURAは整体師が開発した特許取得の整体枕。毎晩が整体のようなケアタイムになります。' },
        { condition: (a) => a[1] === 2, text: 'ストレートネック対策に。整体のプロが開発したCure:Re THE MAKURAが、首と頭を最適なポジションにサポートし、根本からケアします。' },
        { condition: (a) => a[6] === 1, text: '肩こり改善を最優先するあなたに。特許取得の整体構造が、整体に通うような効果を毎晩の睡眠で実現します。' },
        { condition: () => true, text: '整体師が開発した特許取得の整体枕。プロも認める本格構造で、首と頭を最適ポジションにサポートします。' },
    ],
    survaq: [
        { condition: (a) => a[2] === 3, text: '冷え性のあなたに最適。首と肩がホっとする枕PLUSは温熱機能で首と肩をじんわり温め、血行を促進してリラックスさせます。' },
        { condition: (a) => a[1] === 0 || a[1] === 1, text: '首こり・肩こりに悩むあなたに。温熱効果で筋肉のこわばりをほぐし、首と肩をリラックスさせながら快適な眠りへ導きます。' },
        { condition: (a) => a[6] === 1, text: '肩こり改善を重視するあなたに。温めて癒すコンセプトで、筋肉の緊張をほぐしながら快適な睡眠をサポートします。' },
        { condition: () => true, text: '温めて癒す、新しいコンセプトの枕。温熱機能が首と肩をじんわり温め、血行を促進してリラックスした睡眠へ導きます。' },
    ],
    gokumin: [
        { condition: (a) => a[5] === 0, text: '予算を抑えたいあなたに最適。GOKUMINは高品質なのにお手頃価格で、数々のアワードを受賞した実力派ブランドです。' },
        { condition: (a) => a[6] === 3, text: 'コスパを最重視するあなたにぴったり。受賞実績多数のGOKUMINなら、お手頃価格で品質に裏付けされた枕が手に入ります。' },
        { condition: (a) => a[1] === 3, text: '特に悩みがなく快適に寝たいあなたに。GOKUMINは万能型の実力派で、どんな寝姿勢にもバランスよくフィットします。' },
        { condition: () => true, text: '入賞実績多数の実力派ブランド。高品質なのにお手頃価格で、初めての「ちゃんとした枕」にも最適です。' },
    ],
    mymakura: [
        { condition: (a) => a[4] === 3, text: '高さを自分で調整したいあなたに最適。マイまくらなら、あなたの頭の形・首の高さを計測して完全オーダーメイドで作成。既製品では得られない究極のフィット感を実現します。' },
        { condition: (a) => a[1] === 2, text: 'ストレートネック対策に。オーダーメイドだからこそ、あなたの首のカーブに合わせた最適な枕が手に入ります。' },
        { condition: (a) => a[5] === 3, text: '予算をかけても最高の枕が欲しいあなたに。特許取得のオーダーメイド製法で、世界にひとつだけのあなた専用の枕を。' },
        { condition: () => true, text: '特許取得のオーダーメイド枕。あなたの頭の形・首の高さを計測して作る、世界にひとつだけの枕です。' },
    ],
    yokone3b: [
        { condition: (a) => a[0] === 1, text: '横向き寝のあなたに最適。YOKONE3Bは横向き寝専用設計で、顔のシワや肌荒れもサポート。いびき対策にも効果的です。' },
        { condition: (a) => a[6] === 2, text: '通気性と美容を意識するあなたに。YOKONE3Bは横向きで寝ても顔に跡がつきにくく、肌荒れ対策にもなります。' },
        { condition: () => true, text: '横向き寝に特化した専用設計枕。顔のシワや肌荒れをサポートし、いびき対策にも効果的。美容と睡眠を両立します。' },
    ],
    'recovery-sleep': [
        { condition: (a) => a[2] === 3, text: '冷え性のあなたに最適。Recovery Sleepの温熱効果が体を芯から温め、冷えによる寝つきの悪さを改善します。' },
        { condition: (a) => a[6] === 0, text: '睡眠の質を上げたいあなたに。遠赤外線効果で寝ている間に体をリカバリーし、翌朝のスッキリ感が違います。' },
        { condition: (a) => a[1] === 0 || a[1] === 1, text: '首こり・肩こりに悩むあなたに。温熱効果が血行を促進し、寝ている間に体をじんわりとケアします。' },
        { condition: () => true, text: '温熱効果のある特殊素材で睡眠をアップデート。遠赤外線が体を芯から温め、寝ている間の疲労回復をサポートします。' },
    ],
    'oyasumi-shop': [
        { condition: (a) => a[3] === 3, text: '好みのこだわりが定まっていないあなたにぴったり。枕専門店なら素材・高さ・硬さ別に豊富なラインナップから、実際に比較しながらベストな一品を見つけられます。' },
        { condition: (a) => a[5] === 0, text: '予算を抑えたいあなたに。枕専門店なら1,000円台から高級枕まで幅広い価格帯の枕が揃っており、予算に合わせてぴったりの枕を選べます。' },
        { condition: (a) => a[6] === 3, text: 'コスパを重視するあなたに最適。専門店だからこそ、同じ価格帯でもこだわりの品質の枕が揃っています。用途別に探せるので無駄なく選べます。' },
        { condition: () => true, text: '枕に特化した専門店だからこその豊富な品揃え。素材・高さ・硬さ・用途別にあなたに合う枕を探せます。抱き枕や足枕など特殊な枕もラインナップ。' },
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
