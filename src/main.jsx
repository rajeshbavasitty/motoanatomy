import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";

const A = "/assets/";
const R2_BASE = "https://pub-96af31b20d4a49f691d0be9efeac0c90.r2.dev/";
const brands = [
  ["Ducati", "ducati", "Italian performance"],
  ["Yamaha", "yamaha", "Japanese engineering"],
  ["Honda", "honda", "Everyday innovation"],
  ["Kawasaki", "kawasaki", "Ninja performance"],
  ["BMW Motorrad", "bmw", "Precision touring"],
  ["KTM", "ktm", "Ready to Race"],
  ["Triumph", "triumph", "British character"],
  ["Suzuki", "suzuki", "Engineering value"],
  ["Aprilia", "aprilia", "Racing technology"],
  ["Harley-Davidson", "harley-davidson", "American icon"],
  ["Royal Enfield", "royal-enfield", "Pure motorcycling"],
  ["MV Agusta", "mv-agusta", "Italian craft"],
];
const bikes = [
  {
    id: "panigale-v4",
    name: "Panigale V4",
    type: "Superbike",
    year: "2024",
    meta: "1,103 cc · V4 · 216 hp",
    img: "panigale-v4-hero.png",
    desc: "The ultimate expression of Ducati racing DNA, blending a Desmosedici Stradale V4 with advanced electronics and aerodynamic bodywork.",
  },
  {
    id: "streetfighter-v4",
    name: "Streetfighter V4",
    type: "Naked",
    year: "2025",
    meta: "1,103 cc · V4",
    img: "streetfighter-v4.png",
    desc: "Superbike performance stripped to its essential street-fighter attitude, with a high-output V4 and aggressive chassis setup.",
  },
  {
    id: "streetfighter-v2",
    name: "Streetfighter V2",
    type: "Naked",
    year: "2025",
    meta: "955 cc · V2",
    img: "streetfighter-v2.png",
    desc: "A compact naked performance bike with sharp ergonomics, lightweight architecture and Ducati twin-cylinder character.",
  },
  {
    id: "monster-937",
    name: "Monster 937",
    type: "Naked",
    year: "2024",
    meta: "937 cc · L-Twin",
    img: "monster-937.png",
    desc: "Minimalist, muscular and unmistakably Ducati, built around accessible performance and a lightweight chassis.",
  },
  {
    id: "diavel-v4",
    name: "Diavel V4",
    type: "Power Cruiser",
    year: "2024",
    meta: "1,158 cc · V4",
    img: "diavel-v4.png",
    desc: "A muscular power cruiser combining dramatic proportions, long-legged stance and Ducati V4 performance.",
  },
  {
    id: "multistrada-v4",
    name: "Multistrada V4",
    type: "Adventure Touring",
    year: "2024",
    meta: "1,158 cc · V4",
    img: "multistrada-v4.png",
    desc: "Long-distance adventure touring with V4 Granturismo power, comfort-focused chassis engineering and rider technology.",
  },
  {
    id: "hypermotard-950",
    name: "Hypermotard 950",
    type: "Supermoto",
    year: "2024",
    meta: "937 cc · L-Twin",
    img: "hypermotard-950.png",
    desc: "A high-energy supermoto platform made for quick direction changes, wheel-lifting attitude and playful road riding.",
  },
  {
    id: "scrambler-icon",
    name: "Scrambler Icon",
    type: "Scrambler",
    year: "2024",
    meta: "803 cc · L-Twin",
    img: "scrambler-icon.png",
    desc: "Timeless Scrambler styling with modern electronics, approachable ergonomics and unmistakable urban character.",
  },
  {
    id: "desertx",
    name: "DesertX",
    type: "Adventure",
    year: "2024",
    meta: "937 cc · L-Twin",
    img: "desertx.png",
    desc: "A true adventure motorcycle designed for long-range exploration on and off the road.",
  },
];
const systemData = {
  engine: [
    "Engine",
    "POWERTRAIN",
    "Combustion, crankshaft and valvetrain",
    "The engine converts fuel energy into rotational torque. Study the cylinders, crankcase, intake and exhaust path.",
    ["Cylinders", "Crankcase", "Intake", "Exhaust"],
  ],
  transmission: [
    "Transmission",
    "POWER DELIVERY",
    "Gearbox, clutch and final drive",
    "The transmission selects useful torque and speed ranges, then transfers drive to the rear wheel.",
    ["Gearbox", "Clutch", "Shift mechanism", "Final drive"],
  ],
  electronics: [
    "Electronics",
    "CONTROL SYSTEMS",
    "ECU, sensors and rider aids",
    "Electronic control systems combine sensor inputs with rider commands to manage engine and chassis behavior.",
    ["ECU", "IMU / sensors", "Ride modes", "ABS / traction"],
  ],
  braking: [
    "Braking",
    "STOPPING POWER",
    "Discs, calipers and control",
    "Brake hardware turns rider lever input into controlled deceleration and stability.",
    ["Front discs", "Calipers", "Master cylinder", "Rear brake"],
  ],
  suspension: [
    "Suspension",
    "CHASSIS CONTROL",
    "Fork, shock and wheel control",
    "Suspension manages load transfer and keeps the tyres connected to changing surfaces.",
    ["Front fork", "Rear shock", "Swingarm", "Linkage"],
  ],
  cooling: [
    "Cooling",
    "THERMAL MANAGEMENT",
    "Radiator, coolant and airflow",
    "Cooling removes heat generated by the engine so the powertrain can operate consistently.",
    ["Radiator", "Fan", "Coolant lines", "Oil cooling"],
  ],
  fuel: [
    "Fuel System",
    "COMBUSTION",
    "Tank, pump, airbox and injection",
    "Fuel and air delivery establish the mixture required for combustion and throttle response.",
    ["Tank", "Pump", "Airbox", "Injectors"],
  ],
  exhaust: [
    "Exhaust",
    "FLOW & SOUND",
    "Headers, collectors and silencers",
    "Exhaust hardware routes combustion gases while balancing flow, heat and acoustic character.",
    ["Headers", "Collectors", "Valve", "Silencer"],
  ],
  chassis: [
    "Chassis",
    "STRUCTURE",
    "Frame, swingarm and subframe",
    "The chassis ties the motorcycle together and establishes stiffness, balance and rider feedback.",
    ["Frame", "Swingarm", "Subframe", "Steering head"],
  ],
  aero: [
    "Aerodynamics",
    "AIRFLOW",
    "Fairings and aero surfaces",
    "Bodywork shapes airflow for stability, cooling, rider protection and drag management.",
    ["Fairing", "Winglets", "Screen", "Lower bodywork"],
  ],
};
const systemOrder = Object.keys(systemData);
function go(p) {
  history.pushState({}, "", p);
  dispatchEvent(new PopStateEvent("popstate"));
}
function BrandIcon({ code }) {
  return (
    <span className="brandIcon">
      <img
        src={`${A}brands/${code}.svg`}
        alt=""
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}
function Header({ onSearch }) {
  return (
    <header>
      <button className="brand" onClick={() => go("/")}>
        <span className="brandMark">M</span>
        <div>
          <b>MOTOANATOMY</b>
          <small>EXPLORE. LEARN. RIDE SMARTER.</small>
        </div>
      </button>
      <nav>
        <button onClick={() => go("/")}>Home</button>
        <button onClick={() => go("/brands")}>Brands</button>
        <button onClick={() => go("/how-it-works")}>How It Works</button>
        <button onClick={() => go("/glossary")}>Glossary</button>
        <button onClick={() => go("/quiz")}>Quiz</button>
      </nav>
      <div className="actions">
        <button onClick={onSearch}>⌕ Search</button>
        <button onClick={() => go("/help")}>Help</button>
        <span className="avatar">RA</span>
      </div>
    </header>
  );
}
function Home({ onSearch }) {
  const rail = useRef(null);
  const slide = (d) =>
    rail.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="home">
        <section className="homeHero">
          <div className="heroCopy">
            <div className="kicker">MOTORCYCLE ANATOMY PLATFORM</div>
            <h1>
              Explore motorcycles
              <br />
              <span>from the inside out.</span>
            </h1>
            <p>
              Interactive 3D models, exploded views, anatomy videos and
              system-by-system explanations. Learn what every major motorcycle
              component does.
            </p>
            <div className="ctaRow">
              <button className="primary big" onClick={() => go("/brands")}>
                Explore Motorcycles →
              </button>
              <button className="outline" onClick={() => go("/how-it-works")}>
                How It Works
              </button>
            </div>
          </div>
          <div className="heroBike">
            <div className="orbit orbit1" />
            <div className="orbit orbit2" />
            <img src={A + "panigale-v4-hero.png"} />
            <div className="floatingTag">LIVE ANATOMY LAB</div>
          </div>
        </section>
        <section className="section popularSection">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">POPULAR BRANDS</div>
              <h2>Choose a manufacturer</h2>
            </div>
            <div className="brandSliderControls">
              <button onClick={() => slide(-1)}>←</button>
              <button onClick={() => slide(1)}>→</button>
              <button className="textBtn" onClick={() => go("/brands")}>
                View all brands →
              </button>
            </div>
          </div>
          <div className="brandSlider">
            <button className="railArrow" onClick={() => slide(-1)}>
              ‹
            </button>
            <div className="brandRail" ref={rail}>
              {brands.map(([n, c, d]) => (
                <button
                  className="brandCard"
                  key={n}
                  onClick={() =>
                    go(n === "Ducati" ? "/brand/ducati" : "/brand/coming-soon")
                  }
                >
                  <BrandIcon code={c} />
                  <b>{n}</b>
                  <small>{d}</small>
                </button>
              ))}
            </div>
            <button className="railArrow" onClick={() => slide(1)}>
              ›
            </button>
          </div>
          <div className="sliderHint">
            Drag or scroll to browse brands <span>•</span> Click a brand to
            explore
          </div>
        </section>
        <section className="featureRow">
          <div>
            <span>01</span>
            <b>Real motorcycle imagery</b>
            <small>Model-specific visual references</small>
          </div>
          <div>
            <span>02</span>
            <b>Interactive 3D anatomy</b>
            <small>Rotate, zoom and inspect</small>
          </div>
          <div>
            <span>03</span>
            <b>Detailed explanations</b>
            <small>Understand systems and purpose</small>
          </div>
          <div>
            <span>04</span>
            <b>Learn by systems</b>
            <small>Engine, braking, chassis and more</small>
          </div>
        </section>
      </div>
    </>
  );
}
function Brands({ onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pageShell">
        <button className="back" onClick={() => go("/")}>
          ← Back to Home
        </button>
        <div className="brandHero">
          <div>
            <div className="kicker">BRAND DIRECTORY</div>
            <h1>Explore motorcycle brands</h1>
            <p>
              Choose a manufacturer to see its available motorcycles and
              continue into the anatomy lab.
            </p>
          </div>
          <div className="rotatingWheel">
            {brands.slice(0, 8).map(([n, c], i) => (
              <div
                key={n}
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-96px) rotate(-${i * 45}deg)`,
                }}
              >
                <BrandIcon code={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="brandDirectory">
          {brands.map(([n, c, d]) => (
            <button
              key={n}
              className="directoryCard"
              onClick={() =>
                go(n === "Ducati" ? "/brand/ducati" : "/brand/coming-soon")
              }
            >
              <BrandIcon code={c} />
              <div>
                <b>{n}</b>
                <small>{d}</small>
              </div>
              <span>Explore →</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
function Ducati({ onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pageShell">
        <button className="back" onClick={() => go("/brands")}>
          ← Back to Brands
        </button>
        <section className="manufacturer">
          <div className="ducatiShield">D</div>
          <div>
            <div className="kicker">ITALIAN MOTORCYCLE MANUFACTURER</div>
            <h1>Ducati</h1>
            <p>
              Performance, design and racing heritage. Choose a Ducati
              motorcycle to enter its model overview and anatomy lab.
            </p>
          </div>
        </section>
        <div className="sectionHead">
          <div>
            <div className="eyebrow">DUCATI MOTORCYCLES</div>
            <h2>Choose your motorcycle</h2>
          </div>
          <span className="count">{bikes.length} models</span>
        </div>
        <div className="bikeGrid">
          {bikes.map((b) => (
            <button
              className="bikeCard"
              key={b.id}
              onClick={() => go("/bike/" + b.id)}
            >
              <div className="bikeImage">
                <img src={A + b.img} alt={b.name} />
              </div>
              <div className="bikeInfo">
                <span>{b.type}</span>
                <h3>{b.name}</h3>
                <small>
                  {b.meta} · {b.year}
                </small>
                <p>{b.desc}</p>
                <strong>Explore Bike →</strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
function BikeOverview({ bike, onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pageShell">
        <div className="crumbs">
          <button onClick={() => go("/brands")}>Brands</button>
          <span>›</span>
          <button onClick={() => go("/brand/ducati")}>Ducati</button>
          <span>›</span>
          <b>{bike.name}</b>
        </div>
        <section className="bikeOverview">
          <div className="overviewCopy">
            <div className="kicker">DUCATI · {bike.type.toUpperCase()}</div>
            <h1>{bike.name}</h1>
            <div className="bigMeta">
              {bike.meta} · {bike.year}
            </div>
            <p>{bike.desc}</p>
            <div className="overviewActions">
              <button
                className="primary big"
                onClick={() => go(`/bike/${bike.id}/anatomy`)}
              >
                Start Learning →
              </button>
              <button
                className="outline"
                onClick={() => go(`/bike/${bike.id}/specs`)}
              >
                View Specifications
              </button>
            </div>
            <div className="systemPreview">
              {systemOrder.slice(0, 8).map((id) => (
                <button
                  key={id}
                  onClick={() => go(`/bike/${bike.id}/anatomy?system=${id}`)}
                >
                  <span>{systemData[id][0][0]}</span>
                  <b>{systemData[id][0]}</b>
                  <small>Explore</small>
                </button>
              ))}
            </div>
          </div>
          <div className="overviewImage">
            <img src={A + bike.img} alt={bike.name} />
            <div className="imageLabel">MODEL OVERVIEW</div>
          </div>
        </section>
      </div>
    </>
  );
}
function ThreeView({ bike }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current,
      scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(4, 2.1, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.4, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(4, 6, 5);
    scene.add(key);
    const red = new THREE.PointLight(0xff243d, 5, 9);
    red.position.set(-3, 1, 2);
    scene.add(red);
    let frame;
    new GLTFLoader().load(
      `${R2_BASE}ducati/${bike.id}/model.glb`,
      (g) => {
        const root = g.scene;
        root.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        const box = new THREE.Box3().setFromObject(root),
          size = box.getSize(new THREE.Vector3()),
          center = box.getCenter(new THREE.Vector3()),
          scale = 3.3 / Math.max(size.x, size.y, size.z);
        root.scale.setScalar(scale);
        root.position.sub(center.multiplyScalar(scale));
        scene.add(root);
      },
      undefined,
      () => {},
    );
    const resize = () => {
      const w = Math.max(el.clientWidth, 1),
        h = Math.max(el.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    addEventListener("resize", resize);
    const tick = () => {
      frame = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [bike.id]);
  return <div ref={ref} className="threeCanvas" />;
}
function RightCard({ system, bike }) {
  const d = systemData[system.id];
  return (
    <aside className="knowledge">
      <div className="eyebrow">KNOWLEDGE CARD</div>
      <h2>{d[0]}</h2>
      <div className="sub">
        {d[1]} · {d[0]}
      </div>
      <p>{d[3]}</p>
      <div className="why">
        <b>WHY IT MATTERS</b>
        <span>
          {d[0]} affects how the {bike.name} produces, controls or transfers
          performance.
        </span>
      </div>
      <div className="look">
        <b>WHAT TO LOOK FOR</b>
        {d[4].map((x) => (
          <span key={x}>• {x}</span>
        ))}
      </div>
      <div className="specs">
        <div>
          <span>Model</span>
          <strong>{bike.name}</strong>
        </div>
        <div>
          <span>Category</span>
          <strong>{bike.type}</strong>
        </div>
        <div>
          <span>System</span>
          <strong>{d[0]}</strong>
        </div>
      </div>
      <button
        className="primary"
        onClick={() => alert(`Learning module for ${d[0]} is ready to expand.`)}
      >
        Learn More About {d[0]} →
      </button>
    </aside>
  );
}
function SystemVisual({ system, bike }) {
  const d = systemData[system.id];
  return (
    <div className="systemVisual">
      <img className="systemBike" src={A + bike.img} />
      <div className={`systemGlow glow-${system.id}`} />
      <div className="focusLabel">
        <b>{d[0]}</b>
        <small>{d[1]}</small>
      </div>
      <div className="focusLine line1" />
      <div className="focusLine line2" />
    </div>
  );
}
function Anatomy({ bike, onSearch }) {
  const params = new URLSearchParams(location.search);
  const initial = params.get("system");
  const [mode, setMode] = useState(initial ? "system" : "exploded");
  const [system, setSystem] = useState(
    initial && systemData[initial] ? { id: initial } : { id: "engine" },
  );
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const video = useRef(null);
  const d = systemData[system.id];
  useEffect(() => {
    if (mode === "video" && video.current) {
      const p = video.current.play();
      p?.catch?.(() => {});
      setPlaying(true);
    }
  }, [mode, bike.id]);
  const changeZoom = (v) => setZoom(Math.max(0.65, Math.min(2.6, v)));
  const selectLeft = (id) => {
    setSystem({ id });
    setMode("system");
    history.replaceState({}, "", `/bike/${bike.id}/anatomy?system=${id}`);
  };
  const selectBottom = (id) => setSystem({ id });
  const exploded = `${A}ducati/${bike.id}/exploded.png`;
  const vid = `${A}ducati/${bike.id}/video.mp4`;
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pageShell anatomyPage">
        <div className="crumbs">
          <button onClick={() => go("/brands")}>Brands</button>
          <span>›</span>
          <button onClick={() => go("/brand/ducati")}>Ducati</button>
          <span>›</span>
          <button onClick={() => go("/bike/" + bike.id)}>{bike.name}</button>
          <span>›</span>
          <b>Anatomy</b>
        </div>
        <section className="anatomyHero">
          <div>
            <div className="kicker">DUCATI · {bike.type.toUpperCase()}</div>
            <h1>{bike.name}</h1>
            <div className="bigMeta">
              {bike.meta} · {bike.year}
            </div>
          </div>
          <div className="heroBtns">
            <button onClick={() => go("/bike/" + bike.id + "/specs")}>
              View Specifications
            </button>
            <button className="primary" onClick={() => setMode("system")}>
              Start Learning →
            </button>
          </div>
        </section>
        <div className="modeTabs">
          {[
            ["exploded", "Exploded View", "🧩", "See the parts"],
            ["video", "Video Anatomy", "▶", "Learn in motion"],
            ["3d", "3D Anatomy", "◉", "Rotate the model"],
            ["system", "System Anatomy", "◌", "Learn by system"],
          ].map(([id, n, ic, s]) => (
            <button
              className={mode === id ? "active" : ""}
              onClick={() => setMode(id)}
              key={id}
            >
              <span>{ic}</span>
              <b>{n}</b>
              <small>{s}</small>
            </button>
          ))}
        </div>
        <main>
          <aside className="left">
            <div className="bikeMini">
              <img src={A + bike.img} />
              <div>
                <b>Ducati</b>
                <strong>{bike.name}</strong>
                <small>
                  {bike.type} · {bike.meta}
                </small>
              </div>
            </div>
            <div className="sideTitle">ANATOMY SYSTEMS</div>
            {systemOrder.map((id) => (
              <button
                key={id}
                onClick={() => selectLeft(id)}
                className={system.id === id ? "selected" : ""}
              >
                <span>{systemData[id][0][0]}</span>
                {systemData[id][0]}
                <i>›</i>
              </button>
            ))}
          </aside>
          <section className="viewer">
            <div className="viewerTop">
              <div>
                <b>
                  {bike.name} —{" "}
                  {mode === "exploded"
                    ? "Exploded View"
                    : mode === "video"
                      ? "Video Anatomy"
                      : mode === "3d"
                        ? "3D Anatomy"
                        : "System Anatomy"}
                </b>
                <small>
                  {mode === "exploded"
                    ? "Zoom, inspect and reset"
                    : mode === "video"
                      ? "Your supplied anatomy video · autoplay enabled"
                      : mode === "3d"
                        ? "Interactive model · drag to rotate · scroll to zoom"
                        : "Select a system from the left to focus the lesson"}
                </small>
              </div>
              <div className="viewerTools">
                {mode === "exploded" && (
                  <>
                    <button onClick={() => changeZoom(zoom - 0.2)}>-</button>
                    <span>{Math.round(zoom * 100)}%</span>
                    <button onClick={() => changeZoom(zoom + 0.2)}>+</button>
                    <button onClick={() => setZoom(1)}>↻ Reset</button>
                    <button
                      onClick={() =>
                        document
                          .querySelector(".canvasWrap")
                          ?.requestFullscreen?.()
                      }
                    >
                      ⛶ Fullscreen
                    </button>
                  </>
                )}
                {mode === "video" && (
                  <>
                    <button
                      onClick={() => {
                        if (video.current) {
                          video.current.currentTime = 0;
                          video.current.play().catch(() => {});
                        }
                      }}
                    >
                      ↻ Replay
                    </button>
                    <button
                      onClick={() => {
                        if (video.current) {
                          if (playing) {
                            video.current.pause();
                            setPlaying(false);
                          } else {
                            video.current.play().catch(() => {});
                            setPlaying(true);
                          }
                        }
                      }}
                    >
                      {playing ? "❚❚ Pause" : "▶ Play"}
                    </button>
                  </>
                )}
                {mode === "3d" && <span className="pill">INTERACTIVE 3D</span>}
              </div>
            </div>
            <div
              className="canvasWrap"
              onWheel={(e) => {
                if (mode === "exploded") {
                  e.preventDefault();
                  changeZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
                }
              }}
            >
              {mode === "exploded" && (
                <img
                  className="exploded"
                  style={{ transform: `scale(${zoom})` }}
                  src={exploded}
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = A + bike.img;
                  }}
                />
              )}
              {mode === "video" && (
                <video
                  ref={video}
                  className="video"
                  src={vid}
                  controls
                  playsInline
                  autoPlay
                  loop
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              )}{" "}
              {mode === "3d" && <ThreeView bike={bike} />}{" "}
              {mode === "system" && (
                <SystemVisual system={system} bike={bike} />
              )}
            </div>
            {mode === "exploded" && (
              <div className="zoomHint">
                Scroll to zoom · − / + buttons · Reset to 100%
              </div>
            )}
            <div className="systemStrip">
              {systemOrder.map((id) => (
                <button
                  className={id === system.id ? "active" : ""}
                  onClick={() =>
                    mode === "video" ? selectBottom(id) : selectLeft(id)
                  }
                  key={id}
                >
                  <span>{systemData[id][0][0]}</span>
                  <b>{systemData[id][0]}</b>
                </button>
              ))}
            </div>
          </section>
          <RightCard system={system} bike={bike} />
        </main>
      </div>
    </>
  );
}
function Specs({ bike, onSearch }) {
  const specs = [
    ["Engine", bike.meta.split(" · ")[1] || "Ducati powertrain"],
    ["Displacement", bike.meta.split(" · ")[0]],
    ["Category", bike.type],
    ["Model year", bike.year],
    ["Learning modes", "Exploded · Video · 3D · Systems"],
    ["Assets", "Model-specific image · MP4 · GLB"],
  ];
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="pageShell">
        <div className="crumbs">
          <button onClick={() => go("/bike/" + bike.id)}>
            ← Back to {bike.name}
          </button>
          <span>›</span>
          <b>Specifications</b>
        </div>
        <section className="specPage">
          <div className="specContent">
            <div className="kicker">MODEL SPECIFICATIONS</div>
            <h1>{bike.name}</h1>
            <p>{bike.desc}</p>
            <div className="specTable">
              {specs.map(([a, b]) => (
                <div key={a}>
                  <span>{a}</span>
                  <strong>{b}</strong>
                </div>
              ))}
            </div>
            <button
              className="primary big"
              onClick={() => go("/bike/" + bike.id + "/anatomy")}
            >
              Start Learning →
            </button>
          </div>
          <div className="specVisual">
            <span className="imageLabel">MODEL OVERVIEW</span>
            <img src={A + bike.img} />
          </div>
        </section>
      </div>
    </>
  );
}
function SimplePage({ title, eyebrow, body, onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <div className="simplePage">
        <div className="kicker">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{body}</p>
        <button className="primary big" onClick={() => go("/")}>
          Back Home →
        </button>
      </div>
    </>
  );
}
function Search({ close }) {
  const [q, setQ] = useState("");
  const results = useMemo(
    () =>
      bikes.filter((b) =>
        (b.name + " " + b.type).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  return (
    <div className="modalBackdrop" onClick={close}>
      <div className="searchModal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close}>
          ×
        </button>
        <div className="kicker">SEARCH MOTOANATOMY</div>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search bikes..."
        />
        {q && (
          <div className="searchResults">
            {results.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  close();
                  go("/bike/" + b.id);
                }}
              >
                <b>{b.name}</b>
                <span>
                  {b.type} · {b.meta}
                </span>{" "}
                →
              </button>
            ))}
            {!results.length && <p>No model found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
function App() {
  const [path, setPath] = useState(location.pathname);
  const [search, setSearch] = useState(false);
  useEffect(() => {
    const f = () => setPath(location.pathname);
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  let content;
  if (path === "/") content = <Home onSearch={() => setSearch(true)} />;
  else if (path === "/brands")
    content = <Brands onSearch={() => setSearch(true)} />;
  else if (path === "/brand/ducati")
    content = <Ducati onSearch={() => setSearch(true)} />;
  else if (path === "/brand/coming-soon")
    content = (
      <SimplePage
        onSearch={() => setSearch(true)}
        eyebrow="BRANDS"
        title="More manufacturers coming next"
        body="Ducati is the first complete manufacturer flow. More brands can plug into the same architecture."
      />
    );
  else if (path === "/how-it-works")
    content = (
      <SimplePage
        onSearch={() => setSearch(true)}
        eyebrow="HOW IT WORKS"
        title="Choose. Explore. Understand."
        body="Start at a manufacturer, choose a motorcycle, review its overview and specifications, then enter the four-mode Anatomy Lab: Exploded View, Video Anatomy, 3D Anatomy and System Anatomy."
      />
    );
  else if (path === "/glossary")
    content = (
      <SimplePage
        onSearch={() => setSearch(true)}
        eyebrow="GLOSSARY"
        title="Motorcycle terminology, explained"
        body="Engine, gearbox, swingarm, fork, ABS, ECU, radiator, final drive and other motorcycle terms become searchable learning entries as the knowledge base grows."
      />
    );
  else if (path === "/quiz")
    content = (
      <SimplePage
        onSearch={() => setSearch(true)}
        eyebrow="QUIZ"
        title="Test your motorcycle knowledge"
        body="The quiz module will use the same component and system knowledge cards from the Anatomy Lab."
      />
    );
  else if (path === "/help")
    content = (
      <SimplePage
        onSearch={() => setSearch(true)}
        eyebrow="HELP"
        title="Need a hand?"
        body="Use Search to find a motorcycle, use the brand directory to browse manufacturers, or enter a bike and start its anatomy learning experience."
      />
    );
  else if (path.startsWith("/bike/")) {
    const p = path.split("/").filter(Boolean),
      id = p[1] || "panigale-v4",
      bike = bikes.find((b) => b.id === id) || bikes[0];
    content =
      p[2] === "anatomy" ? (
        <Anatomy bike={bike} onSearch={() => setSearch(true)} />
      ) : p[2] === "specs" ? (
        <Specs bike={bike} onSearch={() => setSearch(true)} />
      ) : (
        <BikeOverview bike={bike} onSearch={() => setSearch(true)} />
      );
  } else content = <Home onSearch={() => setSearch(true)} />;
  return (
    <>
      {content}
      {search && <Search close={() => setSearch(false)} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
