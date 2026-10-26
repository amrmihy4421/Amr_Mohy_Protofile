(() => {
  const data = window.portfolioData;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const translations = window.portfolioTranslations || { en: {}, ar: {} };
  const root = document.documentElement;
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const allowedLanguages = ["en", "ar"];
  let currentLanguage = allowedLanguages.includes(root.lang) ? root.lang : "en";
  let currentTheme = root.dataset.theme === "light" ? "light" : "dark";
  const languageLabel = language => language === "ar" ? "AR" : "EN";
  const localized = value => currentLanguage === "ar" ? (translations.ar[value] || value) : (translations.en[value] || value);
  const setPreference = (key, value) => {
    try { window.localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ }
  };

  const applyLanguage = language => {
    currentLanguage = allowedLanguages.includes(language) ? language : "en";
    root.lang = currentLanguage;
    root.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    const dictionary = translations[currentLanguage] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      if (!textSources.has(textNode)) textSources.set(textNode, textNode.nodeValue);
      const source = textSources.get(textNode);
      const trimmed = source.trim();
      if (!trimmed) continue;
      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      textNode.nodeValue = `${leading}${dictionary[trimmed] || trimmed}${trailing}`;
    }
    document.querySelectorAll("[data-translation-key]").forEach(element => {
      element.textContent = localized(element.dataset.translationKey);
    });
    document.body.querySelectorAll("[aria-label], [alt], [placeholder], [title]").forEach(element => {
      let sources = attributeSources.get(element);
      if (!sources) {
        sources = {};
        attributeSources.set(element, sources);
      }
      ["aria-label", "alt", "placeholder", "title"].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in sources)) sources[attribute] = element.getAttribute(attribute);
        const source = sources[attribute];
        element.setAttribute(attribute, dictionary[source] || source);
      });
    });
    document.title = localized("Amr Mohy — Full Stack Developer");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = localized("Amr Mohy is a full stack developer building complete web applications for ambitious businesses, from interface and backend to launch.");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = localized("One developer. The complete journey. From idea to launch.");
    const languageCode = document.querySelector("#current-language");
    if (languageCode) languageCode.textContent = languageLabel(currentLanguage);
    const languageToggle = document.querySelector("#language-toggle");
    if (languageToggle) {
      const label = localized(currentLanguage === "en" ? "Switch language to Arabic" : "Switch language to English");
      languageToggle.setAttribute("aria-label", label);
      languageToggle.title = label;
    }
    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-label", localized(open ? "Close navigation menu" : "Open navigation menu"));
    }
    updateThemeControl();
  };

  const updateThemeControl = () => {
    const themeButton = document.querySelector("#theme-toggle");
    if (!themeButton) return;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const label = localized(`Switch to ${nextTheme} mode`);
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
    const sun = themeButton.querySelector(".theme-icon-sun");
    const moon = themeButton.querySelector(".theme-icon-moon");
    if (sun) sun.hidden = currentTheme !== "light";
    if (moon) moon.hidden = currentTheme !== "dark";
  };

  const applyTheme = theme => {
    currentTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = currentTheme;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = currentTheme === "dark" ? "#11130f" : "#f5f5ef";
    updateThemeControl();
  };

  const applyConfiguredDetails = () => {
    if (!data) return;
    const { personal, education } = data;
    document.querySelectorAll("[data-person-name]").forEach(node => { node.textContent = personal.name.toUpperCase(); });
    document.querySelectorAll("[data-person-location]").forEach(node => { node.textContent = personal.location; });
    document.querySelectorAll("[data-contact-link]").forEach(link => {
      const key = link.dataset.contactLink;
      if (key === "email") link.href = `mailto:${personal.email}`;
      else if (personal[key]) link.href = personal[key];
    });
    document.querySelectorAll("[data-contact-value]").forEach(node => {
      node.textContent = personal[node.dataset.contactValue];
    });
    document.querySelectorAll("[data-education-university]").forEach(node => { node.textContent = education.university; });
    document.querySelectorAll("[data-education-program]").forEach(node => { node.textContent = education.program; });
    document.querySelectorAll("[data-education-start]").forEach(node => { node.textContent = education.startYear; });
    document.querySelectorAll("[data-education-end]").forEach(node => { node.textContent = education.endYear; });
    const portrait = document.querySelector(".portrait");
    if (portrait) {
      portrait.src = personal.portrait;
      portrait.alt = `${personal.name}, ${personal.title}`;
    }
    const preload = document.querySelector('link[rel="preload"][as="image"]');
    if (preload) preload.href = personal.portrait;
    document.title = `${personal.name} — ${personal.title}`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const form = document.querySelector("#contact-form");
    if (form) form.action = `mailto:${personal.email}`;
  };
  applyConfiguredDetails();

  const renderSkills = () => {
    const root = document.querySelector("#skill-groups");
    if (!root || !data) return;
    root.innerHTML = data.skills.map((group, groupIndex) => `
      <article class="skill-group reveal" style="--reveal-order:${groupIndex}">
        <span class="skill-number">${group.number}</span>
        <h3>${group.title}</h3>
        <ul>${group.items.map((item, itemIndex) => `<li style="--chip-order:${itemIndex}">${item}</li>`).join("")}</ul>
        <span class="skill-plus" aria-hidden="true">↗</span>
      </article>`).join("");
  };

  const renderProjects = () => {
    const root = document.querySelector("#project-list");
    if (!root || !data) return;
    root.innerHTML = data.projects.map((project, index) => `
      <article class="project-case reveal ${index % 2 ? "project-reverse" : ""}" style="--reveal-order:${index}">
        <div class="project-visual ${project.image ? "has-image" : ""}">
          ${project.image ? `<a class="project-image-link" href="${project.image}" target="_blank" rel="noopener noreferrer" aria-label="Open image: ${project.imageAlt}"><img src="${project.image}" alt="${project.imageAlt}" loading="lazy"></a>` : `
            <div class="visual-placeholder" aria-label="${project.imagePlaceholder}">
              <span class="placeholder-label">PROJECT IMAGE PLACEHOLDER</span>
              <div class="placeholder-art"><span>${project.number}</span><strong>${project.title}</strong><small>${project.type}</small><i aria-hidden="true">＋</i></div>
              <p>${project.imagePlaceholder}</p>
            </div>`}
          <span class="project-visual-index">${project.number} / PROJECT</span>
        </div>
        <div class="project-copy">
          <div class="project-overline"><span>${project.number} / 0${data.projects.length}</span><span>${project.type}</span></div>
          <h3>${project.title}</h3>
          <p class="project-role">${project.role}</p>
          <p class="project-description">${project.description}</p>
          ${project.challenges?.length || project.solutions?.length || project.result ? `<details class="case-study">
            <summary>Inside the project <span aria-hidden="true">＋</span></summary>
            <div class="case-study-content">
              <div><h4>Challenges</h4><ul>${(project.challenges || []).map(item => `<li>${item}</li>`).join("")}</ul></div>
              <div><h4>Approach</h4><ul>${(project.solutions || []).map(item => `<li>${item}</li>`).join("")}</ul></div>
              <p class="case-result">${project.result}</p>
            </div>
          </details>` : ""}
          <div class="project-actions">${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-live">View Live Project <span aria-hidden="true">↗</span></a>` : ""}<span class="project-role-label">${project.role.split(" · ")[0]}</span></div>
        </div>
      </article>`).join("");
  };

  const renderServices = () => {
    const root = document.querySelector("#service-list");
    if (!root || !data) return;
    root.innerHTML = data.services.map((service, index) => `
      <article class="service-row reveal" style="--reveal-order:${index}">
        <span class="service-number">${service.number}</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <span class="service-keywords">${service.keywords}</span>
        <span class="service-arrow" aria-hidden="true">↗</span>
      </article>`).join("");
  };

  const renderExperienceEntries = () => {
    const root = document.querySelector("#experience-list");
    if (!root || !data?.experienceEntries?.length) return;
    root.replaceChildren();

    data.experienceEntries.forEach((item, index) => {
      const entry = document.createElement("article");
      entry.className = "experience-entry reveal";
      entry.style.setProperty("--reveal-order", index);
      entry.setAttribute("aria-labelledby", `experience-entry-title-${index}`);

      const rail = document.createElement("div");
      rail.className = "experience-entry-rail";
      const number = document.createElement("span");
      number.className = "experience-entry-number";
      number.textContent = item.number || String(index + 1).padStart(2, "0");
      const marker = document.createElement("span");
      marker.className = "experience-entry-marker";
      marker.setAttribute("aria-hidden", "true");
      rail.append(number, marker);

      const body = document.createElement("div");
      body.className = "experience-entry-body";
      const topLine = document.createElement("div");
      topLine.className = "experience-entry-topline";
      const category = document.createElement("span");
      category.className = "experience-category";
      category.textContent = item.category;
      topLine.append(category);
      if (item.status) {
        const status = document.createElement("span");
        status.className = "experience-status";
        status.textContent = item.status;
        topLine.append(status);
      }

      const title = document.createElement("h3");
      title.id = `experience-entry-title-${index}`;
      title.textContent = item.title;
      const organization = document.createElement("p");
      organization.className = "experience-organization";
      organization.textContent = item.organization;
      const meta = document.createElement("div");
      meta.className = "experience-entry-meta";
      if (item.subtitle) {
        const subtitle = document.createElement("span");
        subtitle.textContent = item.subtitle;
        meta.append(subtitle);
      }
      if (item.period) {
        const period = document.createElement("span");
        period.textContent = item.period;
        meta.append(period);
      }
      const description = document.createElement("p");
      description.className = "experience-entry-description";
      description.textContent = item.description;
      body.append(topLine, title, organization, meta, description);

      if (Array.isArray(item.highlights) && item.highlights.length) {
        const details = document.createElement("details");
        details.className = "experience-entry-details";
        const summary = document.createElement("summary");
        summary.textContent = item.detailLabel || "Highlights";
        const toggle = document.createElement("span");
        toggle.setAttribute("aria-hidden", "true");
        toggle.textContent = "＋";
        summary.append(toggle);
        const list = document.createElement("ul");
        item.highlights.forEach(highlight => {
          const point = document.createElement("li");
          point.textContent = highlight;
          list.append(point);
        });
        details.append(summary, list);
        body.append(details);
      }

      if (item.certificate) {
        const certificate = document.createElement("a");
        certificate.className = "experience-certificate";
        certificate.href = item.certificate;
        certificate.target = "_blank";
        certificate.rel = "noopener noreferrer";
        certificate.setAttribute("aria-label", `View certificate: ${item.certificateAlt || item.title}`);
        const image = document.createElement("img");
        image.src = item.certificate;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        const label = document.createElement("span");
        label.textContent = "View certificate ↗";
        certificate.append(image, label);
        body.append(certificate);
      }

      if (Array.isArray(item.technologies) && item.technologies.length) {
        const tags = document.createElement("div");
        tags.className = "experience-tags";
        tags.setAttribute("aria-label", "Relevant technologies and skills");
        item.technologies.forEach(technology => {
          const tag = document.createElement("span");
          tag.textContent = technology;
          tags.append(tag);
        });
        body.append(tags);
      }

      entry.append(rail, body);
      root.append(entry);
    });
  };

  renderSkills();
  renderProjects();
  renderServices();
  renderExperienceEntries();
  applyLanguage(currentLanguage);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll("a[data-nav]").forEach(link => link.classList.toggle("is-active", link.dataset.nav === entry.target.id));
      }
    });
  }, { rootMargin: "-32% 0px -58% 0px", threshold: 0 });

  document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const languageToggle = document.querySelector("#language-toggle");
  languageToggle?.addEventListener("click", () => {
    const nextLanguage = currentLanguage === "en" ? "ar" : "en";
    setPreference("portfolio-language", nextLanguage);
    applyLanguage(nextLanguage);
  });
  const themeToggle = document.querySelector("#theme-toggle");
  themeToggle?.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    setPreference("portfolio-theme", currentTheme);
    applyTheme(currentTheme);
  });
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", localized("Open navigation menu"));
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", localized(open ? "Close navigation menu" : "Open navigation menu"));
    mobileMenu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  });
  mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    closeMenu();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1060) closeMenu(); });

  const progress = document.querySelector("#scroll-progress");
  let scrollTicking = false;
  let previousScrollY = window.scrollY;
  let flightDirection = 1;
  const updateScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
        updateFlightPath();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  const flightSvg = document.querySelector("#flight-path");
  const planeSvg = document.querySelector("#flight-plane");
  const trail = document.querySelector("#flight-trail");
  const planePosition = planeSvg?.querySelector("#paper-plane-position");
  const plane = planeSvg?.querySelector("#paper-plane");
  const about = document.querySelector("#about");
  const aboutContent = about?.querySelector(".about-content");
  const waypoints = about ? [...about.querySelectorAll("[data-flight-waypoint]")] : [];
  let trailLength = 0;
  let waypointDistances = [];
  let waypointY = [];
  let rebuildFrame = 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const smoothstep = value => value * value * (3 - 2 * value);
  function rebuildFlightPath() {
    if (!flightSvg || !planeSvg || !trail || !planePosition || !plane || !about || !waypoints.length) return;
    const bounds = about.getBoundingClientRect();
    const width = Math.max(1, about.clientWidth);
    const height = Math.max(1, about.clientHeight);
    flightSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    planeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const points = waypoints.map(marker => {
      const rect = marker.getBoundingClientRect();
      return { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top };
    });
    const bend = clamp(width * .018, 8, 20);
    const pathParts = [`M ${points[0].x} ${points[0].y}`];
    waypointDistances = [0];
    let measuredLength = 0;
    points.slice(1).forEach((point, index) => {
      const previous = points[index];
      const dy = Math.max(1, point.y - previous.y);
      const card = waypoints[index].closest(".principle");
      let segment;
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const cardLeft = cardRect.left - bounds.left;
        const cardRight = cardRect.right - bounds.left;
        const cardTop = cardRect.top - bounds.top;
        const cardBottom = cardRect.bottom - bounds.top;
        const orbit = clamp(width * .035, 16, 38);
        const onLeft = previous.x < width / 2;
        const nearX = onLeft ? cardLeft - orbit : cardRight + orbit;
        const farX = onLeft ? cardRight + orbit : cardLeft - orbit;
        const across = farX - nearX;
        const lowerEntryY = cardBottom + orbit * .35;
        const loopY = cardBottom + orbit;
        const gapAfterLoop = Math.max(1, point.y - loopY);
        const controlOneY = cardTop + (cardBottom - cardTop) * .7;
        segment = [
          `C ${nearX} ${controlOneY}, ${nearX - Math.sign(across) * orbit * .35} ${lowerEntryY}, ${nearX} ${lowerEntryY}`,
          `C ${nearX + across * .34} ${lowerEntryY}, ${farX} ${loopY - orbit * .35}, ${farX} ${loopY}`,
          `C ${farX} ${loopY + gapAfterLoop * .35}, ${point.x} ${point.y - gapAfterLoop * .35}, ${point.x} ${point.y}`
        ].join(" ");
      } else {
        const side = index % 2 ? -1 : 1;
        segment = `C ${previous.x + bend * side} ${previous.y + dy * .34}, ${point.x + bend * side} ${previous.y + dy * .66}, ${point.x} ${point.y}`;
      }
      trail.setAttribute("d", `M ${previous.x} ${previous.y} ${segment}`);
      measuredLength += trail.getTotalLength();
      pathParts.push(segment);
      waypointDistances.push(measuredLength);
    });
    trail.setAttribute("d", pathParts.join(" "));
    trailLength = trail.getTotalLength();
    waypointDistances[waypointDistances.length - 1] = trailLength;
    waypointY = points.map(point => point.y);
    trail.style.strokeDasharray = `${trailLength} ${trailLength}`;
    trail.style.strokeDashoffset = String(trailLength);
    updateFlightPath();
  }
  function scheduleFlightRebuild() {
    if (rebuildFrame) return;
    rebuildFrame = window.requestAnimationFrame(() => {
      rebuildFrame = 0;
      rebuildFlightPath();
    });
  }
  const flightResizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleFlightRebuild);
  if (flightResizeObserver && about && aboutContent) {
    flightResizeObserver.observe(about);
    flightResizeObserver.observe(aboutContent);
    waypoints.forEach(marker => flightResizeObserver.observe(marker));
  }
  window.addEventListener("resize", scheduleFlightRebuild, { passive: true });
  document.fonts?.ready.then(scheduleFlightRebuild);
  const directionObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(records => {
    if (records.some(record => record.attributeName === "dir")) scheduleFlightRebuild();
  });
  directionObserver?.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["dir"] });
  function updateFlightPath() {
    if (!trail || !planePosition || !plane || !about || !trailLength || !waypointY.length) return;
    if (reducedMotion.matches) {
      trail.style.strokeDashoffset = "0";
      const aboutRect = about.getBoundingClientRect();
      const firstMarker = waypoints[0].getBoundingClientRect();
      const x = firstMarker.left + firstMarker.width / 2 - aboutRect.left;
      const y = firstMarker.top + firstMarker.height / 2 - aboutRect.top;
      planePosition.setAttribute("transform", `translate(${x} ${y}) rotate(0)`);
      plane.classList.remove("is-reversed");
      plane.style.opacity = "1";
      return;
    }
    const rect = about.getBoundingClientRect();
    const scanline = window.innerHeight * .6 - rect.top;
    const pauseAt = index => {
      const previousGap = index > 0 ? waypointY[index] - waypointY[index - 1] : Infinity;
      const nextGap = index < waypointY.length - 1 ? waypointY[index + 1] - waypointY[index] : Infinity;
      return clamp(Math.min(previousGap, nextGap) * .16, 18, 52);
    };
    let pointAt = scanline < waypointY[0] ? 0 : trailLength;
    for (let index = 0; index < waypointY.length; index += 1) {
      const halfPause = pauseAt(index) / 2;
      if (scanline >= waypointY[index] - halfPause && scanline <= waypointY[index] + halfPause) {
        pointAt = waypointDistances[index];
        break;
      }
      if (index < waypointY.length - 1 && scanline < waypointY[index + 1] - pauseAt(index + 1) / 2) {
        const start = waypointY[index] + halfPause;
        const end = waypointY[index + 1] - pauseAt(index + 1) / 2;
        const amount = end > start ? clamp((scanline - start) / (end - start), 0, 1) : 1;
        pointAt = waypointDistances[index] + (waypointDistances[index + 1] - waypointDistances[index]) * smoothstep(amount);
        break;
      }
    }
    const point = trail.getPointAtLength(pointAt);
    const before = trail.getPointAtLength(Math.max(0, pointAt - 1));
    const after = trail.getPointAtLength(Math.min(trailLength, pointAt + 1));
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    trail.style.strokeDashoffset = String(trailLength - pointAt);
    planePosition.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
    plane.classList.toggle("is-reversed", flightDirection < 0);
    const withinRoute = scanline >= waypointY[0] - pauseAt(0) / 2 && scanline <= waypointY.at(-1) + pauseAt(waypointY.length - 1) / 2;
    plane.style.opacity = withinRoute ? "1" : "0";
  }
  rebuildFlightPath();
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== previousScrollY) flightDirection = currentScrollY > previousScrollY ? 1 : -1;
    previousScrollY = currentScrollY;
    updateScroll();
  }, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  reducedMotion.addEventListener?.("change", updateScroll);
  updateScroll();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  if (!reducedMotion.matches) {
    document.body.classList.add("js-motion");
    document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach(item => item.classList.add("is-visible"));
  }

  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const subject = `Project inquiry from ${fields.get("Full name")}`;
    const body = [
      `Name: ${fields.get("Full name")}`,
      `Email: ${fields.get("Email")}`,
      `Project type: ${fields.get("Project type")}`,
      `Estimated budget: ${fields.get("Estimated budget") || "Not specified"}`,
      "",
      "Project description:",
      fields.get("Project description")
    ].join("\n");
    if (formStatus) {
      formStatus.dataset.translationKey = "Your email app should open with a draft. Review it and send it from there.";
      formStatus.textContent = localized(formStatus.dataset.translationKey);
    }
    window.location.href = `mailto:${data.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const year = document.querySelector("#copyright-year");
  if (year) year.textContent = new Date().getFullYear();
})();
