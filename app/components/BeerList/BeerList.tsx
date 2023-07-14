"use client";
import { useBeers } from "@/app/store";
import { Fragment, useEffect, useRef, useState } from "react";
import { BeersService } from "@/app/lib/BearsAPI";
import { shallow } from "zustand/shallow";
import { BeerCard } from "@/app/components/BeerList/BeerCard/BeerCard";
import styles from "./BeerList.module.scss";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { Message } from "@/app/components/ui/Message/Message";
export const BeerList = () => {
  useEffect(() => {
    (async () => {
      const beers = await BeersService.getPage();
      setBeers(beers);
    })();
  }, );

  const { displayedBeers, addNext5, setBeers, moreBeers } = useBeers(
    (state) => ({
      displayedBeers: state.displayedBeers,
      addNext5: state.addNext5,
      setBeers: state.setBeers,
      beers: state.beers,
      moreBeers: state.areMoreBears,
    }),
    shallow,
  );

  const moreRef = useRef<HTMLParagraphElement | null>(null);
  const entry = useIntersectionObserver(moreRef, {});

  useEffect(() => {
    if (entry?.isIntersecting) {
      addNext5();
    }
  }, [entry?.isIntersecting]);

  return (
    <Fragment>
      <ul className={styles.list}>
        {displayedBeers.map((beer) => {
          return beer ? <BeerCard key={beer?.id} beer={beer} /> : null;
        })}
      </ul>

      {moreBeers ? (
        <Message ref={moreRef}>Loading...</Message>
      ) : (
        <Message>No more beer, go workout</Message>
      )}
    </Fragment>
  );
};
