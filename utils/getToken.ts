export default async () => {
  let token = localStorage.getItem('token')
  if (!token) {
    token = await useApi().biz.getToken()
    localStorage.setItem('token', token)
  }
  return token
}
