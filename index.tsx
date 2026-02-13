import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

/* ─────────────────────────────────────────────
   Catcoin ($CAT) Landing Page
   The Original Cat Meme Coin — Since 2013
   ───────────────────────────────────────────── */

const CONTRACT_ADDRESS = '8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump';

// ── Floating Particles ──
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

// ── Navigation ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 24px',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/coin-logo.jpg" alt="Catcoin" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #d4af37, #f5d060)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}>
          CATCOIN
        </span>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#d4af37',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 4,
          padding: '2px 6px',
          marginLeft: 4,
        }}>
          $CAT
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
        <a href="#about" style={navLinkStyle}>About</a>
        <a href="#history" style={navLinkStyle}>History</a>
        <a href="#tokenomics" style={navLinkStyle}>Tokenomics</a>
        <a href="#community" style={navLinkStyle}>Community</a>
        <a
          href="https://pump.fun/coin/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #d4af37, #b8941f)',
            color: '#0a0a0f',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          }}>
          Buy $CAT
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
        }}
      >
        <div style={{ width: 24, height: 2, background: '#d4af37', marginBottom: 6, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <div style={{ width: 24, height: 2, background: '#d4af37', marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
        <div style={{ width: 24, height: 2, background: '#d4af37', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          background: 'rgba(10, 10, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
        }}>
          <a href="#about" onClick={() => setMenuOpen(false)} style={{ ...navLinkStyle, fontSize: 18 }}>About</a>
          <a href="#history" onClick={() => setMenuOpen(false)} style={{ ...navLinkStyle, fontSize: 18 }}>History</a>
          <a href="#tokenomics" onClick={() => setMenuOpen(false)} style={{ ...navLinkStyle, fontSize: 18 }}>Tokenomics</a>
          <a href="#community" onClick={() => setMenuOpen(false)} style={{ ...navLinkStyle, fontSize: 18 }}>Community</a>
          <a
            href="https://pump.fun/coin/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #d4af37, #b8941f)',
              color: '#0a0a0f',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              textAlign: 'center',
            }}>
            Buy $CAT
          </a>
        </div>
      )}
    </nav>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  transition: 'color 0.2s',
  letterSpacing: '0.5px',
};

// ── Hero Section ──
function Hero() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 800,
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Coin image */}
      <div style={{
        position: 'relative',
        marginBottom: 48,
        animation: 'float 6s ease-in-out infinite',
      }}>
        <img
          src="/coin-render.jpg"
          alt="Catcoin"
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            objectFit: 'cover',
            filter: 'drop-shadow(0 0 60px rgba(212, 175, 55, 0.4))',
          }}
        />
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 800,
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 16,
        background: 'linear-gradient(135deg, #ffffff, #d4af37, #f5d060)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-2px',
      }}>
        CATCOIN
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2.5vw, 22px)',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 400,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        marginBottom: 32,
        textAlign: 'center',
      }}>
        The Original Cat Meme Coin — Since 2013
      </p>

      <p style={{
        fontSize: 'clamp(14px, 1.8vw, 18px)',
        color: 'rgba(255,255,255,0.6)',
        maxWidth: 600,
        textAlign: 'center',
        lineHeight: 1.7,
        marginBottom: 40,
      }}>
        Born on December 23, 2013 as the first cat-themed response to Dogecoin.
        The first PoW coin to implement PID in civilian application.
        Created by <span style={{ color: '#d4af37' }}>@kr105rlz</span>.
      </p>

      {/* CTA Buttons */}
      <div style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 48,
      }}>
        <a
          href="https://pump.fun/coin/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #d4af37, #b8941f)',
            color: '#0a0a0f',
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            letterSpacing: '0.5px',
          }}>
          Buy on Pump.fun
        </a>
        <a
          href="https://bitcointalk.org/index.php?topic=380130"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '16px 40px',
            background: 'transparent',
            color: '#d4af37',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 16,
            textDecoration: 'none',
            transition: 'all 0.2s',
            letterSpacing: '0.5px',
          }}>
          BitcoinTalk Thread
        </a>
      </div>

      {/* Contract Address */}
      <div
        onClick={copyAddress}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 20px',
          background: 'rgba(212, 175, 55, 0.06)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          borderRadius: 12,
          cursor: 'pointer',
          transition: 'all 0.2s',
          maxWidth: '90vw',
        }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>CA:</span>
        <span style={{
          fontSize: 'clamp(11px, 1.5vw, 14px)',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.7)',
          wordBreak: 'break-all',
        }}>
          {CONTRACT_ADDRESS}
        </span>
        <span style={{
          fontSize: 12,
          color: copied ? '#4ade80' : '#d4af37',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── About Section ──
function About() {
  return (
    <section id="about" style={{
      padding: '120px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48,
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            marginBottom: 24,
            lineHeight: 1.1,
          }}>
            The First Cat
            <br />
            <span style={{ color: '#d4af37' }}>Fights Back</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginBottom: 20,
          }}>
            Catcoin (CAT) was born on December 23, 2013, just weeks after the original Dogecoin launch.
            It was the very first cat-themed cryptocurrency ever created — a direct feline response to the doge meme wave.
          </p>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginBottom: 20,
          }}>
            Historically, Catcoin is the first Proof-of-Work coin to implement PID (Proportional-Integral-Derivative)
            control in civilian application — a technical milestone that set it apart from the meme coins that followed.
          </p>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
          }}>
            Created by <span style={{ color: '#d4af37', fontWeight: 600 }}>@kr105rlz</span> in 2013, officially endorsed
            and also being CTO'd by the creator himself — because the community that deployed felt sidelined and
            deleted the original community channels.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="/pill.jpg"
            alt="Catcoin Pills"
            style={{
              maxWidth: '100%',
              width: 400,
              filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.2))',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── History Timeline ──
