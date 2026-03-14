'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { questions, calculateResults, DiagnosisResult } from '@/lib/diagnosis';
import { SITE_CONFIG } from '@/lib/config';

type Phase = 'intro' | 'questions' | 'results';

export default function DiagnosisPage() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [results, setResults] = useState<DiagnosisResult[]>([]);
    const [animationClass, setAnimationClass] = useState('animate-slide-in');
    const [showConfetti, setShowConfetti] = useState(false);
    const [displayRates, setDisplayRates] = useState<number[]>([0, 0, 0]);
    const [copiedToast, setCopiedToast] = useState(false);
    const animatingRef = useRef(false);

    // マッチ率カウントアップアニメーション
    useEffect(() => {
        if (phase !== 'results' || results.length === 0) return;

        const targetRates = results.map((r) => r.matchRate);
        const duration = 1500;
        const startTime = performance.now();

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);

            setDisplayRates(targetRates.map((target) => Math.round(eased * target)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const timer = setTimeout(() => {
            requestAnimationFrame(animate);
        }, 800);

        return () => clearTimeout(timer);
    }, [phase, results]);

    // Confetti表示
    useEffect(() => {
        if (phase === 'results') {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleStart = useCallback(() => {
        setPhase('questions');
        setCurrentQuestion(0);
        setAnswers([]);
        setAnimationClass('animate-slide-in');
    }, []);

    const handleAnswer = useCallback(
        (optionIndex: number) => {
            if (animatingRef.current) return;
            animatingRef.current = true;

            const newAnswers = [...answers, optionIndex];
            setAnswers(newAnswers);

            if (currentQuestion < questions.length - 1) {
                setAnimationClass('animate-slide-out');
                setTimeout(() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setAnimationClass('animate-slide-in');
                    animatingRef.current = false;
                }, 300);
            } else {
                const diagnosisResults = calculateResults(newAnswers);
                setResults(diagnosisResults);
                setDisplayRates([0, 0, 0]);
                setPhase('results');
                animatingRef.current = false;
            }
        },
        [answers, currentQuestion]
    );

    const handleBack = useCallback(() => {
        if (currentQuestion > 0 && !animatingRef.current) {
            animatingRef.current = true;
            setAnimationClass('animate-slide-out');
            setTimeout(() => {
                setCurrentQuestion((prev) => prev - 1);
                setAnswers((prev) => prev.slice(0, -1));
                setAnimationClass('animate-slide-in');
                animatingRef.current = false;
            }, 300);
        }
    }, [currentQuestion]);

    const handleRestart = useCallback(() => {
        setPhase('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setResults([]);
        setDisplayRates([0, 0, 0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleShare = useCallback(
        (platform: 'x' | 'line' | 'copy') => {
            if (results.length === 0) return;

            const topResult = results[0];
            const shareText = `あなたにピッタリの枕は【${topResult.service.name}】（おすすめ度${topResult.matchRate}%）でした！\n\n🛏️ 無料枕診断はこちら 👇\n${SITE_CONFIG.url}/diagnosis\n\n#枕診断 #睡眠改善 #PillowMatch`;

            if (platform === 'x') {
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
                    '_blank'
                );
            } else if (platform === 'line') {
                window.open(
                    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_CONFIG.url + '/diagnosis')}&text=${encodeURIComponent(shareText)}`,
                    '_blank'
                );
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    setCopiedToast(true);
                    setTimeout(() => setCopiedToast(false), 2000);
                });
            }
        },
        [results]
    );

    // === INTRO PHASE ===
    if (phase === 'intro') {
        return (
            <section className="intro-section">
                <div className="intro-content">
                    <div className="intro-icon">🛏️</div>
                    <h1>
                        あなたにピッタリの
                        <br />
                        <span className="gradient-text">枕の無料診断</span>
                    </h1>
                    <p>
                        7つの質問に答えるだけで、睡眠タイプに合った最適な枕がわかります。
                    </p>

                    <div className="intro-features glass-card">
                        <div className="intro-feature">
                            <div className="intro-feature-icon">⏱️</div>
                            <div className="intro-feature-text">たった30秒</div>
                        </div>
                        <div className="intro-feature">
                            <div className="intro-feature-icon">🎯</div>
                            <div className="intro-feature-text">パーソナライズ</div>
                        </div>
                        <div className="intro-feature">
                            <div className="intro-feature-icon">💯</div>
                            <div className="intro-feature-text">完全無料</div>
                        </div>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={handleStart}
                        id="start-diagnosis"
                    >
                        🛏️ 診断をはじめる
                    </button>
                </div>
            </section>
        );
    }

    // === QUESTIONS PHASE ===
    if (phase === 'questions') {
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <section className="question-section">
                <div className="progress-container">
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="progress-text">
                        {currentQuestion + 1} / {questions.length}
                    </div>
                </div>

                <div className={`question-card glass-card ${animationClass}`} key={`q-${currentQuestion}`}>
                    <div className="question-header">
                        <div className="question-icon">{question.icon}</div>
                        <div className="question-text">{question.text}</div>
                        {question.subtext && (
                            <div className="question-subtext">{question.subtext}</div>
                        )}
                    </div>

                    <div className="options-list">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleAnswer(index)}
                                id={`option-${currentQuestion}-${index}`}
                            >
                                <span className="option-emoji">{option.icon}</span>
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>

                    {currentQuestion > 0 && (
                        <button className="back-btn" onClick={handleBack}>
                            ← 前の質問に戻る
                        </button>
                    )}
                </div>
            </section>
        );
    }

    // === RESULTS PHASE ===
    return (
        <>
            {showConfetti && (
                <div className="confetti-container">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti-piece"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#f59e0b', '#10b981'][
                                    Math.floor(Math.random() * 6)
                                ],
                                animationDuration: `${2 + Math.random() * 3}s`,
                                animationDelay: `${Math.random() * 2}s`,
                                width: `${6 + Math.random() * 8}px`,
                                height: `${6 + Math.random() * 8}px`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                            }}
                        />
                    ))}
                </div>
            )}

            <section className="results-section">
                <div className="results-header">
                    <h2>
                        あなたにおすすめの
                        <span className="gradient-text">枕 TOP3</span>
                    </h2>
                    <p className="results-subtitle">
                        回答を分析し、あなたに最適な枕を選びました
                    </p>
                </div>

                <div className="results-list">
                    {results.map((result, index) => (
                        <div
                            key={result.service.id}
                            className="result-card glass-card"
                            style={
                                { '--card-color': result.service.color } as React.CSSProperties
                            }
                        >
                            <div className="result-card-header">
                                <div className="result-match-rate">
                                    <div className="match-label">おすすめ度</div>
                                    <div
                                        className="match-number gradient-text"
                                    >
                                        {displayRates[index]}
                                        <span className="percent">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="result-card-body">
                                <h3 className="result-name">{result.service.name}</h3>
                                <p className="result-tagline">{result.service.tagline}</p>

                                <div className="age-tags">
                                    {result.service.targetAge.map((age) => (
                                        <span key={age} className="age-tag">
                                            {age}
                                        </span>
                                    ))}
                                </div>

                                <div className="reason-box">
                                    <div className="reason-label">
                                        📋 あなたの回答に基づくおすすめ理由
                                    </div>
                                    <div className="reason-text">{result.reason}</div>
                                </div>

                                <div className="result-features">
                                    <h4>✨ 特徴</h4>
                                    <ul className="feature-list">
                                        {result.service.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="result-pros-cons">
                                    <div>
                                        <h4>メリット</h4>
                                        <ul className="pros-list">
                                            {result.service.pros.slice(0, 3).map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4>デメリット</h4>
                                        <ul className="cons-list">
                                            {result.service.cons.slice(0, 2).map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <a
                                    href={result.service.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-cta"
                                    style={{ background: result.service.color }}
                                    id={`cta-${result.service.id}`}
                                >
                                    {result.service.ctaText} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Share Section */}
                <div className="share-section glass-card">
                    <h3>🔗 診断結果をシェアする</h3>
                    <div className="share-buttons">
                        <button
                            className="share-btn x"
                            onClick={() => handleShare('x')}
                            id="share-x"
                        >
                            𝕏 でシェア
                        </button>
                        <button
                            className="share-btn line"
                            onClick={() => handleShare('line')}
                            id="share-line"
                        >
                            LINEで送る
                        </button>
                        <button
                            className="share-btn copy"
                            onClick={() => handleShare('copy')}
                            id="share-copy"
                        >
                            📋 コピー
                        </button>
                    </div>
                </div>

                {/* Retry */}
                <div className="retry-section">
                    <button
                        className="btn-secondary"
                        onClick={handleRestart}
                        id="retry-diagnosis"
                    >
                        🔄 もう一度診断する
                    </button>
                </div>
            </section>

            {/* Toast */}
            <div className={`copied-toast${copiedToast ? ' show' : ''}`}>
                ✅ コピーしました！
            </div>
        </>
    );
}
