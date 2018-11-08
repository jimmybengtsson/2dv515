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

exports.Pearson = (userA, userB, ratings) => {

  let sumOne = 0;
  let sumTwo = 0;
  let sumOneSquare = 0;
  let sumTwoSquare = 0;
  let pSum = 0;
  let n = 0;

  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (ratings[i].UserID === userA && ratings[j].UserID === userB && ratings[i].Movie === ratings[j].Movie) {
        sumOne += Number(ratings[i].Rating);
        sumTwo += Number(ratings[j].Rating);
        sumOneSquare += Math.pow(ratings[i].Rating, 2);
        sumTwoSquare += Math.pow(ratings[j].Rating, 2);
        pSum += ratings[i].Rating * ratings[j].Rating;
        n += 1;
      }
    }
  }

  if (n === 0) {
    return 0;
  }

  let num = pSum - (sumOne * sumTwo / n);
  let den = Math.sqrt((sumOneSquare - Math.pow(sumOne, 2) / n) * (sumTwoSquare - Math.pow(sumTwo, 2) / n));

  return num / den;
};
