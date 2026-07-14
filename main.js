(() => {
  "use strict";
  document.getElementById("year").textContent = new Date().getFullYear();

  /* -- scroll-spy: highlight active section in both navs -- */
  const ids = ["inicio", "marca", "trabalhos", "briefing", "empresa"];
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const setActive = (id) =>
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + id),
    );
  const spy = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  /* -- apple-style reveal on scroll for cards -- */
  const reveal = new IntersectionObserver(
    (es, o) => {
      es.forEach((e, i) => {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (i % 6) * 60 + "ms";
        e.target.classList.add("in");
        o.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  document.querySelectorAll(".card").forEach((c) => reveal.observe(c));

  /* -- briefing form → mailto (no backend) -- */
  document.getElementById("briefing-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = ev.target;
    const pron = f.pronomes.value.trim();
    const body =
      `Oi, Zoey!\n\nNome: ${f.nome.value}` +
      (pron ? `\nPronomes: ${pron}` : ``) +
      `\nEmail: ${f.email.value}\n\nProjeto:\n${f.projeto.value}\n`;
    location.href =
      `mailto:zoey.spessanha@zeetech.io` +
      `?subject=${encodeURIComponent("Briefing de projeto: " + f.nome.value)}` +
      `&body=${encodeURIComponent(body)}`;
  });

  /* -- easter egg: "/" command palette -- */
  const pal = document.getElementById("pal"),
    inp = document.getElementById("pal-in"),
    out = document.getElementById("pal-out"),
    list = document.getElementById("pal-list");
  let sel = 0,
    view = [];

  const go = (id) => {
    closePal();
    document.getElementById(id)?.scrollIntoView();
  };
  const say = (t) => {
    out.textContent = t;
    out.style.display = "block";
    inp.value = "";
    render();
  };

  const cmds = [
    { k: "início", d: "voltar ao topo", run: () => go("inicio") },
    { k: "marca", d: "visão, voz e proposta", run: () => go("marca") },
    { k: "trabalhos", d: "oss e consultoria", run: () => go("trabalhos") },
    { k: "briefing", d: "começar um projeto", run: () => go("briefing") },
    { k: "empresa", d: "contato e dados", run: () => go("empresa") },
    {
      k: "github",
      d: "abrir o github",
      run: () => {
        open("https://github.com/zoedsoupe", "_blank");
        closePal();
      },
    },
    {
      k: "whoami",
      d: "quem tá por trás disso",
      run: () =>
        say(
          "zoedsoupe, engenheira de elixir, she/her. fundei a zeetech e co-apresento o elixir em foco.",
        ),
    },
  ];

  function render() {
    const q = inp.value.trim().toLowerCase();
    view = q ? cmds.filter((c) => c.k.includes(q) || c.d.includes(q)) : cmds;
    if (sel >= view.length) sel = 0;
    list.innerHTML = view
      .map(
        (c, i) =>
          `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><span>/${c.k}</span><span class="d">${c.d}</span></li>`,
      )
      .join("");
  }
  function openPal() {
    pal.classList.add("open");
    inp.value = "";
    out.style.display = "none";
    sel = 0;
    render();
    inp.focus();
  }
  function closePal() {
    pal.classList.remove("open");
  }

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing && !pal.classList.contains("open")) {
      e.preventDefault();
      openPal();
      return;
    }
    if (!pal.classList.contains("open")) return;
    if (e.key === "Escape") closePal();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      sel = (sel + 1) % view.length;
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sel = (sel - 1 + view.length) % view.length;
      render();
    } else if (e.key === "Enter" && view[sel]) view[sel].run();
  });
  inp.addEventListener("input", () => {
    sel = 0;
    render();
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) view[+li.dataset.i].run();
  });
  pal.addEventListener("click", (e) => {
    if (e.target === pal) closePal();
  });
})();
