"use client";
import styles from "./RemoveButton.module.scss";
import { Button } from "@/app/components/ui/Button/Button";
import { useBeers } from "@/app/store";
import { Fragment } from "react";
export const RemoveButton = () => {
  const { selectedBeers, removeBeers } = useBeers((state) => ({
    selectedBeers: state.selectedBeers,
    removeBeers: state.removeBears,
  }));

  if (selectedBeers.length > 0)
    return (
      <Button
        className={styles.removeButton}
        variant="alert"
        onClick={removeBeers}
      >
        Remove Beers
      </Button>
    );

  return <Fragment></Fragment>;
};
