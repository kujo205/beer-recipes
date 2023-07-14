import { BeersService } from "@/app/lib/BearsAPI";
import { redirect } from "next/navigation";
import { TBeer } from "@/app/types/bears";
import styles from "./page.module.scss";
export default async function Page({ params }: { params: { beerId: string } }) {
  let beer: TBeer;
  beer = await BeersService.getId(+params.beerId);
  if ("error" in beer) redirect("/404");

  return (
    <section className={styles.wrapper}>
      <div className={styles.img}>
        <img src={beer.image_url} alt={beer.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h2>{beer.name}</h2>
          <p>{beer.description}</p>
        </div>
        <div className={styles.ingradients}>
          <h2>Ingradients</h2>
          <ul>
            <h3>Hops</h3>
            <ul>
              {beer.ingredients.hops.map((ing, i) => (
                <li key={i}>
                  {ing.name} - {ing.amount.value} {ing.amount.unit}
                </li>
              ))}
            </ul>
            <h3>Malt</h3>
            <ul>
              {beer.ingredients.malt.map((ing, i) => (
                <li key={i}>
                  {ing.name} - {ing.amount.value} {ing.amount.unit}
                </li>
              ))}
            </ul>
            <h3>Yeast</h3>
            <ul>
              {beer.ingredients.malt.map((ing, i) => (
                <li key={i}>
                  {ing.name} - {ing.amount.value} {ing.amount.unit}
                </li>
              ))}
            </ul>
          </ul>
        </div>
        <div className={styles.reccomendations}>
          <h2>Best Goes With</h2>
          <p>{beer.food_pairing.join(", ")}</p>
        </div>
        <div className={styles.properties}>
          <h2>Alcohol level</h2>
          <p>{beer.abv}%</p>
        </div>
      </div>
    </section>
  );
}
