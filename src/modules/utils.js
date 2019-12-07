const logIt = data => {
  console.log(data);
};

const errorIt = data => {
  console.error(data);
};

const tableIt = data => {
  console.table(data);
};

export { logIt, errorIt, tableIt };
