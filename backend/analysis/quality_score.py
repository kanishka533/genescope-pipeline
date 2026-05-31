def calculate_quality_score(filepath):

    total_score = 0
    total_chars = 0

    with open(filepath, "r") as file:

        for i, line in enumerate(file):

            if i % 4 == 3:

                quality_line = line.strip()

                for char in quality_line:

                    phred_score = ord(char) - 33

                    total_score += phred_score
                    total_chars += 1

    if total_chars == 0:
        return 0

    return round(
        total_score / total_chars,
        2
    )