export default (geoObj, topFive) => {
	if(topFive.length < 5) {
		topFive.push(geoObj);
		topFive.sort((a, b)  => {
			return b.sum - a.sum;
		});
		return topFive;
	}
	else {
		for(let i in topFive) {
			if(geoObj.sum > topFive[i].sum) {
				topFive.splice(i, 0, geoObj);
				topFive.pop();
				break;
			}
		}
		return topFive;
	}
}