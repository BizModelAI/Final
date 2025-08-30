import React from "react";
import { businessPaths } from "../../../shared/businessPaths.js";

function getTopBusinessPaths(quizData) {
    // Placeholder: return first 3 business paths
    return businessPaths.slice(0, 3);
}

const socials = [
    { href: "https://www.tiktok.com/@bizmodelai", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg", alt: "TikTok" },
    { href: "https://www.instagram.com/bizmodelai/", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg", alt: "Instagram" },
    { href: "https://twitter.com/bizmodelai", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg", alt: "X (Twitter)" },
    { href: "https://www.pinterest.com/bizmodelai/", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg", alt: "Pinterest" },
];

function getPersonalizedSnapshot(quizData) {
    if (!quizData) return [
        '• Prefer flexibility with structure',
        '• Thrive on independent projects',
        '• Are motivated by financial freedom',
        '• Learn best by doing',
        '• Adapt quickly to new tools and systems',
        '• Value passion and personal meaning in your work',
    ];
    const lines = [];
    // 1. Work structure
    if (quizData.workStructurePreference === 'some-structure' || quizData.workStructurePreference === 'mix-both') {
        lines.push('• Prefer flexibility with structure');
    } else if (quizData.workStructurePreference === 'full-structure') {
        lines.push('• Prefer clear structure and routines');
    } else {
        lines.push('• Comfortable with flexible or unstructured work');
    }
    // 2. Collaboration
    if (quizData.workCollaborationPreference === 'mostly-solo' || quizData.workCollaborationPreference === 'solo-flexible') {
        lines.push('• Thrive on independent projects');
    } else if (quizData.workCollaborationPreference === 'team') {
        lines.push('• Enjoy collaborating with others');
    } else {
        lines.push('• Open to both solo and team work');
    }
    // 3. Motivation
    if (quizData.mainMotivation === 'financial-freedom' || quizData.primaryMotivation === 'financial-independence') {
        lines.push('• Are motivated by financial freedom');
    } else if (quizData.mainMotivation === 'passion' || quizData.passionIdentityAlignment >= 4) {
        lines.push('• Driven by passion and personal meaning');
    } else {
        lines.push('• Motivated by growth and new challenges');
    }
    // 4. Learning style
    if (quizData.learningPreference === 'hands-on') {
        lines.push('• Learn best by doing');
    } else if (quizData.learningPreference === 'after-some-research') {
        lines.push('• Prefer to research before taking action');
    } else {
        lines.push('• Adapt learning style to the situation');
    }
    // 5. Tech skills/adaptability
    if (quizData.techSkillsRating >= 4) {
        lines.push('• Confident with technology and new tools');
    } else if (quizData.techSkillsRating === 3) {
        lines.push('• Comfortable with most digital tools');
    } else {
        lines.push('• Willing to learn new technology as needed');
    }
    // 6. Resilience/self-motivation
    if (quizData.longTermConsistency >= 4 || quizData.selfMotivationLevel >= 4) {
        lines.push('• Highly self-motivated and consistent');
    } else if (quizData.longTermConsistency === 3) {
        lines.push('• Stay motivated with clear goals and support');
    } else {
        lines.push('• Working to build consistency and motivation');
    }
    return lines.slice(0, 6);
}

const ResultsEmailTemplatePaid = ({ quizData, userEmail }) => {
    const topPaths = getTopBusinessPaths(quizData);
    const snapshotLines = getPersonalizedSnapshot(quizData);
    return (
        <div style={{ background: '#f4f6fa', minHeight: '100vh', padding: '0', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' }}>
            <div style={{ maxWidth: 700, margin: '40px auto 0 auto', borderRadius: 24, boxShadow: '0 8px 32px rgba(37, 99, 235, 0.10)', background: '#fff', overflow: 'hidden' }}>
                {/* Gradient Hero with Centered Logo */}
                <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%)', padding: '56px 32px 56px 32px', textAlign: 'center', borderRadius: 0, margin: 0 }}>
                    <div style={{ fontSize: 54, marginBottom: 10, marginTop: 0 }}>🎉</div>
                    <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Your AI-Powered Business Blueprint</h1>
                    <p style={{ color: '#e0e7ef', fontSize: 15, margin: '18px 0 0 0', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Personalized recommendations based on your unique goals, skills, and preferences</p>
                </div>
                <div style={{ padding: '40px 32px 32px 32px', background: '#fff', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                    {/* Show all 3 business model cards */}
                    <div style={{ display: 'none', color: '#fff' }}>Your personalized business model results are ready! See your best fit, AI insights, and your full report.</div>
                    {topPaths.map((path, idx) => {
                        const emoji = path.emoji || '💡';
                        const fitScore = path.fitScore || 92;
                        const pros = path.pros ? path.pros.slice(0, 3) : [];
                        const description = path.detailedDescription || path.description;
                        return (
                            <div key={path.id} style={{ marginBottom: 32, borderRadius: 16, border: 'none', boxShadow: '0 8px 32px rgba(30, 41, 59, 0.18)', padding: '40px 40px 24px 40px', background: '#f1f5f9', textAlign: 'left', position: 'relative', transition: 'box-shadow 0.2s', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                                        <span style={{ fontSize: 38, marginRight: 8 }}>{emoji}</span>
                                        <h3 style={{ fontSize: 27, fontWeight: 900, color: '#18181b', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{path.name}</h3>
                                    </div>
                                    <div style={{ textAlign: 'center', marginLeft: 18 }}>
                                        <div style={{ fontWeight: 900, fontSize: 32, color: '#6366f1', lineHeight: 1 }}>{fitScore}%</div>
                                        <div style={{ fontWeight: 500, fontSize: 15, color: '#64748b', lineHeight: 1, marginTop: 6 }}>AI Match</div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 16, marginBottom: 6 }}>Top Benefits</div>
                                    <ul style={{ color: '#334155', fontSize: 15, margin: 0, padding: '0 0 0 18px', lineHeight: 1.7, listStyle: 'disc' }}>
                                        {pros.map((pro, i) => (
                                            <li key={i} style={{ marginBottom: 6 }}>{pro}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p style={{ color: '#18181b', fontSize: 16, marginBottom: 24, lineHeight: 1.7 }}>{description}</p>
                            </div>
                        );
                    })}
                    {/* Personalized Snapshot: match unlock features section, bullet points, emoji in title, gray divider below */}
                    <div style={{ background: '#f1f5f9', borderRadius: 16, margin: '0 0 32px 0', padding: '28px 32px', boxShadow: '0 8px 32px rgba(30,41,59,0.18)', border: 'none', textAlign: 'left' }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#18181b', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><span>📝</span>Personalized Snapshot</div>
                        <div style={{ borderTop: '1px solid #e5e7eb', margin: '0 0 18px 0', height: 1 }} />
                        <ul style={{ color: '#18181b', fontSize: 15, margin: 0, padding: '0 0 0 18px', lineHeight: 1.7, listStyle: 'disc' }}>
                            {snapshotLines.map((line, i) => (
                                <li key={i} style={{ marginBottom: 6 }}>{line.replace(/^• /, '')}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Welcome message: gray block, italic, no 'Dear user', 'With love...' right-aligned and centered, shadow. */}
                    <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 8px 32px rgba(30,41,59,0.18)', margin: '0 0 32px 0', padding: '28px 32px', fontSize: 16, color: '#18181b', fontStyle: 'italic', textAlign: 'left', lineHeight: 1.7, position: 'relative' }}>
                        <div style={{ marginBottom: 8, fontWeight: 600 }}>Dear User,</div>
                        <div>
                            Thanks for taking the BizModelAI quiz. Based on your responses, our system has carefully analyzed your skills, preferences, and entrepreneurial traits to identify the business models that best align with your goals. This personalized analysis is designed to help you take action with clarity and confidence—so you can stop second-guessing and start building a business that fits who you are and where you want to go.
                        </div>
                        <div style={{ textAlign: 'right', marginTop: 16, fontStyle: 'italic', fontWeight: 500, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <span style={{ textAlign: 'right' }}>With love,<br/>The BizModelAI Team 💌</span>
                        </div>
                    </div>
                    {/* View Full Results button for paid users */}
                    <div style={{ textAlign: 'center', margin: '0 0 32px 0' }}>
                        {(() => {
                            const userId = quizData?.userId || quizData?.userID || quizData?.user_id || '';
                            const attemptId = quizData?.attemptId || quizData?.attemptID || quizData?.attempt_id || '';
                            let url = 'https://bizmodelai.com/results';
                            const params = [];
                            if (userId) params.push(`userId=${encodeURIComponent(userId)}`);
                            if (attemptId) params.push(`attemptId=${encodeURIComponent(attemptId)}`);
                            if (params.length) url += '?' + params.join('&');
                            return (
                                <a href={url} style={{ display: 'inline-block', background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)', color: '#fff', padding: '16px 40px', borderRadius: 999, fontWeight: 900, fontSize: 20, textDecoration: 'none', boxShadow: '0 6px 24px rgba(59,130,246,0.13)', letterSpacing: '-0.01em', marginTop: 0 }}>View Full Results</a>
                            );
                        })()}
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* Footer: rounded corners at bottom only, straight line at top, connects to white above, social icons below 'Need help...', divider above copyright */}
            <div style={{ width: '100%', margin: '0 0 0 0', padding: '0', textAlign: 'center' }}>
                <div style={{ background: '#1e293b', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, padding: '32px 0 24px 0', color: '#fff', margin: '0 auto', boxShadow: '0 2px 12px rgba(30,41,59,0.10)', width: '90%', maxWidth: 700 }}>
                    {/* Centered logo and BizModelAI title */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '0 auto 0 auto', width: 'fit-content' }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2F8eb83e4a630e4b8d86715228efeb581b%2F8de3245c79ad43b48b9a59be9364a64e?format=webp&width=60" alt="BizModelAI Logo" style={{ width: 36, height: 36, borderRadius: 8, background: 'none', margin: '0 0 0 0', display: 'block' }} />
                        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em', color: '#fff' }}>BizModelAI</span>
                    </div>
                    {/* More space between logo/title and social icons */}
                    <div style={{ height: 18 }} />
                    <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 18, marginBottom: 0 }}>
                        Need help or have questions? Just reply to this email or contact team@bizmodelai.com.
                    </div>
                    {/* Socials: 4 icons, centered, light gray, now below help text */}
                    <div style={{ margin: '18px 0 18px 0', display: 'flex', justifyContent: 'center', gap: 22 }}>
                        {socials.map(s => (
                            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                                <img src={s.icon} alt={s.alt} style={{ width: 26, height: 26, filter: 'brightness(0) invert(0.7)' }} />
                            </a>
                ))}
            </div>
                    <div style={{ marginTop: 18 }}>
                    </div>
                    
                    {/* Divider below Unsubscribe */}
                    <div style={{ borderTop: '1px solid #334155', margin: '24px 0 0 0', height: 1, width: '80%', marginLeft: '10%', marginRight: '10%' }} />
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 18 }}>&copy; 2025 BizModelAI. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
};

export default ResultsEmailTemplatePaid;
