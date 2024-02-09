const { faker } = window;

// dictonary 형태로 만들어서 리턴
const createElement = () => ({
  text: faker.random.words(2),
  completed: faker.random.boolean(),
});

const repeat = (elementFactory, number) => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }
  return array;
};

// 결론적으로 getTodos는 createElement를 howMany번 반복해서 배열(text : 랜덤문자열, completed : true or false)로 리턴
export default () => {
  const howMany = faker.random.number(10);
  return repeat(createElement, howMany);
};
