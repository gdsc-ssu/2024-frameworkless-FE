/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals';
import GitHubAvatar, { EVENTS, ERROR_IMAGE } from '../components/GitHubAvatar';

describe('GitHubAvatar', () => {
  beforeAll(() => {
    customElements.define('github-avatar', GitHubAvatar);
  });

  let element;

  beforeEach(() => {
    // requestAnimationFrame을 모킹
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
    // GithubAvatar 사용자 정의 요소 생성
    element = new GitHubAvatar();
    // body에 사용자 정의 요소 추가
    document.body.appendChild(element);
  });

  afterEach(() => {
    // requestAnimationFrame 모킹 제거
    window.requestAnimationFrame.mockRestore();
    // body에서 사용자 정의 요소 제거
    document.body.removeChild(element);
  });

  it('`user` 속성이 올바르게 설정되어야 한다', () => {
    const user = 'octocat';
    element.user = user;
    expect(element.getAttribute('user')).toBe(user);
  });

  it('정상적인 `user` 속성이 설정되면 AVATAR_LOAD_COMPLETE 이벤트를 발생시킨다', async () => {
    const mockUser = 'mockUser';
    const mockAvatarUrl = 'https://mock.url/avatar.png';

    // avatar_url을 반환하는 fetch를 모킹
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ avatar_url: mockAvatarUrl }),
      }),
    );

    // AVATAR_LOAD_COMPLETE 이벤트 리스너를 등록
    const loadCompleteHandler = jest.fn();
    element.addEventListener(EVENTS.AVATAR_LOAD_COMPLETE, loadCompleteHandler);

    // user 속성을 설정
    element.user = mockUser;
    element.connectedCallback();

    // 모든 비동기 작업이 완료될 때까지 대기
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    // AVATAR_LOAD_COMPLETE 이벤트가 발생하였는지 확인
    expect(loadCompleteHandler).toHaveBeenCalled();

    // img 요소의 src 속성이 변경되었는지 확인
    const img = element.querySelector('img');
    expect(img.src).toBe(mockAvatarUrl);
  });

  it('비정상적인 `user` 속성이 설정되면 AVATAR_LOAD_ERROR 이벤트를 발생시킨다', async () => {
    const mockUser = 'mockUser';

    // 에러를 던지는 fetch를 모킹
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Not Found')));

    // AVATAR_LOAD_ERROR 이벤트 리스너를 등록
    const loadErrorHandler = jest.fn();
    element.addEventListener(EVENTS.AVATAR_LOAD_ERROR, loadErrorHandler);

    // user 속성을 설정
    element.user = mockUser;
    element.connectedCallback();

    // 모든 비동기 작업이 완료될 때까지 대기
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    // AVATAR_LOAD_ERROR 이벤트가 발생하였는지 확인
    expect(loadErrorHandler).toHaveBeenCalled();

    // img 요소의 src 속성이 변경되었는지 확인
    const img = element.querySelector('img');
    expect(img.src).toBe(ERROR_IMAGE);
  });
});
