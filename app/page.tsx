import { BeerList } from "./components/BeerList/BeerList";
import { RemoveButton } from "./components/RemoveButton/RemoveButton";
export default function Home() {
  return (
    <main>
      <BeerList />
      <RemoveButton />
    </main>
  );
}