function History() {
  const events = [
    { year: '2013', title: 'Genesis Block', desc: 'Catcoin launches on December 23, 2013 — the first-ever cat-themed cryptocurrency. Created by @kr105rlz as a feline response to Dogecoin.' },
    { year: '2013', title: 'PID Innovation', desc: 'Becomes the first Proof-of-Work coin to implement PID (Proportional-Integral-Derivative) control in civilian application.' },
    { year: '2013', title: 'BitcoinTalk Announcement', desc: 'The original announcement thread is posted on BitcoinTalk, establishing Catcoin\'s presence in the crypto community.' },
    { year: '2025', title: 'Pump.fun Launch', desc: 'Catcoin gets a fresh start on Solana via Pump.fun, bringing the OG cat meme coin to a new generation of degens.' },
  ];

  return (
    <section id="history" style={{
      padding: '120px 24px',
      maxWidth: 800,
      margin: '0 auto',
    }}>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(32px, 4vw, 48px)',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 16,
      }}>
        A Decade of <span style={{ color: '#d4af37' }}>History</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
        marginBottom: 64,
      }}>
        From genesis block to Solana revival
      </p>

      <div style={{ position: 'relative', paddingLeft: 40 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'linear-gradient(to bottom, #d4af37, rgba(212, 175, 55, 0.1))',
        }} />

        {events.map((e, i) => (
          <div key={i} style={{
            position: 'relative',
            marginBottom: 48,
            paddingLeft: 24,
          }}>
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: -32,
              top: 6,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#d4af37',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
            }} />
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#d4af37',
              letterSpacing: '2px',
              display: 'block',
              marginBottom: 8,
            }}>
              {e.year}
            </span>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 8,
            }}>
              {e.title}
            </h3>
            <p style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
            }}>
              {e.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Stats Cards ──
function Stats() {
  const stats = [
    { label: 'Genesis Block', value: 'Dec 23, 2013', sub: 'Over a decade of history' },
    { label: 'Algorithm', value: 'Proof of Work', sub: 'First PoW with PID control' },
    { label: 'Creator', value: '@kr105rlz', sub: 'Original founder & CTO' },
    { label: 'Chain', value: 'Solana', sub: 'Pump.fun revival' },
  ];

  return (
    <section id="tokenomics" style={{
      padding: '80px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(212, 175, 55, 0.04)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: 16,
            padding: '32px 24px',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}>
            <div style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 700,
              color: '#d4af37',
              marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.35)',
            }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Mascot / Community Section ──
function Community() {
  return (
    <section id="community" style={{
      padding: '120px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', order: 1 }}>
          <img
            src="/mascot.jpg"
            alt="Catcoin Mascot"
            style={{
              maxWidth: '100%',
              width: 400,
              borderRadius: 24,
              filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.15))',
            }}
          />
        </div>

        <div style={{ order: 2 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            marginBottom: 24,
            lineHeight: 1.1,
          }}>
            Join the
            <br />
            <span style={{ color: '#d4af37' }}>OG Movement</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginBottom: 32,
          }}>
            Before POPCAT. Before MEW. Before any cat token you've ever heard of —
            there was Catcoin. The original. The genesis cat of crypto.
            Now revived on Solana, carrying a decade of meme history.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="https://x.com/i/communities/2022384097608228890"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s',
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </a>
            <a
              href="https://pump.fun/coin/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 10,
                color: '#d4af37',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s',
              }}>
              Pump.fun
            </a>
            <a
              href="https://dexscreener.com/solana/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s',
              }}>
              DexScreener
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Coin Render Banner ──
function CoinBanner() {
  return (
    <section style={{
      padding: '80px 24px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <img
        src="/coin-render.jpg"
        alt="Catcoin Render"
        style={{
          maxWidth: 320,
          width: '100%',
          filter: 'drop-shadow(0 0 80px rgba(212, 175, 55, 0.3))',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
    </section>
  );
}

// ── Footer ──
function Footer() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer style={{
      padding: '64px 24px',
      borderTop: '1px solid rgba(212, 175, 55, 0.08)',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        textAlign: 'center',
      }}>
        <img src="/coin-logo.jpg" alt="Catcoin" style={{ width: 48, height: 48, borderRadius: '50%' }} />
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: '#d4af37',
        }}>
          CATCOIN ($CAT)
        </div>
        <div
          onClick={copyAddress}
          style={{
            padding: '10px 20px',
            background: 'rgba(212, 175, 55, 0.06)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.5)',
            wordBreak: 'break-all',
            maxWidth: '90vw',
          }}>
          {CONTRACT_ADDRESS}
          <span style={{ marginLeft: 8, color: copied ? '#4ade80' : '#d4af37', fontWeight: 600 }}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </div>
        <div style={{
          display: 'flex',
          gap: 24,
          fontSize: 14,
        }}>
          <a href="https://pump.fun/coin/8ucgWfoG9UDTZttgzKP99f4pLtZyczDan2GDHiG7pump" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Pump.fun</a>
          <a href="https://x.com/i/communities/2022384097608228890" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>X (Twitter)</a>
          <a href="https://bitcointalk.org/index.php?topic=380130" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>BitcoinTalk</a>
        </div>
        <p style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.2)',
          marginTop: 16,
        }}>
          Genesis Block: December 23, 2013. The original cat meme coin.
        </p>
      </div>
    </footer>
  );
}

// ── Global Styles ──
function GlobalStyles() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-16px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }

      a:hover {
        opacity: 0.85;
      }

      /* Mobile menu button visibility */
      @media (max-width: 768px) {
        .nav-links {
          display: none !important;
        }
        .mobile-menu-btn {
          display: block !important;
        }
      }

      /* Smooth scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0a0f;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(212, 175, 55, 0.2);
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(212, 175, 55, 0.4);
      }

      ::selection {
        background: rgba(212, 175, 55, 0.3);
        color: #fff;
      }
    `}</style>
  );
}

// ── Main App ──
function App() {
  return (
    <>
      <GlobalStyles />
      <Particles />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Nav />
        <Hero />
        <About />
        <Stats />
        <History />
        <Community />
        <CoinBanner />
        <Footer />
      </div>
    </>
  );
}

// ── Mount ──
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
