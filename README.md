# Rehearsal problem

> L'équipe 
>- [Jeremy Bonsaudo](https://github.com/JeremyBonsaudo)
>- [Matthias Percelay](https://github.com/MatthiasPercelay)
>- [Brandon Fontany-Legall](https://github.com/FontanyLegall-Brandon)
>- [Thomas Mahe](https://github.com/Mahe-Thomas)

---

## Input of the problem
Each line is a player, each collumn is a piece
The problem is to find a sequence of pieces such that the waiting time is minimal.

**R** = ![](https://i.imgur.com/VvHxThg.png)


## Modeling the problem

To compute the waiting time, we must know when a player start and when a player leave.

**P** = ![](https://i.imgur.com/ZMMtVzs.png) The prefix sum matrix


**S** = ![](https://i.imgur.com/tgGVUdz.png) The suffix sum matrix

By multiplying P and S we obtain a matrix containing the range of presence of each players. We have zero when the player is not yet arrived or if he had leave.

### Compute the waiting matrix

We now need to know when a player is waiting. We then multiply the matrix containing presence range with the input data where we applyed -1 to each cells. By doing that, whe now have 0 when a player is playing, and -1 when he is doing something else, we then use this matrix as a mask for the previous computed one.

### Using this formula : 

With *n* the range of players and *m* the range of pieces.

![](https://i.imgur.com/VsmYcTl.png)

**M** = ![](https://i.imgur.com/TDp9wQA.png)

As result we get the waiting matrix.

![](https://i.imgur.com/aBIqbvt.png)

To conclude, we minimize the WaitingTime to find a solution of the problem.

# Preview

![](http://topinambours.xyz/projects/rehearsal-problem/assets/preview.png)
