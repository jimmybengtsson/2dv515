exports.Euclidean = (userA, userB, ratings) => {

  let sim = 0;
  let n = 0;

  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (ratings[i].UserID === userA && ratings[j].UserID === userB) {
        let temp = (ratings[i].Rating - ratings[j].Rating)**2;
        console.log(temp);
        sim += temp;
        n += 1;
      }
    }
  }

  if (n === 0) {
    return 0;
  }

  return 1 / (1 + sim);
};
