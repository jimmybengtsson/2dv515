exports.Euclidean = (userA, userB, ratings) => {

  let sim = 0;
  let n = 0;

  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (ratings[i].UserID === userA && ratings[j].UserID === userB && ratings[i].Movie === ratings[j].Movie) {
        sim += Math.pow(ratings[i].Rating - ratings[j].Rating, 2);
        n += 1;
      }
    }
  }

  if (n === 0) {
    return 0;
  }

  console.log(sim);
  return 1 / (1 + sim);
};
