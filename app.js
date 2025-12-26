const players = [
  {
    name: "Kylian Mbappé",
    position: "Forward",
    country: "France",
    bio:
      "Explosive forward known for pace, movement, and clinical finishing. Key threat in transitions and attacking runs.",
    stats: { matches: 18, goals: 14, assists: 3 }, // sample values
    tags: ["Speed", "Finishing", "Off-ball movement"],
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop" // placeholder
  },
  {
    name: "Vinícius Júnior",
    position: "Forward",
    country: "Brazil",
    bio:
      "Dynamic winger with elite dribbling and acceleration. Constantly attacks space and destabilizes defensive lines.",
    stats: { matches: 17, goals: 5, assists: 4 }, // sample values
    tags: ["Dribbling", "Acceleration", "1v1"],
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Jude Bellingham",
    position: "Midfielder",
    country: "England",
    bio:
      "Box-to-box midfielder with intelligence in space, late runs, and composure. Links phases and arrives in scoring areas.",
    stats: { matches: 16, goals: 3, assists: 2 }, // sample values
    tags: ["Late runs", "Composure", "Link play"],
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Arda Güler",
    position: "Attacking Midfielder",
    country: "Turkey",
    bio:
      "Creative playmaker with vision and technique. Finds pockets and breaks lines with passes and quick combinations.",
    stats: { matches: 15, goals: 3, assists: 5 }, // sample values
    tags: ["Vision", "Technique", "Combinations"],
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop"
  }
];




let index = 0;
const viewport = document.getElementById("viewport");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indexLabel = document.getElementById("indexLabel");
const totalLabel = document.getElementById("totalLabel");



totalLabel.textContent = players.length.toString();



function renderCard(player, active = false) {
  const el = document.createElement("article");
  el.className = `card${active ? " active" : ""}`;
  el.setAttribute("role", "group");
  el.setAttribute("aria-label", `${player.name}, ${player.position}`);

  
  el.innerHTML = `
    <div class="photo">
      <span class="badge">Real Madrid</span>
      <div class="img-wrap">
        <img src="${player.image}" alt="${player.name} portrait" loading="lazy" />
      </div>
    </div>



    <div class="content">
      <div class="title">
        <h2 class="name">${player.name}</h2>
        <span class="position">• ${player.position} • ${player.country}</span>
      </div>





      <p class="bio">${player.bio}</p>



      <div class="stats" aria-label="Key stats">
        <div class="stat">
          <div class="label">Matches</div>
          <div class="value">${player.stats.matches}</div>
        </div>
        <div class="stat">
          <div class="label">Goals</div>
          <div class="value">${player.stats.goals}</div>
        </div>


        
        <div class="stat">
          <div class="label">Assists</div>
          <div class="value">${player.stats.assists}</div>
        </div>
      </div>




      <div class="tags" aria-label="Attributes">
        ${player.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
  `;
  return el;
}



function mount(indexToShow) {
  viewport.innerHTML = "";
  players.forEach((p, i) => {
    const card = renderCard(p, i === indexToShow);
    if (i === indexToShow) {
      card.style.zIndex = "2";
    } else {
      card.style.zIndex = "1";
    }
    viewport.appendChild(card);
  });
  indexLabel.textContent = (indexToShow + 1).toString();
}



function next(step = 1) {
  index = (index + step + players.length) % players.length;
  mount(index);
}







function prev(step = 1) {
  index = (index - step + players.length) % players.length;
  mount(index);
}





nextBtn.addEventListener("click", () => next());
prevBtn.addEventListener("click", () => prev());




document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next(e.shiftKey ? 2 : 1);
  if (e.key === "ArrowLeft") prev(e.shiftKey ? 2 : 1);
});



let startX = null;
viewport.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });
viewport.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) {
    dx < 0 ? next() : prev();
  }
  startX = null;
});


mount(index);


