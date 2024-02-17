/* eslint-disable no-unused-vars */
export const ERROR_IMAGE = 'https://cdn-icons-png.flaticon.com/512/1304/1304038.png';
const LOADING_IMAGE = 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png';
const AVATAR_LOAD_COMPLETE = 'AVATAR_LOAD_COMPLETE';
const AVATAR_LOAD_ERROR = 'AVATAR_LOAD_ERROR';

export const EVENTS = {
  AVATAR_LOAD_COMPLETE,
  AVATAR_LOAD_ERROR,
};

const getGitHubAvatarUrl = async (user) => {
  if (!user) {
    // 유저 매개변수가 없으면 걍 리턴
    return null;
  }

  const url = `https://api.github.com/users/${user}`;

  const response = await fetch(url); /// response 받을때까지 기다림
  console.log(response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.avatar_url;
};

export default class GitHubAvatar extends HTMLElement {
  constructor() {
    super();
    this.url = LOADING_IMAGE;
  }

  get user() {
    return this.getAttribute('user');
  }

  set user(value) {
    this.setAttribute('user', value);
  }

  render() {
    window.requestAnimationFrame(() => {
      this.innerHTML = '';
      const img = document.createElement('img');
      img.src = this.url;
      this.appendChild(img);
    });
  }

  async loadNewAvatar() {
    const { user } = this;

    if (!user) {
      return;
    }

    try {
      this.url = await getGitHubAvatarUrl(user);
      this.onLoadAvatarComplete();
    } catch (e) {
      this.url = ERROR_IMAGE;
      this.onLoadAvatarError(e);
    }

    this.render();
  }

  onLoadAvatarComplete() {
    const event = new CustomEvent(AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url,
      },
    });
    this.dispatchEvent(event);
  }

  onLoadAvatarError(error) {
    const event = new CustomEvent(AVATAR_LOAD_ERROR, {
      detail: {
        error,
      },
    });

    this.dispatchEvent(event);
  }

  // connectedCallback 요소가 문서에 추가될 때마다 호출
  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }
}
