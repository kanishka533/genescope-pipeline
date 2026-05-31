def calculate_gc_content(filepath):

    gc_count = 0
    total_bases = 0

    with open(filepath, "r") as file:

        for i, line in enumerate(file):

            if i % 4 == 1:

                sequence = line.strip().upper()

                gc_count += sequence.count("G")
                gc_count += sequence.count("C")

                total_bases += len(sequence)

    if total_bases == 0:
        return 0

    return round(
        (gc_count / total_bases) * 100,
        2
    )