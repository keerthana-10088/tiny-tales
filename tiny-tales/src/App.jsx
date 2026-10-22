import { useState } from "react";
import "./App.css";

const activities = [
  { id: "letters", icon: "🔤", title: "Alphabet Fun", subtitle: "Learn your ABCs!", color: "pink" },
  { id: "numbers", icon: "🔢", title: "Number World", subtitle: "Count and play!", color: "blue" },
  { id: "animals", icon: "🐼", title: "Animal Friends", subtitle: "Meet cute animals!", color: "yellow" },
  { id: "colors", icon: "🎨", title: "Color Magic", subtitle: "Explore colors!", color: "green" },
];

const letters = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐠" },
];

const animals = [
  { name: "Lion", emoji: "🦁" },
  { name: "Panda", emoji: "🐼" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Monkey", emoji: "🐵" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Butterfly", emoji: "🦋" },
];

const colors = [
  { name: "Red", value: "#ff6b81" },
  { name: "Blue", value: "#65a8ff" },
  { name: "Yellow", value: "#ffd65a" },
  { name: "Green", value: "#69d9a2" },
  { name: "Purple", value: "#b69aff" },
  { name: "Orange", value: "#ffad70" },
];

function App() {
  const [activeGame, setActiveGame] = useState("home");
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(1);
  const [answer, setAnswer] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  function goHome() {
    setActiveGame("home");
    setAnswer(null);
  }

  function chooseAnswer(value, correct) {
    if (answer !== null) return;
    setAnswer(value);
    if (value === correct) setScore((old) => old + 1);
  }

  function nextQuestion() {
    setAnswer(null);
    setNumber((old) => (old >= 10 ? 1 : old + 1));
    setColorIndex((old) => (old + 1) % colors.length);
    setLetterIndex((old) => (old + 1) % letters.length);
  }

  function openGame(id) {
    setActiveGame(id);
    setAnswer(null);
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button className="brand" onClick={goHome}>
          <span className="brand-icon">🌈</span>
          <span>Tiny<span className="brand-pink">Tales</span></span>
        </button>

        <nav>
          <button onClick={goHome}>Home</button>
          <a href="#activities">Activities</a>
          <a href="#about">About</a>
        </nav>

        <div className="score-pill">⭐ Stars: {score}</div>
      </header>

      <main>
        {activeGame === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow">✨ A LITTLE WORLD OF BIG FUN</span>
                <h1>
                  Learn, Play &amp;
                  <span> Shine Bright!</span>
                </h1>
                <p>
                  Hello, little explorer! 🐻 Discover letters, numbers,
                  animals and colors in your own magical learning world.
                </p>
                <button
                  className="primary-button"
                  onClick={() => openGame("letters")}
                >
                  Let's Play! <span>→</span>
                </button>
                <div className="hero-note">💗 Little steps, big discoveries!</div>
              </div>

              <div className="hero-art">
                <span className="floating-star star-one">⭐</span>
                <span className="floating-star star-two">✨</span>
                <span className="floating-cloud cloud-one">☁️</span>
                <div className="rainbow">🌈</div>
                <div className="bear">🧸</div>
                <div className="hero-caption">Welcome, sunshine! ☀️</div>
              </div>
            </section>

            <section className="activities-section" id="activities">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PICK YOUR ADVENTURE</span>
                  <h2>What shall we learn today? 💕</h2>
                </div>
                <span className="heading-sparkle">✦ ✧ ✦</span>
              </div>

              <div className="activity-grid">
                {activities.map((activity) => (
                  <button
                    className={`activity-card ${activity.color}`}
                    key={activity.id}
                    onClick={() => openGame(activity.id)}
                  >
                    <span className="activity-icon">{activity.icon}</span>
                    <h3>{activity.title}</h3>
                    <p>{activity.subtitle}</p>
                    <span className="card-arrow">Play now ↗</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="friend-banner" id="about">
              <span className="friend-emoji">🐰</span>
              <div>
                <h2>Every day is a new adventure!</h2>
                <p>Explore at your own pace and collect stars as you learn.</p>
              </div>
              <span className="banner-stars">⭐🌟⭐</span>
            </section>
          </>
        )}

        {activeGame === "letters" && (
          <section className="game-panel">
            <button className="back-button" onClick={goHome}>← Home</button>
            <span className="eyebrow">LETTER ADVENTURE</span>
            <h1>Let's learn our ABCs! 🔤</h1>
            <p className="game-description">Tap a letter and say its name!</p>
            <div className="letter-grid">
              {letters.map((item) => (
                <button
                  className="letter-card"
                  key={item.letter}
                  onClick={() => {
                    setLetterIndex(letters.indexOf(item));
                    setAnswer(item.letter);
                  }}
                >
                  <strong>{item.letter}</strong>
                  <span>{item.emoji}</span>
                  <small>{item.word}</small>
                </button>
              ))}
            </div>
            <div className="learning-message">
              {answer && letters.find((item) => item.letter === answer)
                ? `Wonderful! ${answer} is for ${letters.find((item) => item.letter === answer).word}! 🎉`
                : "Choose any letter to discover a new word!"}
            </div>
            <button className="primary-button" onClick={nextQuestion}>
              Next letter ✨
            </button>
          </section>
        )}

        {activeGame === "numbers" && (
          <section className="game-panel">
            <button className="back-button" onClick={goHome}>← Home</button>
            <span className="eyebrow">NUMBER ADVENTURE</span>
            <h1>How many stars? ⭐</h1>
            <p className="game-description">Count the stars and choose the answer!</p>
            <div className="counting-stars">
              {Array.from({ length: number }, (_, i) => <span key={i}>⭐</span>)}
            </div>
            <div className="answer-grid">
              {[number === 1 ? 2 : number - 1, number, number >= 10 ? 1 : number + 1].map((n, i) => (
                <button
                  key={`${n}-${i}`}
                  className={`answer-button ${answer === n ? (n === number ? "correct" : "incorrect") : ""}`}
                  onClick={() => chooseAnswer(n, number)}
                >
                  {n}
                </button>
              ))}
            </div>
            {answer !== null && (
              <div className="learning-message">
                {answer === number ? "Yay! That's correct! 🎉" : "Almost! Try the next one! 💗"}
              </div>
            )}
            <button className="primary-button" onClick={nextQuestion}>
              Next question →
            </button>
          </section>
        )}

        {activeGame === "animals" && (
          <section className="game-panel">
            <button className="back-button" onClick={goHome}>← Home</button>
            <span className="eyebrow">ANIMAL ADVENTURE</span>
            <h1>Meet your animal friends! 🐾</h1>
            <p className="game-description">Tap an animal to discover its name!</p>
            <div className="animal-grid">
              {animals.map((animal) => (
                <button className="animal-card" key={animal.name} onClick={() => setAnswer(animal.name)}>
                  <span>{animal.emoji}</span>
                  <strong>{animal.name}</strong>
                </button>
              ))}
            </div>
            {answer && <div className="learning-message">Hello, {answer}! 👋 You're adorable!</div>}
          </section>
        )}

        {activeGame === "colors" && (
          <section className="game-panel">
            <button className="back-button" onClick={goHome}>← Home</button>
            <span className="eyebrow">COLOR ADVENTURE</span>
            <h1>Color your world! 🎨</h1>
            <p className="game-description">Tap a color to learn its name!</p>
            <div className="color-grid">
              {colors.map((color) => (
                <button
                  className="color-card"
                  key={color.name}
                  onClick={() => setAnswer(color.name)}
                >
                  <span style={{ backgroundColor: color.value }} />
                  <strong>{color.name}</strong>
                </button>
              ))}
            </div>
            {answer && colors.some((color) => color.name === answer) && (
              <div className="learning-message">Beautiful {answer}! 🌈</div>
            )}
          </section>
        )}
      </main>

      <footer>
        <span>🌈 TinyTales</span>
        <p>Made with 💗 for little learners everywhere.</p>
      </footer>
    </div>
  );
}

export default App;