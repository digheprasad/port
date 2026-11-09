function renderProjects(projects) {
  const grid = document.getElementById("projectGrid");
  if (projects.length === 0) {
    const githubUrl = portfolioData.social.find((link) => link.label === "GitHub")?.url;
    grid.innerHTML = `
      <div class="col-12">
        <div class="project-empty">
          <span class="project-empty-mark" aria-hidden="true">✳</span>
          <div>
            <h3>Projects are in progress.</h3>
            <p>I’m learning, experimenting, and working toward projects I can share here. In the meantime, find me on <a href="${githubUrl}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>.</p>
          </div>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = projects.map((project) => `
    <div class="col-md-6 col-lg-4">
      <a class="project-card" href="${project.url}" ${project.url === "#" ? 'aria-label="' + project.name + ' project (add project link in portfolio-data.js)"' : 'target="_blank" rel="noopener noreferrer"'}>
        <div class="project-visual ${project.theme}">
          <span class="project-index">${project.number} / 06</span>
          <span class="project-glyph" aria-hidden="true">${project.glyph}</span>
        </div>
        <div class="project-info">
          <div class="project-meta"><span>${project.type}</span><span>↗</span></div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
        </div>
      </a>
    </div>`).join("");
}

function renderSkills(skills) {
  document.getElementById("skillsList").innerHTML = skills
    .map((skill) => `<span class="skill-chip">${skill}</span>`).join("");
}

function renderExperience(roles) {
  document.getElementById("experienceList").innerHTML = roles.map((item) => `
    <article class="timeline-item">
      <div class="timeline-date">${item.dates}</div>
      <div><div class="timeline-role">${item.role}</div><div class="timeline-company">${item.company}</div></div>
      <div class="timeline-detail">${item.detail}</div>
    </article>`).join("");
}

function renderBio(paragraphs) {
  document.getElementById("bioContent").innerHTML = paragraphs
    .map((paragraph, index) => `<p${index === 0 ? ' class="about-lead"' : ""}>${paragraph}</p>`)
    .join("");
}

function renderSocialLinks(links) {
  document.getElementById("socialLinks").innerHTML = links
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label} ↗</a>`).join("");
}

function initializePortfolio() {
  renderProjects(portfolioData.projects);
  renderSkills(portfolioData.skills);
  renderExperience(portfolioData.experience);
  renderBio(portfolioData.bio);
  renderSocialLinks(portfolioData.social);
  document.getElementById("profileName").textContent = portfolioData.name;
  document.getElementById("profileHeadline").textContent = portfolioData.headline.toUpperCase();
  document.getElementById("profileLocation").textContent = portfolioData.location.toUpperCase();
  const contactLink = document.getElementById("emailLink");
  const githubUrl = portfolioData.social.find((link) => link.label === "GitHub")?.url;
  if (portfolioData.email) {
    contactLink.href = `mailto:${portfolioData.email}`;
    contactLink.removeAttribute("target");
    contactLink.removeAttribute("rel");
    contactLink.firstChild.textContent = "Email me ";
  } else if (githubUrl) {
    contactLink.href = githubUrl;
    contactLink.target = "_blank";
    contactLink.rel = "noopener noreferrer";
    contactLink.firstChild.textContent = "Visit my GitHub ";
  } else {
    contactLink.removeAttribute("href");
    contactLink.removeAttribute("target");
    contactLink.removeAttribute("rel");
    contactLink.firstChild.textContent = "Contact details coming soon ";
  }
  document.getElementById("currentYear").textContent = `© ${new Date().getFullYear()} ${portfolioData.name.toUpperCase()}`;
}

document.addEventListener("DOMContentLoaded", initializePortfolio);
