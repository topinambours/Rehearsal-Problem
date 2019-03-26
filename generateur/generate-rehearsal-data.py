#!/usr/bin/python
import sys
from random import randint


def rehearsal_problem(nplayers, npieces, density, min_duration, max_duration):
    """
    Generate an instance of the rehearsal problem, given :
    :param nplayers: the number of player
    :param npieces: the number of piece
    :param density: the density of player per piece
    :param min_duration: the minimum duration of a piece
    :param max_duration: the maximum duration of a piece
    :return: the duration array and the rehearsal instance
    """
    duration_array = [randint(min_duration, max_duration) for p in range(npieces)]
    schedule_array = [[int(randint(0, 100) <= density) for p in range(npieces)] for m in range(nplayers)]
    return duration_array, schedule_array


# Parsing the command line arguments from string to int
sys.argv = [int(sys.argv[x]) for x in range(1, len(sys.argv))]

# Creating the variables and getting the instance of the rehearsal problem
musicians, pieces, rate, duration_min, duration_max = sys.argv[0], sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
duration, schedule = rehearsal_problem(musicians, pieces, rate, duration_min, duration_max)

output = 'npieces = {};\nduration = {};\nnplayers = {};\nrehearsal = {};'.format(pieces, duration, musicians, schedule)

# Write the generated instance into a .dat file with name corresponding to the characteristics of the instance
f = open("{}_{}_{}.dat".format(pieces, musicians, rate), "w")
f.write(output)
f.close()
