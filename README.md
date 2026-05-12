# 🚀 PathFinder Visualizer

**Visualize how pathfinding algorithms work in real-time!**  
A clean, interactive web app built with pure JavaScript — no frameworks, no libraries.

🔴 **[Live Demo](https://abhijain04.github.io/Path-Finder-Visualizer-Project/)**

![demo](assets/demo.gif)

---

## ✨ Features

- 🎨 **Interactive grid** — paint walls with click-and-drag, move start/end points freely
- ⚡ **5 algorithms** — watch each one explore differently on the same grid
- 📊 **Live stats** — nodes visited, path length and time shown after every run
- 🌀 **Maze generation** — instantly generate random mazes to test algorithms
- 🐢 **Speed control** — slow, normal, or fast animation speed

---

## 🧠 Algorithms

| Algorithm | Time Complexity | Space Complexity | Guarantees Shortest Path? |
|-----------|----------------|-----------------|--------------------------|
| BFS | O(V + E) | O(V) | ✅ Yes (unweighted) |
| DFS | O(V + E) | O(V) | ❌ No |
| Dijkstra's | O(E log V) | O(V) | ✅ Yes (weighted) |
| A* | O(E log V) | O(V) | ✅ Yes (with admissible heuristic) |
| Greedy Best-First | O(E log V) | O(V) | ❌ No |

---

## 🏗️ Project Structure

```
Path-Finder-Visualizer-Project/
│
├── index.html
├── css/
│   ├── main.css
│   └── utility.css
│
├── js/
│   ├── app.js
│   ├── stats.js
│   ├── core/
│   │   ├── board.js
│   │   ├── navOptions.js
│   │   └── util.js
│   └── algorithms/
│       ├── BFS.js
│       ├── BFS.pure.js
│       ├── DFS.js
│       ├── DFS.pure.js
│       ├── Dijkstra's.js
│       ├── Dijkstra.pure.js
│       ├── AStar.js
│       ├── AStar.pure.js
│       ├── Greedy.js
│       └── Greedy.pure.js
│
├── tests/
│   ├── BFS.test.js
│   ├── DFS.test.js
│   ├── Dijkstra.test.js
│   ├── AStar.test.js
│   └── Greedy.test.js
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🧪 Testing

Algorithm logic is separated from the DOM into pure functions, making them fully unit testable with Jest.

```bash
npm install
npm test
```

19 tests across all 5 algorithms — covering shortest path correctness, unreachable targets, and efficiency comparisons between algorithms.

---

## 💡 What I Learned

- **Separating concerns** — keeping algorithm logic completely independent from DOM manipulation made the code testable and cleaner
- **Why A* beats Dijkstra** — on an open grid, A* visits significantly fewer nodes than Dijkstra by using Manhattan distance as a heuristic to guide the search toward the target
- **DFS is not a pathfinder** — DFS finds *a* path but never the *shortest* path, which becomes visually obvious when you run it side by side with BFS
- **Priority queues matter** — implementing a min-heap from scratch for Dijkstra, A* and Greedy taught me why O(E log V) beats O(E·V) for dense graphs
- **CI/CD in practice** — setting up GitHub Actions to auto-deploy on every push to main

---

## 🚀 Run Locally

```bash
git clone https://github.com/AbhiJain04/Path-Finder-Visualizer-Project.git
cd Path-Finder-Visualizer-Project

# Open in browser directly
open index.html

# Or use Live Server in VS Code (recommended)
```

---

## 🛠️ Built With

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)