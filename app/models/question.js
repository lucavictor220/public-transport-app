export default createQuesiton = (possibleTransportUnits) => {
  const options = possibleTransportUnits.map(transportUnit => ({
    text: `${transportUnit.type} ${transportUnit.nr}`
  }));
  options.push({ text: 'Non of above'});
  options.push({ text: "Cancel", icon: "close", iconColor: "#25de5b" })
  return {
    options: options,
    cancelButtonIndex: (options.length - 1),
    title: "Contribute"
  }
}