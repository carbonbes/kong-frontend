import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '~/shared/config'

interface GetCookie {
  type: 'accessToken' | 'refreshToken'
}

interface SetCookiesOptions {
  accessToken: string
  refreshToken: string
}

export const useAuthCookies = () => {
  const getCookie = ({ type }: GetCookie) =>
    useCookie(
      type === 'accessToken'
        ? ACCESS_TOKEN_COOKIE_NAME
        : REFRESH_TOKEN_COOKIE_NAME,
    ).value

  const getCookies = () => {
    const accessToken = useCookie(ACCESS_TOKEN_COOKIE_NAME).value
    const refreshToken = useCookie(REFRESH_TOKEN_COOKIE_NAME).value

    return { accessToken, refreshToken }
  }

  const setCookies = ({ accessToken, refreshToken }: SetCookiesOptions) => {
    const cookieOptions = {
      expires: new Date(Date.now() + 999999999 * 1000),
    }

    useCookie(ACCESS_TOKEN_COOKIE_NAME, cookieOptions).value = accessToken
    useCookie(REFRESH_TOKEN_COOKIE_NAME, cookieOptions).value = refreshToken
  }

  const clearCookies = () => {
    useCookie(ACCESS_TOKEN_COOKIE_NAME).value = null
    useCookie(REFRESH_TOKEN_COOKIE_NAME).value = null
  }

  return { getCookie, getCookies, setCookies, clearCookies }
}
