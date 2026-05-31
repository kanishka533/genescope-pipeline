def count_reads(filepath):

    count = 0

    with open(filepath, "r") as file:

        for i, line in enumerate(file):

            if i % 4 == 0:
                count += 1

    return count