//localstorage読み込み用Plugin
export default async (ctx) => {
  await ctx.store.dispatch('nuxtClientInit', ctx)
}