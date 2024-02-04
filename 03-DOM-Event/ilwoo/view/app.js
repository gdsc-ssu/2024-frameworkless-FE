let template;

const createAppElement = () => {
  //template이 없으면 가져옴
  if (!template) {
    template = document.getElementById('todo-app');
  }

  //template의 내용을 복사해서 반환
  return template.content.cloneNode(true);
};

export default (targetElement) => {
  //새로운 app을 만들어서 반환
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  return newApp;
};
