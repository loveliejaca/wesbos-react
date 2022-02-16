function useFishesHook(init) {
  const [fishes, setFishes] = useState(init);

  function addFish(fish) {
      // Obtain a copy of current fishes.
      const currentFishes = { ...fishes }; // Don't do currentFishes = fishes => Deep copy.
      // Add new fish.
      currentFishes[`fish-${Date.now()}`] = fish;
      // Update the fishes.
      setFishes(currentFishes);
  }

  function loadSampleFishes() {
      setFishes(sampleFishes);
  }

  return {
      fishes,
      addFish,
      setFishes,
      loadSampleFishes
  }
}