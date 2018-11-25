function brDateToEpoch(data){
	if (!data) return undefined;
	preData = data.split("/");
	newData = preData[1]+"/"+preData[0]+"/"+preData[2];
	dateObject = new Date(newData);
	
	return dateObject.getTime();
}