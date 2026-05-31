def detect_mutations(filepath):

    mutation_count = 0

    with open(filepath, "r") as file:

        for i, line in enumerate(file):

            if i % 4 == 1:

                sequence = line.strip().upper()

                mutation_count += sequence.count("N")

    return mutation_count