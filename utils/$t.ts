export default (args: any): string => {
  return getCurrentInstance()?.appContext.config.globalProperties!.$t(args)!
}
