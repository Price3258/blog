import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/bike.jpg"
          alt="An image"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I'm Wontae</h1>
      <p>I blog about web development - especially frontend</p>
    </section>
  );
}
