"use client";

import { useState } from "react";
import { Instagram, Linkedin, Youtube, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          color: "white",
          fontFamily: "var(--font-jost, 'Jost', sans-serif)",
        }}
      >
        {/* Ultra-thin top gold accent line */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.6) 40%, rgba(201,169,110,0.6) 60%, transparent 100%)",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "clamp(14px, 2.5vw, 22px) clamp(20px, 5vw, 48px)",
            gap: 24,
          }}
        >
          {/* ── Logo ── */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
              marginLeft: "-4px",
            }}
            aria-label="Desire Woods — Home"
          >
            <img
              src="/logo.png"
              alt="Desire Woods"
              className="navbar-logo"
              style={{
                height: "clamp(100px, 10vw, 500px)",
                width: "auto",
                objectFit: "contain",
                /* invert black logo → white, then tint with gold */
                filter:
                  "invert(1) brightness(1.15) sepia(0.18) saturate(1.2)",
                transition: "filter 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "invert(1) brightness(1.35) sepia(0.45) saturate(1.8) hue-rotate(-5deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter =
                  "invert(1) brightness(1.15) sepia(0.18) saturate(1.2)";
              }}
            />
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul
            style={{
              display: "flex",
              gap: "clamp(24px, 3.5vw, 48px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              flex: 1,
              justifyContent: "center",
            }}
            className="desktop-nav"
          >
            {["PRODUCTS", "COLLECTIONS", "ABOUT US", "CONTACT"].map((item) => (
              <li key={item} style={{ position: "relative" }}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    transition: "color 0.25s ease",
                    paddingBottom: 4,
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#c9a96e";
                    e.currentTarget.querySelector?.(".underline-bar") &&
                      (e.currentTarget.querySelector(".underline-bar").style.width = "100%");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  {item}
                  {/* Gold underline on hover via pseudo-style trick */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: 1,
                      width: 0,
                      background: "rgba(201,169,110,0.8)",
                      transition: "width 0.3s ease",
                      display: "block",
                    }}
                    className="nav-underline"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right: Social Icons + Search ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 1.8vw, 20px)",
              flexShrink: 0,
            }}
            className="desktop-icons"
          >
            {[
              {
                Icon: Instagram,
                href: "https://www.instagram.com/desirewoodsindia",
                label: "Instagram",
              },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Youtube, href: "#", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  transition: "color 0.25s ease, transform 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#c9a96e";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 16,
                background: "rgba(255,255,255,0.15)",
              }}
              className="desktop-icons"
            />

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c9a96e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <Search size={16} strokeWidth={1.5} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.85)",
                cursor: "pointer",
                padding: 0,
                display: "none",
                alignItems: "center",
              }}
              className="hamburger"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ── Search Bar Dropdown ── */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: searchOpen ? 80 : 0,
            transition: "max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(16px)",
            borderTop: searchOpen ? "1px solid rgba(201,169,110,0.2)" : "none",
          }}
        >
          <div
            style={{
              maxWidth: 560,
              margin: "0 auto",
              padding: "16px clamp(20px, 5vw, 48px)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Search size={16} color="rgba(201,169,110,0.7)" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search collections, products…"
              autoFocus={searchOpen}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: 13,
                letterSpacing: "0.08em",
                fontFamily: "var(--font-jost, 'Jost', sans-serif)",
              }}
            />
          </div>
        </div>

        {/* ── Mobile Menu Drawer ── */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 400 : 0,
            transition: "max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(201,169,110,0.15)",
          }}
          className="mobile-menu"
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "24px clamp(20px, 6vw, 32px) 32px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {["PRODUCTS", "COLLECTIONS", "ABOUT US", "CONTACT"].map((item, i) => (
              <li
                key={item}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <a
                  href="#"
                  style={{
                    display: "block",
                    padding: "16px 0",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Social row in mobile menu */}
            <li style={{ paddingTop: 24, display: "flex", gap: 20 }}>
              {[
                { Icon: Instagram, href: "https://www.instagram.com/desirewoodsindia" },
                { Icon: Linkedin, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-icons { display: none !important; }
          .hamburger { display: flex !important; }
          
          /* Logo adjustments for mobile */
          .navbar-logo {
            height: clamp(52px, 8vw, 72px) !important;
            margin-left: -8px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .hamburger { display: none !important; }
        }

        /* Hover underline effect for nav links */
        nav a:hover .nav-underline {
          width: 100% !important;
        }
      `}</style>
    </>
  );
}