import type { TBeer } from "@/app/types/bears";
import type { FC, SyntheticEvent } from "react";
import styles from "./BeeCard.module.scss";
import { Button } from "@/app/components/ui/Button/Button";
import { useState } from "react";
import { useBeers } from "@/app/store";
import Link from 'next/link';
export const BeerCard: FC<{ beer: TBeer }> = ({ beer }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const { addSelected, removeSelected } = useBeers((state) => ({
    addSelected: state.addSelected,
    removeSelected: state.removeSelected,
  }));

  const handleSelect = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!selected) {
      setSelected(true);
      addSelected(beer.id);
    } else {
      removeSelected(beer.id);
      setSelected(false);
    }
  };

  return (
    <Link href={`/beers/${beer.id}`}>
      <section
        className={`${styles.card} ${selected ? styles.selected : ""}`}
        onContextMenu={handleSelect}
      >
        <div className={styles.image}>
          <img alt={beer.name} src={beer.image_url}></img>
        </div>
        <div className={styles.main}>
          <h2 className={styles.title}>{beer.name}</h2>
          <p className={styles.description}>{beer.description}</p>
          <div className={styles.actions}>
            <Link href={`/beers/${beer.id}`}>
              <Button>Learn More</Button>
            </Link>
            <Button
              variant={selected ? "primary" : "outlined"}
              onClick={handleSelect}
            >
              {selected ? "Deselect" : "Select"}
            </Button>
          </div>
        </div>
      </section>
    </Link>
  );
};
