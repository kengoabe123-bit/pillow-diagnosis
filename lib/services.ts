export interface Service {
    id: string;
    slug: string;
    name: string;
    nameEn: string;
    tagline: string;
    description: string;
    category: string;
    target: string;
    targetAge: string[];
    features: string[];
    pros: string[];
    cons: string[];
    recommended: string[];
    affiliateUrl: string;
    ctaText: string;
    color: string;
}

export const services: Service[] = [
    {
        id: 'brain-sleep',
        slug: 'brain-sleep-pillow',
        name: 'ブレインスリープ ピロー',
        nameEn: 'BRAIN SLEEP PILLOW',
        tagline: '脳が眠る枕。最速で深い眠りへ',
        description: 'スタンフォード大学の睡眠研究から生まれた次世代枕。独自の3層構造メッシュが、入眠時の深部体温を下げて最速で深い睡眠へ導く。90%以上がエアーで構成された超通気性素材。',
        category: '高機能テクノロジー枕',
        target: '睡眠の質を科学的に最大化したい人',
        targetAge: ['20代', '30代', '40代'],
        features: [
            '独自3層構造で頭にフィット',
            '超通気性素材で深部体温を下げる',
            '7日間で自分の頭にカスタムフィット',
            'シャワーで丸洗い可能',
        ],
        pros: [
            '入眠速度が劇的に改善すると評判',
            '通気性が抜群で夏でも快適',
            'フィット感が日々向上する',
            '衛生面で優れている（丸洗いOK）',
        ],
        cons: [
            '価格が3万円台と高め',
            '硬めの寝心地が合わない人も',
            '実店舗で試せる場所が限られる',
        ],
        recommended: [
            '寝つきが悪い・眠りが浅い人',
            '頭が暑くて寝苦しい人',
            '科学的に根拠のある枕が欲しい人',
            '清潔さにこだわりたい人',
        ],
        affiliateUrl: 'https://example.com/brain-sleep',
        ctaText: '公式サイトで詳しく見る',
        color: '#6366f1',
    },
    {
        id: 'hitsuji',
        slug: 'hitsuji-pillow',
        name: 'ヒツジのいらない枕',
        nameEn: 'HITSUJI NO IRANAI MAKURA',
        tagline: '活性炭×3D構造で極上の寝心地',
        description: 'TPE（熱可塑性エラストマー）素材と活性炭を組み合わせた革新的な枕。3Dポリマー構造で頭を点で支え、通気性と弾力性を両立。至福のハマり感が特徴。',
        category: '3Dポリマー枕',
        target: '通気性と弾力性を重視する人',
        targetAge: ['20代', '30代', '40代'],
        features: [
            '活性炭配合で消臭効果あり',
            '3D構造で圧力を分散',
            '水洗い可能で清潔',
            '独特のハマる寝心地',
        ],
        pros: [
            '通気性が非常に高い',
            '消臭効果で枕の臭いが気にならない',
            '弾力があるのに柔らかい独特の感触',
            '丸洗いできて衛生的',
        ],
        cons: [
            '独特の硬さが合わない人もいる',
            '高さ調整ができない',
            '素材の匂いが最初は気になることも',
        ],
        recommended: [
            '汗っかきで枕の蒸れが気になる人',
            '枕の臭いが気になる人',
            '新感覚の寝心地を試してみたい人',
            '清潔に保てる枕が欲しい人',
        ],
        affiliateUrl: 'https://example.com/hitsuji',
        ctaText: '公式サイトで詳しく見る',
        color: '#10b981',
    },
    {
        id: 'nishikawa',
        slug: 'nishikawa-air-4d',
        name: '西川 エアー4D ピロー',
        nameEn: 'NISHIKAWA AiR 4D PILLOW',
        tagline: '点で支えて首・肩の負担を軽減',
        description: '450年の歴史を持つ東京西川のエアーブランド。4D構造の特殊ウレタンが頭と首をピンポイントで支え、自然な寝姿勢をサポート。大谷翔平選手愛用モデルとしても有名。',
        category: 'エアー構造枕',
        target: '肩こり・首こりに本気で悩む人',
        targetAge: ['30代', '40代', '50代'],
        features: [
            '4D構造で頭・首・肩をサポート',
            '高さ調整シート付き',
            '大谷翔平選手愛用モデル',
            '特殊立体クロス構造で通気性確保',
        ],
        pros: [
            '首・肩への負担が明確に軽減される',
            '高さを自分好みに調整できる',
            '老舗ブランドの信頼性',
            'スポーツ選手にも支持される実力',
        ],
        cons: [
            '価格帯が2〜3万円とやや高い',
            '慣れるまで数日かかることも',
            'デザインが好みに合わない場合がある',
        ],
        recommended: [
            '慢性的な肩こり・首こりに悩む人',
            '枕の高さにこだわりたい人',
            '信頼できるブランドの枕が欲しい人',
            'スポーツをしていて体のケアに関心がある人',
        ],
        affiliateUrl: 'https://example.com/nishikawa',
        ctaText: '公式サイトで詳しく見る',
        color: '#0ea5e9',
    },
    {
        id: 'tempur',
        slug: 'tempur-original-neck',
        name: 'テンピュール オリジナルネックピロー',
        nameEn: 'TEMPUR ORIGINAL NECK PILLOW',
        tagline: 'NASAが認めた低反発素材のパイオニア',
        description: 'NASA由来の低反発素材「テンピュール®」を使った世界的ベストセラー枕。体温と体圧に反応して自分だけの形にフィットし、首と肩を的確にサポート。世界98カ国で愛用。',
        category: '低反発枕',
        target: 'フィット感を重視する人',
        targetAge: ['30代', '40代', '50代'],
        features: [
            'NASA由来の低反発テンピュール®素材',
            '体温と体圧で自分だけの形にフィット',
            '独自のエルゴノミクス設計',
            '世界98カ国で1億個以上の販売実績',
        ],
        pros: [
            '唯一無二のフィット感',
            '横向き寝に特に相性が良い',
            '耐久性が高く長持ち',
            '世界的な実績と信頼性',
        ],
        cons: [
            '蒸れやすいと感じる人もいる',
            '重量がやや重い',
            '洗濯不可（カバーのみ可）',
        ],
        recommended: [
            '横向きで寝ることが多い人',
            '包み込まれる寝心地が好きな人',
            '長く使える枕を探している人',
            '世界的に評価された枕が欲しい人',
        ],
        affiliateUrl: 'https://example.com/tempur',
        ctaText: '公式サイトで詳しく見る',
        color: '#f59e0b',
    },
    {
        id: 'motton',
        slug: 'motton-pillow',
        name: 'モットン枕',
        nameEn: 'MOTTON PILLOW',
        tagline: '自分で高さを調整、ストレートネック対策の決定版',
        description: '高さ調整シートが6枚付属し、50通りの高さに調整可能。自然な首のカーブを維持する高反発素材で、ストレートネックや首の痛みの改善をサポート。90日間の返金保証付き。',
        category: '高反発枕',
        target: 'ストレートネック・高さにこだわりたい人',
        targetAge: ['20代', '30代', '40代', '50代'],
        features: [
            '50通りの高さ調整が可能',
            '自然な首カーブをサポートする高反発素材',
            '90日間返金保証付き',
            '日本人の体型に合わせた設計',
        ],
        pros: [
            '他にない細かい高さ調整が可能',
            'ストレートネック対策として評価が高い',
            '返金保証があるので安心して試せる',
            'コスパが良い（1万円台）',
        ],
        cons: [
            '高反発の硬さが合わない人もいる',
            '調整に試行錯誤が必要',
            '知名度が他ブランドに比べ低い',
        ],
        recommended: [
            'ストレートネックに悩んでいる人',
            '枕の高さが合わないと感じている人',
            'リスクなく試したい人（返金保証あり）',
            'コスパ重視で良い枕を探している人',
        ],
        affiliateUrl: 'https://example.com/motton',
        ctaText: '90日間お試しで購入',
        color: '#ef4444',
    },
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}
