import style from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={style.hero}>
      <div className={style.overlay}>
        <div className={style.content}>
          <h1>Find your perfect rental car</h1>
          <p>
            Reliable and budget-friendly rentals for any journey
          </p>
          <a href="/catalog" className={style.button}>
            View Catalog
          </a>
        </div>
      </div>
    </section>
  );
}