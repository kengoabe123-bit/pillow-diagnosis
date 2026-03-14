import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '枕診断 | PillowMatch - あなたに最適な枕を見つけよう',
    description:
        '7つの質問に答えるだけで、あなたの睡眠タイプに最適な枕がわかります。寝姿勢、首・肩の悩み、好みの硬さから総合的に分析。',
    openGraph: {
        title: '枕診断 | PillowMatch',
        description: '7つの質問であなたにピッタリの枕を診断。30秒で結果がわかります。',
        type: 'website',
        locale: 'ja_JP',
    },
};

export default function DiagnosisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
