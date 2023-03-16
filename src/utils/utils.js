//create simple log
export const cLog = (log = '', color) => {
  const _selectColor = () => {
    switch (color) {
      case 'red':
        return '\x1B[31m';
        break;
      case 'blue':
        return '\x1B[34m';
        break;
      default:
        return '';
        break;
    }
  };
  console.log(`${_selectColor()}${log}`);
};

//callback to avoid re-render
export const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

// == set selecetd on top
export const setOnTop = (data = [], selectedIndex) => {
  let temp = [data[selectedIndex]];

  for (let i = 0; i < data.length; i++) {
    if (i !== selectedIndex) {
      temp.push(data[i]);
    }
  }

  return temp;
};
