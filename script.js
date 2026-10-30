/**
 * Krisha Patel — Portfolio Interactions & Analytics Engine
 * Vanilla JavaScript • Zero Dependencies • Fast & Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initRevealAnimations();
  initTypingEffect();
  initSkillFiltering();
  initProjectFiltering();
  initQueryPlayground();
  initClipboardHandlers();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLER (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('krisha_portfolio_theme');
  
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('krisha_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav item
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));
}

/* --------------------------------------------------------------------------
   3. REVEAL ANIMATIONS ON SCROLL
   -------------------------------------------------------------------------- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. DYNAMIC HERO ROTATING TAGLINE
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const taglines = [
    "Predictive ML & Big Data Analytics",
    "SQL Query Optimization & Data Modeling",
    "Power BI Dashboards & Executive Storytelling",
    "Transforming Raw Numbers into High-Impact Decisions"
  ];

  let tagIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 70;

  function type() {
    const currentText = taglines[tagIndex];
    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      speed = 35;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      speed = 70;
    }

    if (!isDeleting && charIndex === currentText.length) {
      speed = 2200; // Pause at full string
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      tagIndex = (tagIndex + 1) % taglines.length;
      speed = 400; // Pause before next word
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. SKILLS FILTERING
   -------------------------------------------------------------------------- */
function initSkillFiltering() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!tabBtns.length || !skillCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PROJECTS FILTERING
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = card.classList.contains('featured-spotlight') ? 'grid' : 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE DATA STUDIO / SQL QUERY PLAYGROUND
   -------------------------------------------------------------------------- */
function initQueryPlayground() {
  const presetBtns = document.querySelectorAll('.preset-btn');
  const codeBox = document.getElementById('playgroundSqlBox');
  const resultsTableBody = document.getElementById('playgroundResultsBody');
  const resultsTableHead = document.getElementById('playgroundResultsHead');
  const queryTimingEl = document.getElementById('queryTiming');
  const runQueryBtn = document.getElementById('runQueryBtn');

  if (!codeBox || !resultsTableBody) return;

  // Preset queries with synthetic sample datasets
  const presets = {
    zomato: {
      sql: `<span class="sql-kw">SELECT</span> city, <span class="sql-fn">COUNT</span>(order_id) <span class="sql-kw">AS</span> total_orders,
       <span class="sql-fn">ROUND</span>(<span class="sql-fn">AVG</span>(order_val), <span class="sql-num">2</span>) <span class="sql-kw">AS</span> avg_basket_inr,
       <span class="sql-fn">ROUND</span>(<span class="sql-fn">AVG</span>(rating), <span class="sql-num">1</span>) <span class="sql-kw">AS</span> satisfaction_idx
<span class="sql-kw">FROM</span> zomato_orders
<span class="sql-kw">GROUP BY</span> city
<span class="sql-kw">ORDER BY</span> avg_basket_inr <span class="sql-kw">DESC</span>
<span class="sql-kw">LIMIT</span> <span class="sql-num">4</span>;`,
      headers: ['City', 'Total Orders', 'Avg Basket (INR)', 'Satisfaction'],
      rows: [
        ['Mumbai (Metro)', '42,150', '₹840.50', '4.4 / 5.0'],
        ['Bengaluru (IT)', '38,900', '₹792.20', '4.3 / 5.0'],
        ['New Delhi', '34,220', '₹765.00', '4.2 / 5.0'],
        ['Ahmedabad', '19,840', '₹610.80', '4.5 / 5.0']
      ],
      timing: '9.4 ms • 150,000 index scans simulated'
    },
    keryar: {
      sql: `<span class="sql-kw">SELECT</span> stage_name, lead_count,
       <span class="sql-fn">CONCAT</span>(<span class="sql-fn">ROUND</span>(conversion_rate * <span class="sql-num">100</span>, <span class="sql-num">1</span>), <span class="sql-str">'%'</span>) <span class="sql-kw">AS</span> conversion_pct,
       avg_cycle_days
<span class="sql-kw">FROM</span> crm_pipeline_funnel
<span class="sql-kw">ORDER BY</span> stage_order <span class="sql-kw">ASC</span>;`,
      headers: ['Pipeline Stage', 'Leads Count', 'Conversion Rate', 'Cycle Velocity'],
      rows: [
        ['1. Inbound Qualification', '1,420', '100.0%', '1.2 Days'],
        ['2. Technical Scoping', '940', '66.2%', '4.5 Days'],
        ['3. Commercial Proposal', '580', '40.8%', '8.3 Days'],
        ['4. Closed Contract', '403', '28.4%', '14.2 Days']
      ],
      timing: '6.1 ms • Power BI DAX & CRM relational model'
    },
    agrovision: {
      sql: `<span class="sql-kw">SELECT</span> zone_code, crop_type, moisture_pct,
       disease_risk_prob, primary_ai_action
<span class="sql-kw">FROM</span> sensor_telemetry
<span class="sql-kw">WHERE</span> disease_risk_prob &gt; <span class="sql-num">0.25</span>
<span class="sql-kw">ORDER BY</span> disease_risk_prob <span class="sql-kw">DESC</span>;`,
      headers: ['Zone', 'Crop Species', 'Soil Moisture', 'Disease Risk', 'AI Recommendation'],
      rows: [
        ['Zone-B', 'Cotton', '48% (Low)', '0.68 (High)', 'Increase irrigation + fungicide alert'],
        ['Zone-D', 'Wheat', '56% (Normal)', '0.34 (Moderate)', 'Check leaf spots in 48 hours'],
        ['Zone-A', 'Paddy', '72% (Optimal)', '0.28 (Low)', 'Maintain current schedule']
      ],
      timing: '4.8 ms • Agrovision real-time inference'
    }
  };

  let activePresetKey = 'zomato';

  function renderTable(presetKey) {
    const data = presets[presetKey];
    codeBox.innerHTML = data.sql;

    // Render Table Header
    resultsTableHead.innerHTML = `<tr>${data.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    // Render Table Rows
    resultsTableBody.innerHTML = data.rows.map(row => {
      return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
    }).join('');

    queryTimingEl.textContent = `⚡ Executed in ${data.timing}`;
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePresetKey = btn.getAttribute('data-preset');
      renderTable(activePresetKey);
    });
  });

  if (runQueryBtn) {
    runQueryBtn.addEventListener('click', () => {
      runQueryBtn.textContent = 'Processing...';
      resultsTableBody.style.opacity = '0.3';
      setTimeout(() => {
        renderTable(activePresetKey);
        resultsTableBody.style.opacity = '1';
        runQueryBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Run Query
        `;
        showToast('Query refreshed successfully!');
      }, 350);
    });
  }

  // Initial render
  renderTable('zomato');
}

/* --------------------------------------------------------------------------
   8. CLIPBOARD COPY HANDLER
   -------------------------------------------------------------------------- */
function initClipboardHandlers() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#10b981';
        showToast(`Copied to clipboard: "${textToCopy}"`);

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        showToast('Unable to copy automatically.');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const statusMsg = document.getElementById('formStatusMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      if (statusMsg) {
        statusMsg.className = 'form-status-msg error';
        statusMsg.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    // Allow standard FormSubmit POST to execute smoothly
    if (statusMsg) {
      statusMsg.className = 'form-status-msg success';
      statusMsg.textContent = 'Sending your message securely to Krisha...';
    }
  });
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
