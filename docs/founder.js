/* ═══ POST-IT · MODULO FOUNDER (pezzo 1) ═══ */
(function () {
  const RUOLI = ["Alpha Tester", "Beta-Tester", "Bug Finder", "Customer Support", "Head of Customer Support", "App Security", "Head of App Security", "Designer", "Lead Designer", "Counselor", "Head Counselor", "Announcer", "Head of Announcements"];
  const PERMESSI = [["diag", "Diagnosi Database"], ["bug", "Bug Finder"], ["review", "App Review"], ["ann", "Fai un annuncio"]];
  const PALETTE = ["#FFF176", "#F8BBD0", "#90CAF9", "#CE93D8", "#FFAB91", "#A5D6A7", "#80DEEA", "#FFCC80"];
  const sb = () => window.__sb || null;
  const myPid = () => window.__myPid || null;
  let cfg = null, team = [], aperto = false;

  const css = document.createElement("style");
  css.textContent = `
    .ftBtn { display: block; width: calc(100% - 0px); border: 0; border-radius: 14px; padding: 12px; margin: 10px 0 0; font-weight: 800; font-size: 15px; background: #2A2620; color: #FFD34D; box-shadow: 0 6px 14px -6px rgba(40,40,70,.4); }
    .ftOvl { position: fixed; inset: 0; z-index: 990; background: #ECEEF3; overflow-y: auto; padding: 14px; font-family: inherit; }
    .ftHead { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .ftHead b { font-size: 18px; }
    .ftBack { border: 0; border-radius: 99px; padding: 8px 14px; background: #fff; font-weight: 800; }
    .ftCard { background: #fff; border-radius: 14px; padding: 12px 14px; margin: 8px 0; box-shadow: 0 4px 12px -6px rgba(40,40,70,.25); }
    .ftCard h4 { margin: 0 0 2px; font-size: 15px; }
    .ftRole { display: inline-block; background: #FFF3C6; border-radius: 99px; padding: 3px 9px; font-size: 12.5px; font-weight: 800; margin: 2px 0; }
    .ftHint { font-size: 12.5px; opacity: .75; }
    .ftInp, .ftSel, .ftTa { width: 100%; box-sizing: border-box; border: 1.5px solid #d6d9e0; border-radius: 10px; padding: 9px 10px; margin: 4px 0; font: inherit; background: #fff; }
    .ftTa { min-height: 64px; }
    .ftGo { border: 0; border-radius: 99px; padding: 9px 16px; background: #2A2620; color: #fff; font-weight: 800; margin-top: 6px; }
    .ftDel { border: 0; border-radius: 99px; padding: 7px 12px; background: #FBE3E3; color: #C62838; font-weight: 800; }
    .ftChk { display: flex; gap: 6px; align-items: center; font-size: 13.5px; margin: 3px 0; }
    .ftDiag p { margin: 4px 0; font-size: 13px; word-break: break-word; }
    .ftFounderBadge { background: #2A2620; color: #FFD34D; border-radius: 99px; padding: 3px 10px; font-size: 12.5px; font-weight: 800; display: inline-block; }
    .ftOvl.sughero { background-color: #C89B67; background-image: radial-gradient(circle at 18% 22%, rgba(120,72,30,.22) 0 2px, transparent 3px), radial-gradient(circle at 64% 8%, rgba(120,72,30,.16) 0 2px, transparent 3px), radial-gradient(circle at 82% 46%, rgba(90,52,18,.2) 0 1.6px, transparent 2.6px), radial-gradient(circle at 38% 68%, rgba(120,72,30,.18) 0 2px, transparent 3px), radial-gradient(circle at 8% 84%, rgba(90,52,18,.15) 0 1.8px, transparent 2.8px), radial-gradient(circle at 90% 88%, rgba(120,72,30,.2) 0 2px, transparent 3px); background-size: 90px 90px, 120px 120px, 140px 140px, 110px 110px, 160px 160px, 130px 130px; }
    .ftBoard { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; padding: 8px 0 16px; }
    .ftSez { font-family: Caveat, cursive; font-size: 27px; font-weight: 700; color: #3A2712; text-align: center; margin: 8px 0 0; text-shadow: 0 1px 0 rgba(255,255,255,.28); letter-spacing: .5px; }
    .ftWrap { position: relative; }
    .ftNote { position: relative; width: 150px; min-height: 140px; padding: 20px 10px 12px; border-radius: 4px; box-shadow: 0 10px 16px -8px rgba(50,30,10,.55); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
    .ftNote.scuro { background: #2A2620 !important; }
    .ftNote.scuro h4 { color: #FFD34D; }
    .ftNote.scuro .ftPill.main { background: #FFD34D; color: #2A2620; }
    .ftNote.scuro .ftLav { color: rgba(255,255,255,.8); }
    .ftPin { position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(12deg); font-size: 23px; filter: drop-shadow(1px 3px 2px rgba(50,30,10,.45)); pointer-events: none; z-index: 3; }
    .ftPin svg { display: block; }
    .ftHole { position: absolute; top: 7px; left: 50%; transform: translateX(-42%); width: 7px; height: 4px; border-radius: 50%; background: rgba(30,20,8,.55); box-shadow: inset 0 1px 1px rgba(0,0,0,.6); z-index: 2; pointer-events: none; }
    .ftNote::after { content: ""; position: absolute; right: 0; bottom: 0; width: 16px; height: 16px; background: linear-gradient(to top left, transparent 49.5%, rgba(0,0,0,.22) 50%, rgba(0,0,0,.07) 100%); }
    .ftNote h4 { margin: 0 0 6px; font-family: Caveat, cursive; font-size: 21px; line-height: 1.05; text-align: center; }
    .ftPill { display: block; width: fit-content; margin: 3px auto; border-radius: 99px; padding: 2px 9px; font-size: 11.5px; font-weight: 800; background: rgba(255,255,255,.65); }
    .ftPill.main { background: rgba(42,38,32,.85); color: #FFD34D; }
    .ftPill.main::before { content: "★ "; }
    .ftPill.main::after { content: " ★"; }
    .ftLav { font-size: 11px; opacity: .8; margin-top: 6px; text-align: center; }
    .ftAzioni { text-align: center; margin-top: 8px; }
    .ftAzioni button { font-size: 11.5px; padding: 5px 9px; }
    .ftStar { border: 0; background: transparent; font-size: 17px; padding: 0 4px; opacity: .3; }
    .ftStar.on { opacity: 1; }
    .ftDot { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(0,0,0,.15); display: inline-block; margin: 0 3px; }
    .ftDot.on { border-color: #2A2620; transform: scale(1.15); }
    .ftScheda { position: fixed; inset: 0; z-index: 995; background: rgba(40,30,15,.45); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .ftSchedaNote { position: relative; width: min(84vw, 330px); border-radius: 5px; padding: 30px 18px 16px; box-shadow: 0 18px 40px -12px rgba(30,18,5,.6); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%); rotate: -1.5deg; }
    .ftSchedaNote::after { content: ""; position: absolute; right: 0; bottom: 0; width: 20px; height: 20px; background: linear-gradient(to top left, transparent 49.5%, rgba(0,0,0,.22) 50%, rgba(0,0,0,.07) 100%); }
    .ftSchedaNote h3 { margin: 0 0 8px; font-family: Caveat, cursive; font-size: 30px; text-align: center; }
    .ftSchedaNote.scuro h3 { color: #FFD34D; }
    .ftSchedaNote.scuro .ftBio, .ftSchedaNote.scuro .ftLav { color: rgba(255,255,255,.85); }
    .ftSchedaNote.scuro .ftPill.main { background: #FFD34D; color: #2A2620; }
    .ftBio { font-size: 13.5px; margin: 10px 0; white-space: pre-wrap; }
    .ftChiudi { display: block; margin: 12px auto 0; border: 0; border-radius: 99px; padding: 9px 18px; background: #2A2620; color: #fff; font-weight: 800; }
    .ftPinPick { font-size: 21px; border: 2px solid transparent; border-radius: 10px; background: rgba(255,255,255,.7); padding: 3px 6px; margin: 2px; }
    .ftPinPick.on { border-color: #2A2620; }
  `;
  document.head.appendChild(css);

  async function carica() {
    const s = sb(); if (!s) return;
    try {
      const c = await s.from("fondazione").select("*").eq("id", "cfg").maybeSingle();
      cfg = c.data || null;
      const t = await s.from("team").select("*");
      team = (t.data || []).sort((a, b) => (a.nome > b.nome ? 1 : -1));
    } catch (e) {}
  }
  const sonoFounder = () => !!(cfg && cfg.founder_pid && myPid() && cfg.founder_pid === myPid());

  function el(tag, cls, testo) { const e = document.createElement(tag); if (cls) e.className = cls; if (testo != null) e.textContent = testo; return e; }
  function pinPicker(iniziale, onPick) {
    let scelto = iniziale || "classic";
    const wrap = el("div");
    wrap.appendChild(el("p", "ftHint", "Scegli il pin (o scrivi il tuo)"));
    const evidenzia = () => wrap.querySelectorAll(".ftPinPick").forEach((q) => q.classList.toggle("on", q.dataset.pin === scelto));
    [["classic", "📌 intro"], "📍", "⭐", "❤️", "🌸", "🍀", "⚡", "🎯", "🔥", "✨", "🎀", "🦋", "🌙", "🍄", "🐞", "🌈", "💎", "🔮", "🍕", "⚽", "🎮", "🎸", "👑", "🖤"].map((x) => Array.isArray(x) ? x : [x, x]).forEach(([emo, lab]) => {
      const bb = el("button", "ftPinPick", lab); bb.type = "button"; bb.dataset.pin = emo;
      bb.onclick = () => { scelto = emo; onPick(emo); evidenzia(); };
      wrap.appendChild(bb);
    });
    const mio = el("input", "ftInp"); mio.placeholder = "…oppure il tuo emoji ✏️"; mio.maxLength = 4; mio.style.width = "170px";
    mio.oninput = () => { const v = mio.value.trim(); if (v) { scelto = v; onPick(v); evidenzia(); } };
    wrap.appendChild(mio);
    setTimeout(evidenzia, 0);
    return wrap;
  }
  function pinDi(deco) {
    const scelto = (deco || {}).pin || "classic";
    const p = el("span", "ftPin");
    if (scelto === "classic") {
      p.innerHTML = '<svg width="26" height="30" viewBox="0 0 26 30"><defs><radialGradient id="ftpg" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#FF8A80"/><stop offset="55%" stop-color="#E53935"/><stop offset="100%" stop-color="#B71C1C"/></radialGradient></defs><line x1="13" y1="14" x2="13" y2="27" stroke="#9AA0A8" stroke-width="2.4" stroke-linecap="round"/><line x1="12.2" y1="14" x2="12.2" y2="24" stroke="#E6E9EE" stroke-width="0.9" stroke-linecap="round"/><circle cx="13" cy="9" r="8" fill="url(#ftpg)"/><ellipse cx="10" cy="6" rx="2.6" ry="1.7" fill="rgba(255,255,255,.75)"/></svg>';
    } else p.textContent = scelto;
    return p;
  }

  async function rivendica() {
    const s = sb(); if (!s || !myPid()) return alert("Apri prima l'app col tuo profilo.");
    await s.from("fondazione").upsert({ id: "cfg", founder_pid: myPid() });
    await carica(); render();
  }

  async function salvaMembro(id, nome, ruoli, principale, permessi, lavoro, bio, deco) {
    const s = sb(); if (!s) return;
    await s.from("team").upsert({ id: id || ("tm-" + Date.now().toString(36)), nome, ruolo: principale || ruoli[0] || "", ruoli, permessi, lavoro, bio: bio || "", deco: deco || {} });
    await carica(); render();
  }
  async function salvaFounder(patch) {
    const s = sb(); if (!s) return;
    await s.from("fondazione").upsert({ id: "cfg", founder_pid: (cfg || {}).founder_pid || null, data: Object.assign({}, (cfg || {}).data || {}, patch) });
    await carica(); render();
  }
  async function salvaColori(roleColors) {
    const s = sb(); if (!s) return;
    await s.from("fondazione").upsert({ id: "cfg", founder_pid: (cfg || {}).founder_pid || null, data: Object.assign({}, (cfg || {}).data || {}, { roleColors }) });
    await carica(); render();
  }
  const coloreRuolo = (r) => (((cfg || {}).data || {}).roleColors || {})[r] || "#FFF176";
  async function eliminaMembro(id) {
    const s = sb(); if (!s) return;
    await s.from("team").delete().eq("id", id);
    await carica(); render();
  }

  async function diagnosi(box) {
    box.textContent = "Diagnosi in corso…";
    const s = sb(); const righe = [];
    if (!s) { box.textContent = "Cloud assente"; return; }
    const conta = async (tab) => { try { const r = await s.from(tab).select("id"); return r.error ? "err: " + r.error.message : (r.data || []).length; } catch (e) { return "err"; } };
    righe.push("📊 Andamento — gruppi: " + (await conta("groups")) + " · contenuti: " + (await conta("items")) + " · chat private: " + (await conta("dms")) + " · team: " + (await conta("team")));
    try { const w = await s.from("fondazione").upsert({ id: "diag-test", data: { t: Date.now() } }); righe.push("✍️ Scrittura: " + (w.error ? "ERRORE " + w.error.message : "ok ✔")); if (!w.error) await s.from("fondazione").delete().eq("id", "diag-test"); } catch (e) { righe.push("✍️ Scrittura: ERRORE " + e.message); }
    righe.push("👤 Il tuo pid: " + (myPid() || "—"));
    box.innerHTML = ""; righe.forEach((r) => box.appendChild(el("p", null, r)));
  }

  function render() {
    let ovl = document.getElementById("ftOvl");
    if (!aperto) { if (ovl) ovl.remove(); return; }
    if (ovl) ovl.remove();
    ovl = el("div", "ftOvl"); ovl.id = "ftOvl";
    const head = el("div", "ftHead");
    const back = el("button", "ftBack", "‹"); back.onclick = () => { aperto = false; render(); };
    head.appendChild(back); head.appendChild(el("b", null, "👑 Founder Team"));
    ovl.appendChild(head);

    const fond = el("div", "ftCard");
    if (cfg && cfg.founder_pid) {
      fond.appendChild(el("span", "ftFounderBadge", "👑 Founder & Solo Developer"));
      fond.appendChild(el("p", "ftHint", sonoFounder() ? "Sei tu. Controllo assoluto attivo su questo profilo." : "L'app è creata e diretta dal Founder."));
    } else {
      fond.appendChild(el("h4", null, "Titolo di Founder non ancora rivendicato"));
      const b = el("button", "ftGo", "👑 Rivendica (una sola volta, per sempre)"); b.onclick = rivendica;
      fond.appendChild(b);
    }
    ovl.appendChild(fond);

    ovl.classList.add("sughero");
    if (cfg && cfg.founder_pid) ovl.appendChild(el("p", "ftSez", "— Founder —"));
    const boardF = el("div", "ftBoard");
    if (cfg && cfg.founder_pid) {
      const fd = (cfg || {}).data || {};
      const fNome = fd.founderName || "Filippo Fagone";
      const fBio = fd.founderBio || "Creatore e unico sviluppatore di Post-It. 👑";
      const fLav = fd.founderLavoro || "Creatore e unico sviluppatore di Post-It.";
      const fPin = fd.founderPin || "classic";
      const fw = el("div", "ftWrap");
      fw.style.rotate = "-2deg";
      fw.style.cursor = "pointer";
      fw.onclick = () => scheda({ nome: fNome, ruolo: "Founder & Solo Developer", ruoli: ["Founder & Solo Developer"], bio: fBio, lavoro: fLav, deco: { pin: fPin }, scuro: true });
      fw.appendChild(pinDi({ pin: fPin }));
      const fc = el("div", "ftNote scuro");
      if (fPin === "classic") fc.appendChild(el("span", "ftHole"));
      fc.appendChild(el("h4", null, fNome));
      fc.appendChild(el("span", "ftPill main", "Founder & Solo Developer"));
      fc.appendChild(el("p", "ftLav", fLav));
      if (sonoFounder()) {
        const az = el("div", "ftAzioni");
        const mod = el("button", "ftGo", "✏️");
        mod.onclick = (ev) => { ev.stopPropagation(); formFounder(ovl, fd); };
        az.appendChild(mod); fc.appendChild(az);
      }
      fw.appendChild(fc);
      boardF.appendChild(fw);
    }
    ovl.appendChild(boardF);
    ovl.appendChild(el("p", "ftSez", "— Helpers —"));
    const board = el("div", "ftBoard");
    if (!team.length) board.appendChild(el("p", "ftHint", "La bacheca aspetta i primi helper 📌"));
    team.forEach((m, ix) => {
      const ruoli = (m.ruoli && m.ruoli.length ? m.ruoli : [m.ruolo]).filter(Boolean);
      const principale = m.ruolo || ruoli[0] || "";
      const w = el("div", "ftWrap");
      w.style.rotate = ((ix % 5) - 2) * 1.6 + "deg";
      w.style.cursor = "pointer";
      w.appendChild(pinDi(m.deco));
      w.onclick = () => scheda(m);
      const c = el("div", "ftNote");
      c.style.background = coloreRuolo(principale);
      if (!((m.deco || {}).pin) || (m.deco || {}).pin === "classic") c.appendChild(el("span", "ftHole"));
      c.appendChild(el("h4", null, m.nome));
      if (principale) c.appendChild(el("span", "ftPill main", principale));
      ruoli.filter((r) => r !== principale).forEach((r) => c.appendChild(el("span", "ftPill", r)));
      if (m.lavoro) c.appendChild(el("p", "ftLav", m.lavoro));
      if (sonoFounder()) {
        const az = el("div", "ftAzioni");
        const mod = el("button", "ftGo", "✏️"); mod.onclick = (ev) => { ev.stopPropagation(); formMembro(ovl, m); };
        const del = el("button", "ftDel", "🗑"); del.style.marginLeft = "6px"; del.onclick = (ev) => { ev.stopPropagation(); if (confirm("Rimuovere " + m.nome + "?")) eliminaMembro(m.id); };
        az.append(mod, del); c.appendChild(az);
      }
      w.appendChild(c);
      board.appendChild(w);
    });
    ovl.appendChild(board);

    if (sonoFounder()) {
      const add = el("button", "ftGo", "➕ Aggiungi membro"); add.onclick = () => formMembro(ovl, null);
      ovl.appendChild(add);
      const dTit = el("div", "ftCard");
      dTit.appendChild(el("h4", null, "🩺 Diagnostica & andamento (solo Founder)"));
      const box = el("div", "ftDiag"); box.appendChild(el("p", "ftHint", "Tocca per eseguire."));
      const run = el("button", "ftGo", "Esegui diagnosi"); run.onclick = () => diagnosi(box);
      dTit.append(run, box);
      ovl.appendChild(dTit);
    }
    document.body.appendChild(ovl);
  }

  function scheda(m) {
    const ruoli = (m.ruoli && m.ruoli.length ? m.ruoli : [m.ruolo]).filter(Boolean);
    const principale = m.ruolo || ruoli[0] || "";
    const ov = el("div", "ftScheda");
    ov.onclick = (ev) => { if (ev.target === ov) ov.remove(); };
    const wsk = el("div"); wsk.style.position = "relative"; wsk.style.rotate = "-1.5deg";
    const n = el("div", "ftSchedaNote" + (m.scuro ? " scuro" : ""));
    n.style.rotate = "0deg";
    n.style.background = m.scuro ? "#2A2620" : coloreRuolo(principale);
    wsk.appendChild(pinDi(m.deco));
    if (!((m.deco || {}).pin) || (m.deco || {}).pin === "classic") n.appendChild(el("span", "ftHole"));
    n.appendChild(el("h3", null, m.nome));
    if (principale) n.appendChild(el("span", "ftPill main", principale));
    ruoli.filter((r) => r !== principale).forEach((r) => n.appendChild(el("span", "ftPill", r)));
    n.appendChild(el("p", "ftBio", m.bio || "Nessuna biografia ancora ✍️"));
    if (m.lavoro) n.appendChild(el("p", "ftLav", "Lavoro svolto: " + m.lavoro));
    const x = el("button", "ftChiudi", "Chiudi");
    x.onclick = () => ov.remove();
    n.appendChild(x);
    wsk.appendChild(n);
    ov.appendChild(wsk);
    document.body.appendChild(ov);
  }

  function formFounder(ovl, fd) {
    const f = el("div", "ftCard");
    f.appendChild(el("h4", null, "Il tuo profilo da Founder"));
    const nome = el("input", "ftInp"); nome.placeholder = "Nome e cognome"; nome.value = fd.founderName || "Filippo Fagone";
    const bio = el("textarea", "ftTa"); bio.placeholder = "Biografia…"; bio.value = fd.founderBio || "";
    const lav = el("textarea", "ftTa"); lav.placeholder = "Lavoro svolto…"; lav.value = fd.founderLavoro || "";
    let pinScelto = fd.founderPin || "classic";
    const pinWrap = pinPicker(pinScelto, (v) => (pinScelto = v));
    const ok = el("button", "ftGo", "Salva ✔");
    ok.onclick = () => salvaFounder({ founderName: nome.value.trim() || "Filippo Fagone", founderBio: bio.value.trim(), founderLavoro: lav.value.trim(), founderPin: pinScelto });
    f.append(nome, bio, lav, pinWrap, ok);
    ovl.appendChild(f); f.scrollIntoView({ behavior: "smooth" });
  }

  function formMembro(ovl, m) {
    const f = el("div", "ftCard");
    f.appendChild(el("h4", null, m ? "Modifica membro" : "Nuovo membro"));
    const nome = el("input", "ftInp"); nome.placeholder = "Nome e cognome"; nome.value = m ? m.nome : "";
    const rc = Object.assign({}, ((cfg || {}).data || {}).roleColors || {});
    let scelti = new Set(m && m.ruoli && m.ruoli.length ? m.ruoli : m && m.ruolo ? [m.ruolo] : []);
    let principale = m ? m.ruolo || "" : "";
    const rwrap = el("div");
    rwrap.appendChild(el("p", "ftHint", "Ruoli (☑) · stellina = principale · pallino = colore del ruolo"));
    const ridisegna = () => {
      rwrap.querySelectorAll(".ftRiga").forEach((x) => x.remove());
      RUOLI.forEach((r) => {
        const riga = el("label", "ftChk ftRiga");
        const c = el("input"); c.type = "checkbox"; c.checked = scelti.has(r);
        c.onchange = () => { c.checked ? scelti.add(r) : (scelti.delete(r), principale === r && (principale = "")); ridisegna(); };
        const st = el("button", "ftStar" + (principale === r ? " on" : ""), "★"); st.type = "button";
        st.onclick = () => { if (scelti.has(r)) { principale = principale === r ? "" : r; ridisegna(); } };
        const dot = el("i", "ftDot"); dot.style.background = rc[r] || "#FFF176";
        dot.onclick = (ev) => { ev.preventDefault(); const i2 = PALETTE.indexOf(rc[r] || "#FFF176"); rc[r] = PALETTE[(i2 + 1) % PALETTE.length]; ridisegna(); };
        riga.append(c, st, dot, document.createTextNode(" " + r));
        rwrap.appendChild(riga);
      });
    };
    ridisegna();
    const perms = {}; const wrap = el("div");
    wrap.appendChild(el("p", "ftHint", "Permessi"));
    PERMESSI.forEach(([k, lab]) => {
      const r = el("label", "ftChk"); const c = el("input"); c.type = "checkbox"; c.checked = !!(m && m.permessi && m.permessi[k]);
      c.onchange = () => (perms[k] = c.checked); perms[k] = c.checked;
      r.append(c, document.createTextNode(lab)); wrap.appendChild(r);
    });
    const lav = el("textarea", "ftTa"); lav.placeholder = "Lavoro svolto…"; lav.value = m ? m.lavoro || "" : "";
    const bio = el("textarea", "ftTa"); bio.placeholder = "Biografia (la vedranno tutti)…"; bio.value = m ? m.bio || "" : "";
    let pinScelto = (m && m.deco && m.deco.pin) || "classic";
    const pinWrap = pinPicker(pinScelto, (v) => (pinScelto = v));
    const ok = el("button", "ftGo", "Salva ✔");
    ok.onclick = async () => {
      if (!nome.value.trim() || !scelti.size) return;
      await salvaColori(rc);
      salvaMembro(m && m.id, nome.value.trim(), [...scelti], principale || [...scelti][0], perms, lav.value.trim(), bio.value.trim(), { pin: pinScelto });
    };
    f.append(nome, rwrap, wrap, lav, bio, pinWrap, ok);
    ovl.appendChild(f); f.scrollIntoView({ behavior: "smooth" });
  }

  function aggancioHome() {
    if (document.getElementById("ftEntra")) return;
    const bottoni = [...document.querySelectorAll("button")];
    const rif = bottoni.find((b) => /Crea gruppo/.test(b.textContent));
    if (!rif) return;
    const host = rif.closest(".loginBox") || rif.parentElement;
    if (!host || host.querySelector("#ftEntra")) return;
    const b = el("button", "ftBtn", "👑 Conosci il Founder Team");
    b.id = "ftEntra";
    b.onclick = async () => { await carica(); aperto = true; render(); };
    host.appendChild(b);
  }
  new MutationObserver(aggancioHome).observe(document.documentElement, { childList: true, subtree: true });
  setInterval(aggancioHome, 1500);
  carica();
})();
