/* ═══ POST-IT · MODULO FOUNDER (pezzo 1) ═══ */
(function () {
  const RUOLI = ["Alpha Tester", "Beta-Tester", "Bug Finder", "Customer Support", "Head of Customer Support", "App Security", "Head of App Security", "Announcer", "Head of Announcements"];
  const PERMESSI = [["diag", "Diagnosi Database"], ["bug", "Bug Finder"], ["review", "App Review"], ["ann", "Fai un annuncio"]];
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

  async function rivendica() {
    const s = sb(); if (!s || !myPid()) return alert("Apri prima l'app col tuo profilo.");
    await s.from("fondazione").upsert({ id: "cfg", founder_pid: myPid() });
    await carica(); render();
  }

  async function salvaMembro(id, nome, ruolo, permessi, lavoro) {
    const s = sb(); if (!s) return;
    await s.from("team").upsert({ id: id || ("tm-" + Date.now().toString(36)), nome, ruolo, permessi, lavoro });
    await carica(); render();
  }
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

    const lista = el("div");
    lista.appendChild(el("h4", null, "La squadra"));
    if (!team.length) lista.appendChild(el("p", "ftHint", "Nessun membro ancora."));
    team.forEach((m) => {
      const c = el("div", "ftCard");
      c.appendChild(el("h4", null, m.nome));
      c.appendChild(el("span", "ftRole", m.ruolo || "—"));
      if (m.lavoro) c.appendChild(el("p", "ftHint", "Lavoro svolto: " + m.lavoro));
      if (sonoFounder()) {
        const attivi = PERMESSI.filter(([k]) => (m.permessi || {})[k]).map(([, l]) => l).join(", ");
        c.appendChild(el("p", "ftHint", "Permessi: " + (attivi || "nessuno")));
        const mod = el("button", "ftGo", "✏️ Modifica"); mod.onclick = () => formMembro(ovl, m);
        const del = el("button", "ftDel", "🗑 Rimuovi"); del.style.marginLeft = "8px"; del.onclick = () => { if (confirm("Rimuovere " + m.nome + "?")) eliminaMembro(m.id); };
        c.appendChild(el("div")).append(mod, del);
      }
      lista.appendChild(c);
    });
    ovl.appendChild(lista);

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

  function formMembro(ovl, m) {
    const f = el("div", "ftCard");
    f.appendChild(el("h4", null, m ? "Modifica membro" : "Nuovo membro"));
    const nome = el("input", "ftInp"); nome.placeholder = "Nome e cognome"; nome.value = m ? m.nome : "";
    const sel = el("select", "ftSel");
    RUOLI.forEach((r) => { const o = el("option", null, r); o.value = r; sel.appendChild(o); });
    if (m && m.ruolo) sel.value = m.ruolo;
    const perms = {}; const wrap = el("div");
    PERMESSI.forEach(([k, lab]) => {
      const r = el("label", "ftChk"); const c = el("input"); c.type = "checkbox"; c.checked = !!(m && m.permessi && m.permessi[k]);
      c.onchange = () => (perms[k] = c.checked); perms[k] = c.checked;
      r.append(c, document.createTextNode(lab)); wrap.appendChild(r);
    });
    const lav = el("textarea", "ftTa"); lav.placeholder = "Lavoro svolto…"; lav.value = m ? m.lavoro || "" : "";
    const ok = el("button", "ftGo", "Salva ✔");
    ok.onclick = () => { if (nome.value.trim()) salvaMembro(m && m.id, nome.value.trim(), sel.value, perms, lav.value.trim()); };
    f.append(nome, sel, wrap, lav, ok);
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
