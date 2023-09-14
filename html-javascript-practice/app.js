function createAnimal(species, verb, noise) {
    return {
        species,
        [verb]() {
            return noise;
        }
    };
}